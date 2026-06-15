import { useState, useEffect, useRef, useCallback } from "react";
import {
  Users,
  X,
  Plus,
  Pencil,
  Trash2,
  Save,
  XCircle,
  CheckSquare,
  Square,
  Building2,
  Search,
  ChevronDown,
  MessageSquare,
  Mail,
  Send,
} from "lucide-react";

const API_BASE = "https://www.selected.jobs/api";

const EMPTY_FORM = {
  firstname: "",
  lastname: "",
  jobtitle: "",
  job_function: "",
  seniority: "",
  email: "",
  mobilephone: "",
  phone: "",
  hs_linkedin_url: "",
  followercount: 0,
  linkedinconnections: 0,
  country: "",
  city: "",
  state: "",
  start_date: "",
  company: "",
  industry: "",
  company_size: "",
  lifecycle_stage: "NEW",
};

const cleanUrl = (url) => {
  if (!url) return "";
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
};

/* ─── Generic text/number field ─── */
const Field = ({ label, name, value, editing, onChange, type = "text" }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[10px] uppercase tracking-widest text-gray-500">
      {label}
    </label>
    {editing ? (
      <input
        type={type}
        name={name}
        value={value ?? ""}
        onChange={onChange}
        className="bg-[#1a1a1a] border border-white/10 rounded px-2 py-1.5 text-sm text-white focus:outline-none focus:border-white/30 transition-colors"
      />
    ) : name === "hs_linkedin_url" ? (
      <a
        href={value}
        target="_blank"
        rel="noreferrer"
        className="text-sm text-blue-400 hover:underline break-all"
      >
        {cleanUrl(value) || <span className="text-gray-600 italic">—</span>}
      </a>
    ) : (
      <p className="text-sm text-gray-200 break-words">
        {value || <span className="text-gray-600 italic">—</span>}
      </p>
    )}
  </div>
);

