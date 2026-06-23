import { useState, useEffect } from "react";
import { Mail, Building2, Search, ChevronDown } from "lucide-react";

const API_BASE = "https://www.selected.jobs/api/helper";

function Alert({ type, message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  const styles =
    type === "success"
      ? "bg-green-500/15 border-green-500/30 text-green-400"
      : "bg-red-500/15 border-red-500/30 text-red-400";

  return (
    <div
      className={`flex items-center justify-between gap-2 text-xs px-3 py-2 rounded border ${styles}`}
    >
      <span>{message}</span>
      <button onClick={onClose} className="opacity-60 hover:opacity-100 leading-none">
        ×
      </button>
    </div>
  );
}

function SequenceLeadCard({ item, onSaved }) {
  const [status, setStatus] = useState(item.status);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(
        `${API_BASE}/crm-sequence-lead/${encodeURIComponent(item.email)}/${status}`,
        { method: "PUT" },
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      onSaved(item.email, status);
      setAlert({ type: "success", message: "Status updated successfully." });
    } catch (err) {
      console.error(err);
      setAlert({ type: "error", message: "Failed to update status." });
    }
    setSaving(false);
  };

  return (
    <div className="bg-[#111] border border-white/10 rounded-lg p-4 flex flex-col gap-3 hover:border-white/20 transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-white">{item.name}</p>
          {item.company_name && (
            <div className="flex items-center gap-1.5 mt-0.5">
              <Building2 size={11} className="text-gray-500 shrink-0" />
              <p className="text-xs text-gray-400">{item.company_name}</p>
            </div>
          )}
        </div>
      </div>

      {/* Email */}
      <a
        href={`mailto:${item.email}`}
        className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors"
      >
        <Mail size={11} />
        {item.email}
      </a>

      {/* Alert */}
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      {/* Footer: status dropdown + save */}
      <div className="flex items-center justify-between pt-1 border-t border-white/5 gap-2">
        <div className="relative">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="appearance-none bg-[#1a1a1a] border border-white/15 text-xs text-gray-300 rounded px-2.5 py-1.5 pr-6 outline-none cursor-pointer hover:border-white/30 transition-colors"
          >
            <option value="open">Open</option>
            <option value="close">Close</option>
          </select>
          <ChevronDown
            size={10}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
          />
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="text-xs px-3 py-1.5 border border-white/20 rounded text-gray-300 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}

function Section({ title, count, accent, children }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        <span
          className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${accent}`}
        >
          {count}
        </span>
        <div className="flex-1 h-px bg-white/5" />
      </div>
      {children}
    </div>
  );
}

export default function SequenceLeads() {
  const [openLeads, setOpenLeads] = useState([]);
  const [closeLeads, setCloseLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError(null);
      try {
        const openRes = await fetch(`${API_BASE}/crm-sequence-leads/open`);
        if (!openRes.ok) throw new Error(`HTTP ${openRes.status}`);
        const openJson = await openRes.json();
        setOpenLeads(openJson.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load sequence leads.");
      }

      try {
        const closeRes = await fetch(`${API_BASE}/crm-sequence-leads/close`);
        if (!closeRes.ok) throw new Error(`HTTP ${closeRes.status}`);
        const closeJson = await closeRes.json();
        setCloseLeads(closeJson.data || []);
      } catch (err) {
        console.error("Close leads not available:", err);
      }

      setLoading(false);
    };

    fetchAll();
  }, []);

  const handleSaved = (email, newStatus) => {
    if (newStatus === "close") {
      const lead = openLeads.find((l) => l.email === email);
      if (lead) {
        setOpenLeads((prev) => prev.filter((l) => l.email !== email));
        setCloseLeads((prev) => [...prev, { ...lead, status: "close" }]);
      }
    } else {
      const lead = closeLeads.find((l) => l.email === email);
      if (lead) {
        setCloseLeads((prev) => prev.filter((l) => l.email !== email));
        setOpenLeads((prev) => [...prev, { ...lead, status: "open" }]);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-500 text-sm">
        Loading sequence leads...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-48 text-red-400 text-sm">
        {error}
      </div>
    );
  }

  const q = search.toLowerCase().trim();
  const filterFn = (item) =>
    !q ||
    item.name?.toLowerCase().includes(q) ||
    item.email?.toLowerCase().includes(q) ||
    item.company_name?.toLowerCase().includes(q);

  const filteredOpen = openLeads.filter(filterFn);
  const filteredClose = closeLeads.filter(filterFn);

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="flex items-center gap-3 bg-[#111] px-4 py-2 border border-white/10 rounded w-full sm:max-w-xs">
        <Search size={14} className="text-gray-500 shrink-0" />
        <input
          className="bg-transparent outline-none text-sm w-full"
          placeholder="Search leads..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="space-y-10">
        <Section
          title="Open"
          count={filteredOpen.length}
          accent="bg-blue-500/10 text-blue-400 border-blue-500/20"
        >
          {filteredOpen.length === 0 ? (
            <p className="text-sm text-gray-600 italic">No open leads.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredOpen.map((item) => (
                <SequenceLeadCard
                  key={item.email}
                  item={item}
                  onSaved={handleSaved}
                />
              ))}
            </div>
          )}
        </Section>

        <Section
          title="Close"
          count={filteredClose.length}
          accent="bg-gray-500/10 text-gray-400 border-gray-500/20"
        >
          {filteredClose.length === 0 ? (
            <p className="text-sm text-gray-600 italic">No closed leads.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredClose.map((item) => (
                <SequenceLeadCard
                  key={item.email}
                  item={item}
                  onSaved={handleSaved}
                />
              ))}
            </div>
          )}
        </Section>
      </div>
    </div>
  );
}
