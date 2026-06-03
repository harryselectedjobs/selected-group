import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const API_BASE = "http://13.48.59.189:1802";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/crm";

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      console.log({ data });

      if (!res.ok || data.status === "error") {
        setError(data.message || "Invalid email or password.");
        return;
      }

      const token = data.token || data.access_token || data.data?.token;
      if (token) {
        localStorage.setItem("crm_token", token);
      } else {
        // API succeeded but no token — treat session as authenticated anyway
        localStorage.setItem("crm_token", "__session__");
      }
      navigate(from, { replace: true });
    } catch {
      setError("Unable to reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo / brand */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-white">CRM Login</h1>
          <p className="text-gray-500 text-sm mt-1">
            Sign in to access your CRM dashboard
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#0F0F0F] border border-white/10 rounded-xl p-8 flex flex-col gap-5"
        >
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-400 font-medium">Email</label>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-white/30 transition placeholder-gray-600"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-gray-400 font-medium">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-white/30 transition placeholder-gray-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-1 bg-white text-black text-sm font-medium rounded-lg py-2.5 hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
