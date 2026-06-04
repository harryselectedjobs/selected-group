import { useState, useEffect } from "react";
import {
  Phone,
  Mail,
  Building2,
  Briefcase,
  Calendar,
  MessageSquare,
  Search,
} from "lucide-react";

const API_BASE = "http://3.109.182.15:1802";

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function EnquiryCard({ item }) {
  return (
    <div className="bg-[#111] border border-white/10 rounded-lg p-4 flex flex-col gap-3 hover:border-white/20 transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-white">{item.full_name}</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <Building2 size={11} className="text-gray-500 shrink-0" />
            <p className="text-xs text-gray-400">{item.company_name}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <Calendar size={11} className="text-gray-600" />
          <span className="text-[11px] text-gray-500">
            {formatDate(item.created_at)}
          </span>
        </div>
      </div>

      {/* Contact info */}
      <div className="flex flex-wrap gap-x-4 gap-y-1.5">
        <a
          href={`mailto:${item.work_email}`}
          className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors"
        >
          <Mail size={11} />
          {item.work_email}
        </a>
        <span className="flex items-center gap-1.5 text-xs text-gray-400">
          <Phone size={11} className="text-gray-500" />
          {item.phone_number}
        </span>
      </div>

      {/* Practice area */}
      <div className="flex items-center gap-1.5">
        <Briefcase size={11} className="text-gray-500 shrink-0" />
        <span className="text-xs text-gray-300">{item.practice_area}</span>
      </div>

      {/* Hiring brief */}
      {item.hiring_brief && (
        <div className="flex gap-1.5">
          <MessageSquare size={11} className="text-gray-500 shrink-0 mt-0.5" />
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
            {item.hiring_brief}
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-white/5">
        <span
          className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
            item.is_contacted
              ? "bg-green-500/10 text-green-400 border border-green-500/20"
              : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
          }`}
        >
          {item.is_contacted ? "Contacted" : "Pending"}
        </span>
        <button
          className="text-xs px-3 py-1.5 border border-white/20 rounded text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
          onClick={() => {}}
        >
          Contact
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

export default function EnquireList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchEnquiries = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/contact-us/all`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setData(json.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load enquiries.");
      }
      setLoading(false);
    };

    fetchEnquiries();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-500 text-sm">
        Loading enquiries...
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
  const filtered = q
    ? data.filter(
        (item) =>
          item.full_name?.toLowerCase().includes(q) ||
          item.company_name?.toLowerCase().includes(q) ||
          item.work_email?.toLowerCase().includes(q) ||
          item.phone_number?.toLowerCase().includes(q) ||
          item.practice_area?.toLowerCase().includes(q),
      )
    : data;

  const notContacted = filtered.filter((item) => !item.is_contacted);
  const contacted = filtered.filter((item) => item.is_contacted);

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="flex items-center gap-3 bg-[#111] px-4 py-2 border border-white/10 rounded w-full sm:max-w-xs">
        <Search size={14} className="text-gray-500 shrink-0" />
        <input
          className="bg-transparent outline-none text-sm w-full"
          placeholder="Search enquiries..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="space-y-10">
        <Section
          title="Not Contacted"
          count={notContacted.length}
          accent="bg-amber-500/10 text-amber-400 border-amber-500/20"
        >
          {notContacted.length === 0 ? (
            <p className="text-sm text-gray-600 italic">No pending enquiries.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {notContacted.map((item) => (
                <EnquiryCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </Section>

        <Section
          title="Contacted"
          count={contacted.length}
          accent="bg-green-500/10 text-green-400 border-green-500/20"
        >
          {contacted.length === 0 ? (
            <p className="text-sm text-gray-600 italic">
              No contacted enquiries yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {contacted.map((item) => (
                <EnquiryCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </Section>
      </div>
    </div>
  );
}
