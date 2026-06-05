import { useState, useEffect } from "react";
import { Users, CheckSquare, Square, Send } from "lucide-react";
import api from "../services/api";

const ENROLL_API = "https://www.selected.jobs/api/api/v1/sequence-queue/enroll";

export default function EnrollmentTable({ sequenceId }) {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const [checkedIds, setCheckedIds] = useState([]);
  const [enrolling, setEnrolling] = useState(false);
  const [enrollStatus, setEnrollStatus] = useState(null); // "success" | "error" | null

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await api.get(
        `/sequence-queue/${sequenceId}/unenrolled-contacts?page=${page}&limit=${limit}`,
      );
      const data = res.data;
      setTotalPages(data.total_pages || 1);
      const cleaned = (data.data || []).map((item) => ({
        ...item,
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
    if (sequenceId) fetchContacts();
  }, [page, sequenceId]);

  // Reset to page 1 when sequenceId changes
  useEffect(() => {
    setPage(1);
    setCheckedIds([]);
    setEnrollStatus(null);
  }, [sequenceId]);

  const toggleCheck = (id) => {
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

  const handleEnroll = async () => {
    if (checkedIds.length === 0 || enrolling) return;
    setEnrolling(true);
    setEnrollStatus(null);
    try {
      const seqRes = await api.get(`/sequences/${sequenceId}`);
      const seq = seqRes.data;

      const selectedContacts = contacts
        .filter((c) => checkedIds.includes(c.contactId))
        .map((c) => ({
          contact_id: c.contactId,
          email: c.email,
          firstname: c.firstname,
          lastname: c.lastname,
          company: c.company || "",
          jobtitle: c.jobtitle || "",
        }));

      const payload = {
        sequence: {
          sequence_id: seq.sequence_id,
          name: seq.name,
          goal: seq.goal,
          steps: (seq.steps || []).map((s) => ({
            step_order: s.step_order,
            delay_days: s.delay_days,
            subject: s.subject,
            body_template: s.body_template,
          })),
        },
        contacts: selectedContacts,
      };

      const res = await fetch(ENROLL_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setEnrollStatus("success");
        setCheckedIds([]);
        fetchContacts();
      } else {
        setEnrollStatus("error");
      }
    } catch (err) {
      console.error(err);
      setEnrollStatus("error");
    }
    setEnrolling(false);
  };

  return (
    <div className="relative">
      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-500">
          {checkedIds.length > 0 ? `${checkedIds.length} selected` : ""}
        </span>
        <div className="flex items-center gap-3">
          {enrollStatus === "success" && (
            <span className="text-sm text-green-400">
              Enrolled successfully!
            </span>
          )}
          {enrollStatus === "error" && (
            <span className="text-sm text-red-400">Enrollment failed</span>
          )}
          <button
            onClick={handleEnroll}
            disabled={checkedIds.length === 0 || enrolling}
            className="flex items-center gap-2 border border-white/20 px-4 py-2 text-sm rounded hover:bg-white/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send size={14} />
            {enrolling ? "Enrolling…" : "Enroll"}
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-[#111] border border-white/10 rounded overflow-hidden">
        {loading ? (
          <div className="p-6 text-gray-500 text-sm">Loading…</div>
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
              </tr>
            </thead>
            <tbody>
              {contacts.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="p-6 text-center text-gray-600 text-sm italic"
                  >
                    No unenrolled contacts found
                  </td>
                </tr>
              ) : (
                contacts.map((item) => (
                  <tr
                    key={item.contactId}
                    onClick={() => toggleCheck(item.contactId)}
                    className={`border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors
                      ${checkedIds.includes(item.contactId) ? "bg-white/[0.03]" : ""}`}
                  >
                    <td className="p-3" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => toggleCheck(item.contactId)}
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
    </div>
  );
}
