import { useState, useEffect, useRef, useCallback } from "react";
import {
  Mail,
  Building2,
  Search,
  ChevronDown,
  MessageSquare,
  X,
  Send,
} from "lucide-react";

const API_BASE = "https://www.selected.jobs/api/helper";
const TRANSCRIPT_API = "https://www.selected.jobs/api";

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
      <button
        onClick={onClose}
        className="opacity-60 hover:opacity-100 leading-none"
      >
        ×
      </button>
    </div>
  );
}

function TranscriptModal({ contact, onClose }) {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [showCompose, setShowCompose] = useState(false);
  const messagesEndRef = useRef(null);

  const fetchEmails = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${TRANSCRIPT_API}/transcript/email/${encodeURIComponent(contact.email)}`,
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
      const sendRes = await fetch(`${TRANSCRIPT_API}/api/send-email`, {
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

      await fetch(`${TRANSCRIPT_API}/transcript/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender_email:
            localStorage.getItem("crm_user_email") || "harry@selected.jobs",
          receiver_email: contact.email,
          subject: subject.trim(),
          body: body.trim(),
          direction: "outbound",
          sent_at: new Date().toISOString(),
        }),
      });

      setSubject("");
      setBody("");
      setShowCompose(false);
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
          <div className="flex items-center gap-2 shrink-0 ml-2">
            <button
              onClick={() => {
                setShowCompose((v) => !v);
                setSubject("");
                setBody("");
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-medium rounded-lg transition-colors"
            >
              <Mail size={12} />
              New Mail
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-white p-1.5 rounded hover:bg-white/10 transition-colors"
            >
              <X size={15} />
            </button>
          </div>
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
                    <div className="text-[10px] text-gray-500 mb-2 uppercase tracking-wide">
                      Subject: {email.subject}
                    </div>
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
        {showCompose && (
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
                To: <span className="text-gray-400">{contact.email}</span>
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
        )}
      </div>
    </div>
  );
}

function SequenceLeadCard({ item, onSaved }) {
  const [status, setStatus] = useState(item.status);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState(null);
  const [showTranscript, setShowTranscript] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(
        `${API_BASE}/crm-sequence-lead/${encodeURIComponent(item.email)}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        },
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      if (!json.success) throw new Error("API returned success: false");
      onSaved(item.email, json.data.status);
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

      {/* Email + Transcript */}
      <div className="flex items-center justify-between gap-2">
        <a
          href={`mailto:${item.email}`}
          className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors min-w-0 truncate"
        >
          <Mail size={11} className="shrink-0" />
          <span className="truncate">{item.email}</span>
        </a>
        <button
          title="Transcript"
          onClick={() => setShowTranscript(true)}
          className="shrink-0 text-gray-500 hover:text-teal-400 transition-colors p-1 rounded hover:bg-teal-500/10"
        >
          <MessageSquare size={13} />
        </button>
      </div>

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
            <option value="closed">Close</option>
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

      {showTranscript && (
        <TranscriptModal
          contact={{ email: item.email, fullName: item.name }}
          onClose={() => setShowTranscript(false)}
        />
      )}
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
        const closeRes = await fetch(`${API_BASE}/crm-sequence-leads/closed`);
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
    if (newStatus === "closed") {
      const lead = openLeads.find((l) => l.email === email);
      if (lead) {
        setOpenLeads((prev) => prev.filter((l) => l.email !== email));
        setCloseLeads((prev) => [...prev, { ...lead, status: "closed" }]);
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