/* ─── Searchable Company Dropdown ─── */
function CompanyDropdown({ value, onChange, compact = false }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [companies, setCompanies] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showOther, setShowOther] = useState(false);
  const [otherValue, setOtherValue] = useState("");

  const wrapRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const debRef = useRef(null);

  const fetchCompanies = useCallback(async (q = "", pg = 1, append = false) => {
    setFetching(true);
    try {
      const qs = `page=${pg}&limit=10${q ? `&search=${encodeURIComponent(q)}` : ""}`;
      const res = await fetch(`${API_BASE}/api/companies?${qs}`, {
        headers: { accept: "application/json" },
      });
      const data = await res.json();
      const list = Array.isArray(data)
        ? data
        : (data.data ?? data.companies ?? data.results ?? []);
      const total = data.total ?? data.count ?? null;
      setCompanies((prev) => (append ? [...prev, ...list] : list));
      setHasMore(total ? pg * 10 < total : list.length === 10);
    } catch {
      if (!append) setCompanies([]);
    } finally {
      setFetching(false);
    }
  }, []);

  /* open → fetch */
  useEffect(() => {
    if (open) {
      setPage(1);
      fetchCompanies(search, 1, false);
      setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [open]); // eslint-disable-line

  /* debounced search */
  useEffect(() => {
    if (!open) return;
    clearTimeout(debRef.current);
    debRef.current = setTimeout(() => {
      setPage(1);
      fetchCompanies(search, 1, false);
    }, 350);
    return () => clearTimeout(debRef.current);
  }, [search]); // eslint-disable-line

  /* outside click */
  useEffect(() => {
    const h = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target))
        setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  /* infinite scroll */
  const onScroll = () => {
    const el = listRef.current;
    if (!el || fetching || !hasMore) return;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 40) {
      const next = page + 1;
      setPage(next);
      fetchCompanies(search, next, true);
    }
  };

  const pick = (name) => {
    onChange(name);
    setOpen(false);
    setSearch("");
    setShowOther(false);
  };
  const clear = () => {
    onChange("");
    setOtherValue("");
    setShowOther(false);
  };
  const confirmOther = () => {
    if (otherValue.trim()) {
      onChange(otherValue.trim());
      setShowOther(false);
    }
  };

  const getName = (c) =>
    typeof c === "string" ? c : (c.name ?? c.company_name ?? c.title ?? "");

  return (
    <div ref={wrapRef} className="relative flex flex-col gap-1">
      <label className="text-[10px] uppercase tracking-widest text-gray-500">
        Company
      </label>

      {/* Trigger */}
      <button
        type="button"
        onClick={() => {
          setOpen((o) => !o);
          setShowOther(false);
        }}
        className={`w-full flex items-center justify-between gap-2 px-2 py-1.5 text-sm rounded border transition-colors
          ${open ? "border-white/30 bg-[#222]" : "border-white/10 bg-[#1a1a1a]"}
          ${value ? "text-white" : "text-gray-500"}`}
      >
        <span className="flex items-center gap-1.5 truncate">
          <Building2
            size={12}
            className={value ? "text-gray-400" : "text-gray-600"}
          />
          <span className="truncate">{value || "Select company…"}</span>
        </span>
        <span className="flex items-center gap-0.5 flex-shrink-0">
          {value && (
            <span
              onMouseDown={(e) => {
                e.stopPropagation();
                clear();
              }}
              className="p-0.5 text-gray-600 hover:text-gray-300 transition-colors cursor-pointer"
            >
              <X size={11} />
            </span>
          )}
          <ChevronDown
            size={12}
            className={`text-gray-500 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
          />
        </span>
      </button>

      {/* Panel */}
      {open && (
        <div className="absolute z-[60] top-full mt-1 w-full bg-[#161616] border border-white/15 rounded shadow-2xl shadow-black/70">
          {/* Search */}
          <div className="p-1.5 border-b border-white/[0.06]">
            <div className="flex items-center gap-1.5 bg-[#0f0f0f] border border-white/10 rounded px-2 py-1">
              <Search size={11} className="text-gray-600 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search…"
                className="w-full bg-transparent text-white text-xs placeholder-gray-600 outline-none"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="text-gray-600 hover:text-gray-400"
                >
                  <X size={10} />
                </button>
              )}
            </div>
          </div>

          {/* List */}
          <ul
            ref={listRef}
            onScroll={onScroll}
            className="max-h-44 overflow-y-auto py-0.5"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(255,255,255,0.08) transparent",
            }}
          >
            {companies.length === 0 && !fetching && (
              <li className="px-3 py-2 text-gray-600 text-xs italic">
                No companies found
              </li>
            )}
            {companies.map((c, i) => {
              const name = getName(c);
              return (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => pick(name)}
                    className="w-full text-left px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-white/[0.05] transition-colors flex items-center gap-2"
                  >
                    <Building2
                      size={11}
                      className="text-gray-600 flex-shrink-0"
                    />
                    {name}
                  </button>
                </li>
              );
            })}
            {fetching && (
              <li className="flex justify-center py-2">
                <span className="w-3.5 h-3.5 border border-white/15 border-t-white/50 rounded-full animate-spin" />
              </li>
            )}
          </ul>

          {/* Other */}
          <div className="border-t border-white/[0.06] p-0.5">
            <button
              type="button"
              onClick={() => {
                setShowOther(true);
                setOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-[10px] uppercase tracking-wider text-gray-600 hover:text-gray-400 hover:bg-white/[0.03] transition-colors flex items-center gap-1.5 rounded"
            >
              <span className="text-gray-700">+</span> Other company
            </button>
          </div>
        </div>
      )}

      {/* Other free-text */}
      {showOther && (
        <div className="flex gap-1.5 mt-1">
          <input
            autoFocus
            type="text"
            value={otherValue}
            onChange={(e) => setOtherValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && confirmOther()}
            placeholder="Enter company name…"
            className="flex-1 bg-[#1a1a1a] border border-white/10 rounded px-2 py-1.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition-colors"
          />
          <button
            type="button"
            onClick={confirmOther}
            className="px-3 py-1.5 bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs rounded transition-colors whitespace-nowrap"
          >
            OK
          </button>
          <button
            type="button"
            onClick={() => {
              setShowOther(false);
              setOtherValue("");
            }}
            className="px-2 py-1.5 text-gray-600 hover:text-gray-300 transition-colors"
          >
            <X size={13} />
          </button>
        </div>
      )}
    </div>
  );
}

/* ─── Transcript Modal ─── */
function TranscriptModal({ contact, onClose }) {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  const fetchEmails = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${API_BASE}/transcript/email/${encodeURIComponent(contact.email)}`,
      );
      if (!res.ok) throw new Error();
      const data = await res.json();
      setEmails(Array.isArray(data) ? data : []);
    } catch {
      setEmails([]);
    } finally {
      setLoading(false);
    }
  }, [contact.email]);

  useEffect(() => {
    fetchEmails();
  }, [fetchEmails]);

  useEffect(() => {
    if (!loading) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [emails, loading]);

  const handleSend = async () => {
    if (!subject.trim() || !body.trim()) return;
    setSending(true);
    try {
      const sendRes = await fetch(`${API_BASE}/api/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipient: contact.email,
          subject: subject.trim(),
          body_text: body.trim(),
          body_html: `<p>${body.trim().replace(/\n/g, "<br/>")}</p>`,
        }),
      });
      const sendData = await sendRes.json();
      if (!sendData.success) throw new Error("Send failed");

      await fetch(`${API_BASE}/transcript/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender_email:
            localStorage.getItem("crm_user_email") || "recruiter@selected.jobs",
          receiver_email: contact.email,
          subject: subject.trim(),
          body: body.trim(),
          direction: "outbound",
          sent_at: new Date().toISOString(),
        }),
      });

      setSubject("");
      setBody("");
      await fetchEmails();
    } catch {
      alert("Failed to send email ❌");
    } finally {
      setSending(false);
    }
  };

  const fmt = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60]">
      <div className="bg-[#0d1117] border border-white/10 rounded-xl w-[700px] h-[88vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#111418] rounded-t-xl shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <MessageSquare size={15} className="text-teal-400 shrink-0" />
            <h2 className="text-sm font-semibold text-white">Transcript</h2>
            <span className="text-gray-500 text-xs">—</span>
            <span className="text-gray-200 text-xs font-medium truncate">
              {contact.fullName}
            </span>
            <span className="text-gray-600 text-xs truncate hidden sm:block">
              ({contact.email})
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white p-1.5 rounded hover:bg-white/10 transition-colors shrink-0 ml-2"
          >
            <X size={15} />
          </button>
        </div>

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto px-5 py-4 space-y-3"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(255,255,255,0.08) transparent",
          }}
        >
          {loading ? (
            <div className="flex items-center justify-center h-full gap-2 text-gray-500 text-sm">
              <span className="w-4 h-4 border border-white/15 border-t-white/50 rounded-full animate-spin" />
              Loading emails…
            </div>
          ) : emails.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-600 text-sm italic">
              No emails found for {contact.email}
            </div>
          ) : (
            emails.map((email) => {
              const isOut = email.direction === "outbound";
              return (
                <div
                  key={email.message_id}
                  className={`flex flex-col ${isOut ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-4 py-3 ${
                      isOut
                        ? "bg-[#0d4a3a] border border-teal-800/40"
                        : "bg-[#1a1f2e] border border-white/[0.07]"
                    }`}
                  >
                    {/* Meta row */}
                    <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                      <Mail
                        size={11}
                        className={isOut ? "text-teal-400" : "text-blue-400"}
                      />
                      <span className="text-xs font-medium text-gray-200 truncate max-w-[180px]">
                        {email.sender_email}
                      </span>
                      {isOut && (
                        <span className="text-[10px] text-gray-500">
                          (To: {email.receiver_email})
                        </span>
                      )}
                      <span className="text-[10px] text-gray-600 ml-auto">
                        {fmt(email.sent_at)}
                      </span>
                    </div>
                    {/* Subject */}
                    <div className="text-[10px] text-gray-500 mb-2 uppercase tracking-wide">
                      Subject: {email.subject}
                    </div>
                    {/* Body */}
                    <p className="text-sm text-gray-200 leading-relaxed whitespace-pre-wrap">
                      {email.body}
                    </p>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Compose area */}
        <div className="border-t border-white/10 bg-[#0f1217] px-5 py-4 space-y-2.5 rounded-b-xl shrink-0">
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject…"
            className="w-full bg-[#1a1f2e] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white/20 transition-colors"
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write your email…"
            rows={4}
            className="w-full bg-[#1a1f2e] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white/20 transition-colors resize-none"
          />
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-gray-600">
              To:{" "}
              <span className="text-gray-400">{contact.email}</span>
            </span>
            <button
              onClick={handleSend}
              disabled={sending || !subject.trim() || !body.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {sending ? (
                <>
                  <span className="w-3.5 h-3.5 border border-white/30 border-t-white rounded-full animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <Send size={13} />
                  Send
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main component ─── */
export default function ContactsTable({ search }) {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  const [checkedIds, setCheckedIds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [addForm, setAddForm] = useState(EMPTY_FORM);
  const [transcriptContact, setTranscriptContact] = useState(null);

  // ─── FETCH ──────────────────────────────────────────────────────────────────
  const fetchContacts = async () => {
    setLoading(true);
    try {
      const searchParam = search ? `&search=${encodeURIComponent(search)}` : "";
      const res = await fetch(
        `${API_BASE}/api/contacts?page=${page}&limit=${limit}${searchParam}`,
      );
      const data = await res.json();
      setTotalPages(data.total_pages || 1);
      const cleaned = (data.data || []).map((item) => ({
        ...item,
        id: item.contactId,
        fullName:
          `${item.firstname || ""} ${item.lastname || ""}`.trim() ||
          item.email ||
          "Unknown",
      }));
      setContacts(cleaned);
    } catch (err) {
      console.error(err);
      setContacts([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    setPage(1);
    setCheckedIds([]);
  }, [search]);
  useEffect(() => {
    fetchContacts();
  }, [page, search]);

  // ─── ADD ────────────────────────────────────────────────────────────────────
  const handleAdd = async () => {
    if (!addForm.firstname || !addForm.email) {
      alert("First name and email are required");
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/api/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...addForm,
          followercount: Number(addForm.followercount || 0),
          linkedinconnections: Number(addForm.linkedinconnections || 0),
        }),
      });
      if (!res.ok) throw new Error();
      setShowModal(false);
      setAddForm(EMPTY_FORM);
      fetchContacts();
    } catch {
      alert("Add failed ❌");
    }
  };

  // ─── UPDATE ─────────────────────────────────────────────────────────────────
  const handleUpdate = async () => {
    try {
      const payload = {
        ...editForm,
        followercount: editForm.followercount
          ? Number(editForm.followercount)
          : 0,
        linkedinconnections: editForm.linkedinconnections
          ? Number(editForm.linkedinconnections)
          : 0,
      };
      const res = await fetch(
        `${API_BASE}/api/contacts/${selectedItem.contactId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      if (!res.ok) throw new Error();
      setIsEditing(false);
      setSelectedItem({
        ...selectedItem,
        ...payload,
        fullName:
          `${payload.firstname || ""} ${payload.lastname || ""}`.trim() ||
          payload.email ||
          "Unknown",
      });
      fetchContacts();
    } catch {
      alert("Update failed ❌");
    }
  };

  // ─── DELETE SINGLE ───────────────────────────────────────────────────────────
  const handleDeleteSingle = async (item) => {
    if (!window.confirm(`Delete "${item.fullName}"?`)) return;
    try {
      const res = await fetch(`${API_BASE}/api/contacts/${item.contactId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      setSelectedItem(null);
      setCheckedIds((prev) => prev.filter((id) => id !== item.contactId));
      fetchContacts();
    } catch {
      alert("Delete failed ❌");
    }
  };

  // ─── DELETE MULTIPLE ─────────────────────────────────────────────────────────
  const handleDeleteMultiple = async () => {
    if (!window.confirm(`Delete ${checkedIds.length} selected contacts?`))
      return;
    try {
      const res = await fetch(`${API_BASE}/api/contacts/delete-multiple`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: checkedIds }),
      });
      if (!res.ok) throw new Error();
      setCheckedIds([]);
      setSelectedItem(null);
      fetchContacts();
    } catch {
      alert("Bulk delete failed ❌");
    }
  };

  // ─── CHECKBOX HELPERS ────────────────────────────────────────────────────────
  const toggleCheck = (id, e) => {
    e.stopPropagation();
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };
  const allChecked =
    contacts.length > 0 &&
    contacts.every((c) => checkedIds.includes(c.contactId));
  const toggleAll = () => {
    if (allChecked) {
      setCheckedIds((prev) =>
        prev.filter((id) => !contacts.find((c) => c.contactId === id)),
      );
    } else {
      setCheckedIds((prev) => [
        ...prev,
        ...contacts.map((c) => c.contactId).filter((id) => !prev.includes(id)),
      ]);
    }
  };

  const handleEditFormChange = (e) =>
    setEditForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleAddFormChange = (e) =>
    setAddForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // ─── RENDER ──────────────────────────────────────────────────────────────────
  return (
    <div className="relative">
      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-4">
        {checkedIds.length > 0 ? (
          <button
            onClick={handleDeleteMultiple}
            className="flex items-center gap-2 px-3 py-2 text-sm rounded border border-red-500/60 text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <Trash2 size={14} /> Delete {checkedIds.length} selected
          </button>
        ) : (
          <div />
        )}
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 border border-white/20 px-4 py-2 text-sm rounded hover:bg-white/10 transition-colors"
        >
          <Plus size={14} /> Add Contact
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-[#111] border border-white/10 rounded overflow-hidden">
        {loading ? (
          <div className="p-6 text-gray-500 text-sm">Loading...</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="text-gray-500 border-b border-white/10 text-xs uppercase tracking-wider">
              <tr>
                <th className="p-3 w-10">
                  <button
                    onClick={toggleAll}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {allChecked ? (
                      <CheckSquare size={15} />
                    ) : (
                      <Square size={15} />
                    )}
                  </button>
                </th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Company</th>
                <th className="p-3 text-left">Job Title</th>
                <th className="p-3 w-32 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="p-6 text-center text-gray-600 text-sm italic"
                  >
                    No contacts found
                  </td>
                </tr>
              ) : (
                contacts.map((item) => (
                  <tr
                    key={item.contactId}
                    onClick={() => {
                      setSelectedItem(item);
                      setEditForm(item);
                      setIsEditing(false);
                    }}
                    className={`border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors
                    ${selectedItem?.contactId === item.contactId ? "bg-white/5" : ""}
                    ${checkedIds.includes(item.contactId) ? "bg-white/[0.03]" : ""}`}
                  >
                    <td className="p-3" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={(e) => toggleCheck(item.contactId, e)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {checkedIds.includes(item.contactId) ? (
                          <CheckSquare size={15} className="text-white" />
                        ) : (
                          <Square size={15} />
                        )}
                      </button>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Users size={13} className="text-gray-500 shrink-0" />
                        <span className="font-medium">{item.fullName}</span>
                      </div>
                    </td>
                    <td className="p-3 text-gray-400">{item.email || "—"}</td>
                    <td className="p-3 text-gray-400">{item.company || "—"}</td>
                    <td className="p-3 text-gray-400">
                      {item.jobtitle || "—"}
                    </td>
                    <td className="p-3" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          title="Transcript"
                          onClick={(e) => {
                            e.stopPropagation();
                            setTranscriptContact(item);
                          }}
                          className="text-gray-400 hover:text-teal-400 transition-colors p-1 rounded hover:bg-teal-500/10"
                        >
                          <MessageSquare size={13} />
                        </button>
                        <button
                          title="Edit"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedItem(item);
                            setEditForm(item);
                            setIsEditing(true);
                          }}
                          className="text-gray-400 hover:text-white transition-colors p-1 rounded hover:bg-white/10"
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          title="Delete"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteSingle(item);
                          }}
                          className="text-gray-400 hover:text-red-400 transition-colors p-1 rounded hover:bg-red-500/10"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
        <span>
          Page {page} of {totalPages}
        </span>
        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 border border-white/10 rounded hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Prev
          </button>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border border-white/10 rounded hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>

      {/* ── SIDE PANEL ─────────────────────────────────────────────────────────── */}
      {selectedItem && (
        <div className="fixed top-[60px] right-0 w-[400px] h-[calc(100vh-60px)] bg-[#0f0f0f] border-l border-white/10 flex flex-col z-50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2">
              <Users size={15} className="text-gray-400" />
              <h2 className="text-sm font-semibold truncate max-w-[220px]">
                {isEditing
                  ? `${editForm.firstname || ""} ${editForm.lastname || ""}`.trim() ||
                    "Edit Contact"
                  : selectedItem.fullName}
              </h2>
            </div>
            <div className="flex items-center gap-1">
              {!isEditing ? (
                <>
                  <button
                    title="Edit"
                    onClick={() => setIsEditing(true)}
                    className="p-2 rounded text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    title="Delete"
                    onClick={() => handleDeleteSingle(selectedItem)}
                    className="p-2 rounded text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </>
              ) : (
                <>
                  <button
                    title="Save"
                    onClick={handleUpdate}
                    className="p-2 rounded text-gray-400 hover:text-green-400 hover:bg-green-500/10 transition-colors"
                  >
                    <Save size={14} />
                  </button>
                  <button
                    title="Cancel"
                    onClick={() => {
                      setIsEditing(false);
                      setEditForm(selectedItem);
                    }}
                    className="p-2 rounded text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10 transition-colors"
                  >
                    <XCircle size={14} />
                  </button>
                </>
              )}
              <button
                onClick={() => {
                  setSelectedItem(null);
                  setIsEditing(false);
                }}
                className="p-2 rounded text-gray-400 hover:text-white hover:bg-white/10 transition-colors ml-1"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Scrollable fields */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            <div className="text-[10px] uppercase tracking-widest text-gray-600 font-semibold pb-1 border-b border-white/5">
              Basic Info
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field
                label="First Name"
                name="firstname"
                value={editForm.firstname}
                editing={isEditing}
                onChange={handleEditFormChange}
              />
              <Field
                label="Last Name"
                name="lastname"
                value={editForm.lastname}
                editing={isEditing}
                onChange={handleEditFormChange}
              />
            </div>
            <Field
              label="Job Title"
              name="jobtitle"
              value={editForm.jobtitle}
              editing={isEditing}
              onChange={handleEditFormChange}
            />
            <Field
              label="Job Function"
              name="job_function"
              value={editForm.job_function}
              editing={isEditing}
              onChange={handleEditFormChange}
            />
            <Field
              label="Seniority"
              name="seniority"
              value={editForm.seniority}
              editing={isEditing}
              onChange={handleEditFormChange}
            />
            <Field
              label="Lifecycle Stage"
              name="lifecycle_stage"
              value={editForm.lifecycle_stage}
              editing={isEditing}
              onChange={handleEditFormChange}
            />

            <div className="text-[10px] uppercase tracking-widest text-gray-600 font-semibold pt-2 pb-1 border-b border-white/5">
              Contact
            </div>
            <Field
              label="Email"
              name="email"
              value={editForm.email}
              editing={isEditing}
              onChange={handleEditFormChange}
            />
            <Field
              label="Phone"
              name="phone"
              value={editForm.phone}
              editing={isEditing}
              onChange={handleEditFormChange}
            />
            <Field
              label="Mobile Phone"
              name="mobilephone"
              value={editForm.mobilephone}
              editing={isEditing}
              onChange={handleEditFormChange}
            />
            <Field
              label="LinkedIn URL"
              name="hs_linkedin_url"
              value={editForm.hs_linkedin_url}
              editing={isEditing}
              onChange={handleEditFormChange}
            />
            <div className="grid grid-cols-2 gap-3">
              <Field
                label="Followers"
                name="followercount"
                value={editForm.followercount}
                type="number"
                editing={isEditing}
                onChange={handleEditFormChange}
              />
              <Field
                label="LinkedIn Connections"
                name="linkedinconnections"
                value={editForm.linkedinconnections}
                type="number"
                editing={isEditing}
                onChange={handleEditFormChange}
              />
            </div>

            <div className="text-[10px] uppercase tracking-widest text-gray-600 font-semibold pt-2 pb-1 border-b border-white/5">
              Company
            </div>

            {/* ── Company dropdown (edit mode) or plain text (view mode) ── */}
            {isEditing ? (
              <CompanyDropdown
                value={editForm.company}
                onChange={(company) =>
                  setEditForm((prev) => ({ ...prev, company }))
                }
              />
            ) : (
              <Field
                label="Company"
                name="company"
                value={editForm.company}
                editing={false}
                onChange={() => {}}
              />
            )}

            <Field
              label="Industry"
              name="industry"
              value={editForm.industry}
              editing={isEditing}
              onChange={handleEditFormChange}
            />
            <Field
              label="Company Size"
              name="company_size"
              value={editForm.company_size}
              editing={isEditing}
              onChange={handleEditFormChange}
            />
            <Field
              label="Start Date"
              name="start_date"
              value={editForm.start_date}
              editing={isEditing}
              onChange={handleEditFormChange}
            />

            <div className="text-[10px] uppercase tracking-widest text-gray-600 font-semibold pt-2 pb-1 border-b border-white/5">
              Location
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field
                label="City"
                name="city"
                value={editForm.city}
                editing={isEditing}
                onChange={handleEditFormChange}
              />
              <Field
                label="State"
                name="state"
                value={editForm.state}
                editing={isEditing}
                onChange={handleEditFormChange}
              />
            </div>
            <Field
              label="Country"
              name="country"
              value={editForm.country}
              editing={isEditing}
              onChange={handleEditFormChange}
            />
          </div>

          {/* Save bar */}
          {isEditing && (
            <div className="shrink-0 px-5 py-3 border-t border-white/10 flex gap-2">
              <button
                onClick={handleUpdate}
                className="flex-1 flex items-center justify-center gap-2 bg-white text-black text-sm font-medium py-2 rounded hover:bg-gray-200 transition-colors"
              >
                <Save size={13} /> Save Changes
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditForm(selectedItem);
                }}
                className="flex items-center justify-center gap-2 border border-white/20 text-gray-300 text-sm py-2 px-4 rounded hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── TRANSCRIPT MODAL ───────────────────────────────────────────────────── */}
      {transcriptContact && (
        <TranscriptModal
          contact={transcriptContact}
          onClose={() => setTranscriptContact(null)}
        />
      )}

      {/* ── ADD MODAL ──────────────────────────────────────────────────────────── */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#111] border border-white/10 rounded-lg w-[420px] max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center px-5 py-4 border-b border-white/10">
              <h2 className="text-sm font-semibold">Add Contact</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
              {/* Basic Info */}
              <div>
                <div className="text-[10px] uppercase tracking-widest text-gray-600 font-semibold mb-3">
                  Basic Info
                </div>
                {[
                  ["First Name *", "firstname"],
                  ["Last Name", "lastname"],
                  ["Job Title", "jobtitle"],
                  ["Job Function", "job_function"],
                  ["Seniority", "seniority"],
                ].map(([label, name]) => (
                  <div key={name} className="flex flex-col gap-1 mb-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500">
                      {label}
                    </label>
                    <input
                      name={name}
                      value={addForm[name]}
                      onChange={handleAddFormChange}
                      className="bg-[#1a1a1a] border border-white/10 rounded px-2 py-1.5 text-sm text-white focus:outline-none focus:border-white/30"
                    />
                  </div>
                ))}
              </div>

              {/* Contact */}
              <div>
                <div className="text-[10px] uppercase tracking-widest text-gray-600 font-semibold mb-3">
                  Contact
                </div>
                {[
                  ["Email *", "email"],
                  ["Phone", "phone"],
                  ["Mobile Phone", "mobilephone"],
                  ["LinkedIn URL", "hs_linkedin_url"],
                ].map(([label, name]) => (
                  <div key={name} className="flex flex-col gap-1 mb-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500">
                      {label}
                    </label>
                    <input
                      name={name}
                      value={addForm[name]}
                      onChange={handleAddFormChange}
                      className="bg-[#1a1a1a] border border-white/10 rounded px-2 py-1.5 text-sm text-white focus:outline-none focus:border-white/30"
                    />
                  </div>
                ))}
              </div>

              {/* Company */}
              <div>
                <div className="text-[10px] uppercase tracking-widest text-gray-600 font-semibold mb-3">
                  Company
                </div>

                {/* ── Company dropdown ── */}
                <div className="mb-2">
                  <CompanyDropdown
                    value={addForm.company}
                    onChange={(company) =>
                      setAddForm((prev) => ({ ...prev, company }))
                    }
                  />
                </div>

                {[
                  ["Industry", "industry"],
                  ["Company Size", "company_size"],
                  ["Start Date", "start_date"],
                ].map(([label, name]) => (
                  <div key={name} className="flex flex-col gap-1 mb-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500">
                      {label}
                    </label>
                    <input
                      name={name}
                      value={addForm[name]}
                      onChange={handleAddFormChange}
                      className="bg-[#1a1a1a] border border-white/10 rounded px-2 py-1.5 text-sm text-white focus:outline-none focus:border-white/30"
                    />
                  </div>
                ))}
              </div>

              {/* Location */}
              <div>
                <div className="text-[10px] uppercase tracking-widest text-gray-600 font-semibold mb-3">
                  Location
                </div>
                {[
                  ["City", "city"],
                  ["State", "state"],
                  ["Country", "country"],
                ].map(([label, name]) => (
                  <div key={name} className="flex flex-col gap-1 mb-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500">
                      {label}
                    </label>
                    <input
                      name={name}
                      value={addForm[name]}
                      onChange={handleAddFormChange}
                      className="bg-[#1a1a1a] border border-white/10 rounded px-2 py-1.5 text-sm text-white focus:outline-none focus:border-white/30"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="px-5 py-4 border-t border-white/10">
              <button
                onClick={handleAdd}
                className="w-full bg-white text-black text-sm font-medium py-2 rounded hover:bg-gray-200 transition-colors"
              >
                Add Contact
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
