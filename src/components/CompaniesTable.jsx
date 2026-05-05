import { useState, useEffect } from "react";
import { Building2, X, Plus } from "lucide-react";

const API_BASE = "http://13.61.16.106:1802";

export default function CompaniesTable({ search }) {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const [selectedItem, setSelectedItem] = useState(null);

  // ✅ NEW STATES (ADD COMPANY)
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    domain: "",
    city: "",
    country: "",
  });

  // ✅ FETCH COMPANIES (UNCHANGED)
  const fetchCompanies = async () => {
    setLoading(true);

    try {
      const searchParam = search ? `&search=${search}` : "";

      let backendPage = page;

      if (totalPages === 1) {
        const firstRes = await fetch(
          `${API_BASE}/api/companies?page=1&limit=${limit}${searchParam}`
        );

        const firstData = await firstRes.json();

        const total = firstData.total_pages || 1;
        setTotalPages(total);

        backendPage = total;
      } else {
        backendPage = totalPages - page + 1;
      }

      const res = await fetch(
        `${API_BASE}/api/companies?page=${backendPage}&limit=${limit}${searchParam}`
      );

      if (!res.ok) throw new Error("Fetch failed");

      const data = await res.json();

      const normalizeCompany = (item) => {
        const nameFromDomain = (domain) => {
          if (!domain) return "";
          return domain
            .replace(/^https?:\/\//, "")
            .replace(/^www\./, "")
            .replace(/\.(com|co|in|org|net|io|dev)$/i, "")
            .replace(/[_-]/g, " ")
            .split(" ")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
            .join(" ");
        };

        return {
          ...item,
          displayName:
            item.name?.trim() || nameFromDomain(item.domain),
        };
      };

      const cleaned = (data.data || []).map(normalizeCompany);

      setCompanies(cleaned);
    } catch (err) {
      console.error("Fetch error:", err);
      setCompanies([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    setPage(1);
    setTotalPages(1);
  }, [search]);

  useEffect(() => {
    fetchCompanies();
  }, [page, search]);

  // ✅ ADD COMPANY FUNCTION
  const handleAdd = async () => {
    if (!form.name) {
      alert("Company name required");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/companies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();

      alert("Company added ✅");

      setShowModal(false);
      setForm({
        name: "",
        domain: "",
        city: "",
        country: "",
      });

      fetchCompanies();
    } catch {
      alert("Failed to add company ❌");
    }
  };

  return (
    <div className="relative">

      {/* ✅ ADD BUTTON */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 border px-4 py-2 text-sm rounded hover:bg-white/10"
        >
          <Plus size={14} /> Add Company
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-[#111] border border-white/10 rounded overflow-hidden">
        {loading ? (
          <div className="p-4">Loading...</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="text-gray-500 border-b border-white/10">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Domain</th>
                <th className="p-3 text-left">Location</th>
              </tr>
            </thead>

            <tbody>
              {companies.map((item, i) => (
                <tr
                  key={i}
                  onClick={() => setSelectedItem(item)}
                  className="border-b border-white/5 hover:bg-white/5 cursor-pointer"
                >
                  <td className="p-3 flex items-center gap-2">
                    <Building2 size={14} />
                    {item.displayName || "-"}
                  </td>

                  <td className="p-3">{item.domain || "-"}</td>

                  <td className="p-3">
                    {item.city || "-"}, {item.country || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* PAGINATION (UNCHANGED) */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
        <span>
          Page {page} of {totalPages} (Backend: {totalPages - page + 1})
        </span>

        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 border border-white/20 rounded disabled:opacity-30"
          >
            Prev
          </button>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border border-white/20 rounded disabled:opacity-30"
          >
            Next
          </button>
        </div>
      </div>

       {/* RIGHT SIDE PANEL */}
      {selectedItem && (
  <div className="fixed top-[80px] right-0 w-[420px] h-[calc(100%-80px)] bg-[#111] border-l border-white/10 p-6 shadow-lg overflow-y-auto z-50">

    {/* HEADER */}
    <div className="flex justify-between mb-4">
      <h2 className="text-lg font-semibold">
        {selectedItem.displayName || selectedItem.name}
      </h2>

      <button onClick={() => setSelectedItem(null)}>
        <X size={18} />
      </button>
    </div>

    {/* BASIC INFO */}
    <div className="space-y-3 text-sm">

      <p>
        <span className="text-gray-400">Domain:</span>{" "}
        {selectedItem.domain || "-"}
      </p>

      <p>
        <span className="text-gray-400">Website:</span>{" "}
        {selectedItem.website ? (
          <a
            href={
              selectedItem.website.startsWith("http")
                ? selectedItem.website
                : `https://${selectedItem.website}`
            }
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 underline break-all"
          >
            {selectedItem.website.replace(/^https?:\/\//, "")}
          </a>
        ) : "-"}
      </p>

      <p>
        <span className="text-gray-400">Industry:</span>{" "}
        {selectedItem.industry || "-"}
      </p>

      <p>
        <span className="text-gray-400">Employees:</span>{" "}
        {selectedItem.numberofemployees
          ? selectedItem.numberofemployees.toLocaleString()
          : "-"}
      </p>

      <p>
        <span className="text-gray-400">Revenue:</span>{" "}
        {selectedItem.annualrevenue
          ? `$${(selectedItem.annualrevenue / 1_000_000).toFixed(2)}M`
          : "-"}
      </p>

      <p>
        <span className="text-gray-400">Location:</span>{" "}
        {selectedItem.city || "-"}, {selectedItem.state || "-"},{" "}
        {selectedItem.country || "-"}
      </p>

      <p>
        <span className="text-gray-400">Address:</span>{" "}
        {selectedItem.address || "-"}{" "}
        {selectedItem.zip ? `(${selectedItem.zip})` : ""}
      </p>

      {/* LINKEDIN */}
      <p>
        <span className="text-gray-400">LinkedIn:</span>{" "}
        {selectedItem.linkedin_company_page ? (
          <a
            href={selectedItem.linkedin_company_page}
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 underline break-all"
          >
            {selectedItem.linkedin_company_page.replace(/^https?:\/\//, "")}
          </a>
        ) : "-"}
      </p>

      {/* TECH INFO */}
      <div className="border-t border-white/10 pt-3 space-y-2">
        <p className="text-gray-400">Technology</p>

        <p>
          <span className="text-gray-500">Tech Category:</span>{" "}
          {selectedItem.technology_category || "-"}
        </p>

        <p>
          <span className="text-gray-500">Software Category:</span>{" "}
          {selectedItem.software_category || "-"}
        </p>

        <p>
          <span className="text-gray-500">Area of Work:</span>{" "}
          {selectedItem.area_of_work || "-"}
        </p>
      </div>

      {/* DESCRIPTION */}
      {selectedItem.description && (
        <div className="border-t border-white/10 pt-3">
          <p className="text-gray-400 mb-1">Description:</p>

          <p className="text-xs text-gray-300 whitespace-pre-line leading-relaxed">
            {selectedItem.description}
          </p>
        </div>
      )}
    </div>
  </div>
)}

      {/* ✅ MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#111] p-6 rounded w-[400px] border border-white/10">

            <div className="flex justify-between mb-4">
              <h2>Add Company</h2>
              <button onClick={() => setShowModal(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-sm">

              <input
                placeholder="Company Name"
                className="w-full p-2 bg-black border border-white/10"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <input
                placeholder="Domain"
                className="w-full p-2 bg-black border border-white/10"
                value={form.domain}
                onChange={(e) => setForm({ ...form, domain: e.target.value })}
              />

              <input
                placeholder="City"
                className="w-full p-2 bg-black border border-white/10"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              />

              <input
                placeholder="Country"
                className="w-full p-2 bg-black border border-white/10"
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
              />

              <button
                onClick={handleAdd}
                className="w-full bg-white text-black py-2 mt-2"
              >
                Save Company
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
