import { useState, useEffect } from "react";
import {
  Users, X, Plus, Pencil, Trash2, Save, XCircle, CheckSquare, Square,
} from "lucide-react";

const API_BASE = "http://13.61.16.106:1802";

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

const Field = ({ label, name, value, editing, onChange, type = "text" }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[10px] uppercase tracking-widest text-gray-500">{label}</label>
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

export default function ContactsTable({ search }) {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  // Multi-select
  const [checkedIds, setCheckedIds] = useState([]);

  // Add modal
  const [showModal, setShowModal] = useState(false);
  const [addForm, setAddForm] = useState(EMPTY_FORM);

  console.log("PAYLOAD:", JSON.stringify({...addForm}, null, 2));

  // ─── FETCH ──────────────────────────────────────────────────────────────────
  const fetchContacts = async () => {
    setLoading(true);
    try {
      const searchParam = search ? `&search=${encodeURIComponent(search)}` : "";
      const res = await fetch(
        `${API_BASE}/api/contacts?page=${page}&limit=${limit}${searchParam}`
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

  useEffect(() => { setPage(1); setCheckedIds([]); }, [search]);
  useEffect(() => { fetchContacts(); }, [page, search]);

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
  firstname: addForm.firstname || "",
  lastname: addForm.lastname || "",
  jobtitle: addForm.jobtitle || "",
  job_function: addForm.job_function || "",
  seniority: addForm.seniority || "",
  email: addForm.email || "",
  mobilephone: addForm.mobilephone || "",
  phone: addForm.phone || "",
  hs_linkedin_url: addForm.hs_linkedin_url || "",
  followercount: Number(addForm.followercount || 0),
  linkedinconnections: Number(addForm.linkedinconnections || 0),
  country: addForm.country || "",
  city: addForm.city || "",
  state: addForm.state || "",
  start_date: addForm.start_date || "",
  company: addForm.company || "",
  industry: addForm.industry || "",
  company_size: addForm.company_size || "",
  lifecycle_stage: addForm.lifecycle_stage || "NEW",
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
        followercount: editForm.followercount ? Number(editForm.followercount) : 0,
        linkedinconnections: editForm.linkedinconnections ? Number(editForm.linkedinconnections) : 0,
      };
      const res = await fetch(`${API_BASE}/api/contacts/${selectedItem.contactId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      setIsEditing(false);
      setSelectedItem({
        ...selectedItem,
        ...payload,
        fullName: `${payload.firstname || ""} ${payload.lastname || ""}`.trim() || payload.email || "Unknown",
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
      const res = await fetch(`${API_BASE}/api/contacts/${item.contactId}`, { method: "DELETE" });
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
    if (!window.confirm(`Delete ${checkedIds.length} selected contacts?`)) return;
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
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const allChecked =
    contacts.length > 0 && contacts.every((c) => checkedIds.includes(c.contactId));
  const toggleAll = () => {
    if (allChecked) {
      setCheckedIds((prev) => prev.filter((id) => !contacts.find((c) => c.contactId === id)));
    } else {
      const newIds = contacts.map((c) => c.contactId).filter((id) => !checkedIds.includes(id));
      setCheckedIds((prev) => [...prev, ...newIds]);
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
            <Trash2 size={14} />
            Delete {checkedIds.length} selected
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
                  <button onClick={toggleAll} className="text-gray-400 hover:text-white transition-colors">
                    {allChecked ? <CheckSquare size={15} /> : <Square size={15} />}
                  </button>
                </th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Company</th>
                <th className="p-3 text-left">Job Title</th>
                <th className="p-3 w-20 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-gray-600 text-sm italic">
                    No contacts found
                  </td>
                </tr>
              ) : contacts.map((item) => (
                <tr
                  key={item.contactId}
                  onClick={() => { setSelectedItem(item); setEditForm(item); setIsEditing(false); }}
                  className={`border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors ${
                    selectedItem?.contactId === item.contactId ? "bg-white/5" : ""
                  } ${checkedIds.includes(item.contactId) ? "bg-white/[0.03]" : ""}`}
                >
                  <td className="p-3" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={(e) => toggleCheck(item.contactId, e)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {checkedIds.includes(item.contactId)
                        ? <CheckSquare size={15} className="text-white" />
                        : <Square size={15} />}
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
                  <td className="p-3 text-gray-400">{item.jobtitle || "—"}</td>
                  <td className="p-3" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-center gap-2">
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
                        onClick={(e) => { e.stopPropagation(); handleDeleteSingle(item); }}
                        className="text-gray-400 hover:text-red-400 transition-colors p-1 rounded hover:bg-red-500/10"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* PAGINATION (unchanged logic) */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
        <span>Page {page} of {totalPages}</span>
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
                  ? `${editForm.firstname || ""} ${editForm.lastname || ""}`.trim() || "Edit Contact"
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
                    onClick={() => { setIsEditing(false); setEditForm(selectedItem); }}
                    className="p-2 rounded text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10 transition-colors"
                  >
                    <XCircle size={14} />
                  </button>
                </>
              )}
              <button
                onClick={() => { setSelectedItem(null); setIsEditing(false); }}
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
              <Field label="First Name" name="firstname" value={editForm.firstname} editing={isEditing} onChange={handleEditFormChange} />
              <Field label="Last Name" name="lastname" value={editForm.lastname} editing={isEditing} onChange={handleEditFormChange} />
            </div>
            <Field label="Job Title" name="jobtitle" value={editForm.jobtitle} editing={isEditing} onChange={handleEditFormChange} />
            <Field label="Job Function" name="job_function" value={editForm.job_function} editing={isEditing} onChange={handleEditFormChange} />
            <Field label="Seniority" name="seniority" value={editForm.seniority} editing={isEditing} onChange={handleEditFormChange} />
            <Field label="Lifecycle Stage" name="lifecycle_stage" value={editForm.lifecycle_stage} editing={isEditing} onChange={handleEditFormChange} />

            <div className="text-[10px] uppercase tracking-widest text-gray-600 font-semibold pt-2 pb-1 border-b border-white/5">
              Contact
            </div>
            <Field label="Email" name="email" value={editForm.email} editing={isEditing} onChange={handleEditFormChange} />
            <Field label="Phone" name="phone" value={editForm.phone} editing={isEditing} onChange={handleEditFormChange} />
            <Field label="Mobile Phone" name="mobilephone" value={editForm.mobilephone} editing={isEditing} onChange={handleEditFormChange} />
            <Field label="LinkedIn URL" name="hs_linkedin_url" value={editForm.hs_linkedin_url} editing={isEditing} onChange={handleEditFormChange} />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Followers" name="followercount" value={editForm.followercount} type="number" editing={isEditing} onChange={handleEditFormChange} />
              <Field label="LinkedIn Connections" name="linkedinconnections" value={editForm.linkedinconnections} type="number" editing={isEditing} onChange={handleEditFormChange} />
            </div>

            <div className="text-[10px] uppercase tracking-widest text-gray-600 font-semibold pt-2 pb-1 border-b border-white/5">
              Company
            </div>
            <Field label="Company" name="company" value={editForm.company} editing={isEditing} onChange={handleEditFormChange} />
            <Field label="Industry" name="industry" value={editForm.industry} editing={isEditing} onChange={handleEditFormChange} />
            <Field label="Company Size" name="company_size" value={editForm.company_size} editing={isEditing} onChange={handleEditFormChange} />
            <Field label="Start Date" name="start_date" value={editForm.start_date} editing={isEditing} onChange={handleEditFormChange} />

            <div className="text-[10px] uppercase tracking-widest text-gray-600 font-semibold pt-2 pb-1 border-b border-white/5">
              Location
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="City" name="city" value={editForm.city} editing={isEditing} onChange={handleEditFormChange} />
              <Field label="State" name="state" value={editForm.state} editing={isEditing} onChange={handleEditFormChange} />
            </div>
            <Field label="Country" name="country" value={editForm.country} editing={isEditing} onChange={handleEditFormChange} />
          </div>

          {/* Save bar when editing */}
          {isEditing && (
            <div className="shrink-0 px-5 py-3 border-t border-white/10 flex gap-2">
              <button
                onClick={handleUpdate}
                className="flex-1 flex items-center justify-center gap-2 bg-white text-black text-sm font-medium py-2 rounded hover:bg-gray-200 transition-colors"
              >
                <Save size={13} /> Save Changes
              </button>
              <button
                onClick={() => { setIsEditing(false); setEditForm(selectedItem); }}
                className="flex items-center justify-center gap-2 border border-white/20 text-gray-300 text-sm py-2 px-4 rounded hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── ADD MODAL ──────────────────────────────────────────────────────────── */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#111] border border-white/10 rounded-lg w-[420px] max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center px-5 py-4 border-b border-white/10">
              <h2 className="text-sm font-semibold">Add Contact</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">

              {/* Basic Info */}
              <div>
                <div className="text-[10px] uppercase tracking-widest text-gray-600 font-semibold mb-3">Basic Info</div>
                {[["First Name *", "firstname"], ["Last Name", "lastname"], ["Job Title", "jobtitle"],
                  ["Job Function", "job_function"], ["Seniority", "seniority"]].map(([label, name]) => (
                  <div key={name} className="flex flex-col gap-1 mb-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500">{label}</label>
                    <input name={name} value={addForm[name]} onChange={handleAddFormChange}
                      className="bg-[#1a1a1a] border border-white/10 rounded px-2 py-1.5 text-sm text-white focus:outline-none focus:border-white/30" />
                  </div>
                ))}
              </div>

              {/* Contact */}
              <div>
                <div className="text-[10px] uppercase tracking-widest text-gray-600 font-semibold mb-3">Contact</div>
                {[["Email *", "email"], ["Phone", "phone"], ["Mobile Phone", "mobilephone"],
                  ["LinkedIn URL", "hs_linkedin_url"]].map(([label, name]) => (
                  <div key={name} className="flex flex-col gap-1 mb-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500">{label}</label>
                    <input name={name} value={addForm[name]} onChange={handleAddFormChange}
                      className="bg-[#1a1a1a] border border-white/10 rounded px-2 py-1.5 text-sm text-white focus:outline-none focus:border-white/30" />
                  </div>
                ))}
              </div>

              {/* Company */}
              <div>
                <div className="text-[10px] uppercase tracking-widest text-gray-600 font-semibold mb-3">Company</div>
                {[["Company", "company"], ["Industry", "industry"], ["Company Size", "company_size"],
                  ["Start Date", "start_date"]].map(([label, name]) => (
                  <div key={name} className="flex flex-col gap-1 mb-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500">{label}</label>
                    <input name={name} value={addForm[name]} onChange={handleAddFormChange}
                      className="bg-[#1a1a1a] border border-white/10 rounded px-2 py-1.5 text-sm text-white focus:outline-none focus:border-white/30" />
                  </div>
                ))}
              </div>

              {/* Location */}
              <div>
                <div className="text-[10px] uppercase tracking-widest text-gray-600 font-semibold mb-3">Location</div>
                {[["City", "city"], ["State", "state"], ["Country", "country"]].map(([label, name]) => (
                  <div key={name} className="flex flex-col gap-1 mb-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500">{label}</label>
                    <input name={name} value={addForm[name]} onChange={handleAddFormChange}
                      className="bg-[#1a1a1a] border border-white/10 rounded px-2 py-1.5 text-sm text-white focus:outline-none focus:border-white/30" />
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