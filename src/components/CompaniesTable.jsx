import { useState, useEffect } from "react";
import {
  Building2,
  X,
  Plus,
  Pencil,
  Trash2,
  Save,
  XCircle,
  CheckSquare,
  Square,
} from "lucide-react";

const API_BASE = "http://3.109.182.15:1802";

const EMPTY_FORM = {
  name: "",
  domain: "",
  website: "",
  description: "",
  linkedin_company_page: "",

  city: "",
  state: "",
  country: "",
  address: "",
  zip: "",

  industry: "",
  area_of_work: "",
  technology_category: "",
  software_category: "",

  numberofemployees: "",
  annualrevenue: "",
};

const cleanUrl = (url) => {
  if (!url) return "";
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
};

const Field = ({ label, value, name, editing, onChange, type = "text" }) => {
  const isLongText = name === "description";

  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] uppercase tracking-widest text-gray-500">
        {label}
      </label>

      {editing ? (
        isLongText ? (
          <textarea
            name={name}
            value={value ?? ""}
            onChange={onChange}
            rows={4}
            className="bg-[#1a1a1a] border border-white/10 rounded px-2 py-1.5 text-sm text-white focus:outline-none focus:border-white/30 transition-colors resize-y"
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value ?? ""}
            onChange={onChange}
            className="bg-[#1a1a1a] border border-white/10 rounded px-2 py-1.5 text-sm text-white focus:outline-none focus:border-white/30 transition-colors"
          />
        )
      ) : name === "website" || name === "linkedin_company_page" ? (
        <a
          href={value}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-blue-400 hover:underline break-all"
        >
          {cleanUrl(value)}
        </a>
      ) : (
        <p className="text-sm text-gray-200 whitespace-pre-wrap break-words">
          {value || <span className="text-gray-600 italic">—</span>}
        </p>
      )}
    </div>
  );
};

export default function CompaniesTable({ search }) {
  const [companies, setCompanies] = useState([]);
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

  // ─── FETCH ──────────────────────────────────────────────────────────────────
  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const searchParam = search ? `&search=${encodeURIComponent(search)}` : "";
      let backendPage = page;

      if (totalPages === 1) {
        const firstRes = await fetch(
          `${API_BASE}/api/companies?page=1&limit=${limit}${searchParam}`,
        );
        const firstData = await firstRes.json();
        const total = firstData.total_pages || 1;
        setTotalPages(total);
        backendPage = total;
      } else {
        backendPage = totalPages - page + 1;
      }

      const res = await fetch(
        `${API_BASE}/api/companies?page=${backendPage}&limit=${limit}${searchParam}`,
      );
      const data = await res.json();
      const cleaned = (data.data || []).map((item) => ({
        ...item,
        id: item.companyId, // ✅ FIX HERE
        displayName: item.name || item.domain,
      }));
      setCompanies(cleaned);
    } catch (err) {
      console.error(err);
      setCompanies([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    setPage(1);
    setTotalPages(1);
    setCheckedIds([]);
  }, [search]);
  useEffect(() => {
    fetchCompanies();
  }, [page, search]);

  // ─── ADD ────────────────────────────────────────────────────────────────────
  const handleAdd = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/companies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addForm),
      });
      if (!res.ok) throw new Error();
      setShowModal(false);
      setAddForm(EMPTY_FORM);
      fetchCompanies();
    } catch {
      alert("Add failed ❌");
    }
  };

  // ─── UPDATE ─────────────────────────────────────────────────────────────────
  const handleUpdate = async () => {
    try {
      const payload = {
        ...editForm,
        numberofemployees: editForm.numberofemployees
          ? Number(editForm.numberofemployees)
          : 0,
        annualrevenue: editForm.annualrevenue
          ? Number(editForm.annualrevenue)
          : 0,
      };

      const res = await fetch(
        `${API_BASE}/api/companies/${selectedItem.companyId}`,
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
        displayName: payload.name || payload.domain,
      });

      fetchCompanies();
    } catch {
      alert("Update failed ❌");
    }
  };
  // ─── DELETE SINGLE ───────────────────────────────────────────────────────────
  const handleDeleteSingle = async (item) => {
    if (!item?.id) {
      alert("Invalid company ID ❌");
      return;
    }

    if (!window.confirm(`Delete "${item.displayName}"?`)) return;

    try {
      const res = await fetch(`${API_BASE}/api/companies/${item.companyId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText);
      }

      setSelectedItem(null);
      setCheckedIds((prev) => prev.filter((id) => id !== item.id));

      fetchCompanies();
    } catch (err) {
      console.error(err);
      alert("Delete failed ❌");
    }
  };

  // ─── DELETE MULTIPLE ─────────────────────────────────────────────────────────
  const handleDeleteMultiple = async () => {
    if (checkedIds.length === 0) return;

    if (!window.confirm(`Delete ${checkedIds.length} companies?`)) return;

    try {
      const res = await fetch(`${API_BASE}/api/companies/delete-multiple`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: checkedIds }),
      });

      if (!res.ok) throw new Error();

      setCheckedIds([]);
      setSelectedItem(null);

      fetchCompanies();
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
    companies.length > 0 && companies.every((c) => checkedIds.includes(c.id));
  const toggleAll = () => {
    if (allChecked) {
      setCheckedIds((prev) =>
        prev.filter((id) => !companies.find((c) => c.id === id)),
      );
    } else {
      const newIds = companies
        .map((c) => c.companyId)
        .filter((id) => !checkedIds.includes(id));
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
          <Plus size={14} /> Add Company
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
                <th className="p-3 text-left">Domain</th>
                <th className="p-3 text-left">Location</th>
                <th className="p-3 text-left">Industry</th>
                <th className="p-3 w-20 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="p-6 text-center text-gray-600 text-sm italic"
                  >
                    No companies found
                  </td>
                </tr>
              ) : (
                companies.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => {
                      setSelectedItem(item);
                      setEditForm(item);
                      setIsEditing(false);
                    }}
                    className={`border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors ${
                      selectedItem?.id === item.id ? "bg-white/5" : ""
                    } ${checkedIds.includes(item.id) ? "bg-white/[0.03]" : ""}`}
                  >
                    <td className="p-3" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={(e) => toggleCheck(item.companyId, e)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {checkedIds.includes(item.companyId) ? (
                          <CheckSquare size={15} className="text-white" />
                        ) : (
                          <Square size={15} />
                        )}
                      </button>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Building2
                          size={13}
                          className="text-gray-500 shrink-0"
                        />
                        <span className="font-medium">{item.displayName}</span>
                      </div>
                    </td>
                    <td className="p-3 text-gray-400">{item.domain || "—"}</td>
                    <td className="p-3 text-gray-400">
                      {[item.city, item.country].filter(Boolean).join(", ") ||
                        "—"}
                    </td>
                    <td className="p-3 text-gray-400">
                      {item.industry || "—"}
                    </td>
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
      {totalPages > 1 && (
        <div className="flex justify-end items-center gap-3 mt-4 text-sm text-gray-400">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 border border-white/10 rounded hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border border-white/10 rounded hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}

      {/* ── SIDE PANEL ─────────────────────────────────────────────────────────── */}
      {selectedItem && (
        <div className="fixed top-[60px] right-0 w-[400px] h-[calc(100vh-60px)] bg-[#0f0f0f] border-l border-white/10 flex flex-col z-50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2">
              <Building2 size={15} className="text-gray-400" />
              <h2 className="text-sm font-semibold truncate max-w-[220px]">
                {isEditing
                  ? editForm.name || editForm.domain || "Edit Company"
                  : selectedItem.displayName}
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
            <Field
              label="Name"
              name="name"
              value={editForm.name}
              editing={isEditing}
              onChange={handleEditFormChange}
            />
            <Field
              label="Domain"
              name="domain"
              value={editForm.domain}
              editing={isEditing}
              onChange={handleEditFormChange}
            />
            <Field
              label="Website"
              name="website"
              value={editForm.website}
              editing={isEditing}
              onChange={handleEditFormChange}
            />
            <Field
              label="Description"
              name="description"
              value={editForm.description}
              editing={isEditing}
              onChange={handleEditFormChange}
            />
            <Field
              label="LinkedIn Page"
              name="linkedin_company_page"
              value={editForm.linkedin_company_page}
              editing={isEditing}
              onChange={handleEditFormChange}
            />

            <div className="text-[10px] uppercase tracking-widest text-gray-600 font-semibold pt-2 pb-1 border-b border-white/5">
              Location
            </div>
            <Field
              label="Address"
              name="address"
              value={editForm.address}
              editing={isEditing}
              onChange={handleEditFormChange}
            />
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
            <div className="grid grid-cols-2 gap-3">
              <Field
                label="Country"
                name="country"
                value={editForm.country}
                editing={isEditing}
                onChange={handleEditFormChange}
              />
              <Field
                label="ZIP"
                name="zip"
                value={editForm.zip}
                editing={isEditing}
                onChange={handleEditFormChange}
              />
            </div>

            <div className="text-[10px] uppercase tracking-widest text-gray-600 font-semibold pt-2 pb-1 border-b border-white/5">
              Industry & Tech
            </div>
            <Field
              label="Industry"
              name="industry"
              value={editForm.industry}
              editing={isEditing}
              onChange={handleEditFormChange}
            />
            <Field
              label="Area of Work"
              name="area_of_work"
              value={editForm.area_of_work}
              editing={isEditing}
              onChange={handleEditFormChange}
            />
            <Field
              label="Technology Category"
              name="technology_category"
              value={editForm.technology_category}
              editing={isEditing}
              onChange={handleEditFormChange}
            />
            <Field
              label="Software Category"
              name="software_category"
              value={editForm.software_category}
              editing={isEditing}
              onChange={handleEditFormChange}
            />

            <div className="text-[10px] uppercase tracking-widest text-gray-600 font-semibold pt-2 pb-1 border-b border-white/5">
              Financials
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field
                label="Employees"
                name="numberofemployees"
                value={editForm.numberofemployees}
                type="number"
                editing={isEditing}
                onChange={handleEditFormChange}
              />
              <Field
                label="Annual Revenue"
                name="annualrevenue"
                value={editForm.annualrevenue}
                type="number"
                editing={isEditing}
                onChange={handleEditFormChange}
              />
            </div>
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

      {/* ── ADD MODAL ──────────────────────────────────────────────────────────── */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#111] border border-white/10 rounded-lg w-[420px] max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center px-5 py-4 border-b border-white/10">
              <h2 className="text-sm font-semibold">Add Company</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
              {/* ─── BASIC INFO ───────────────────────────── */}
              <div>
                <div className="text-[10px] uppercase tracking-widest text-gray-600 font-semibold mb-2">
                  Basic Info
                </div>

                {[
                  ["Name", "name"],
                  ["Domain", "domain"],
                  ["Website", "website"],
                  ["Description", "description"],
                  ["LinkedIn Page", "linkedin_company_page"],
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

              {/* ─── LOCATION ───────────────────────────── */}
              <div>
                <div className="text-[10px] uppercase tracking-widest text-gray-600 font-semibold mb-2">
                  Location
                </div>

                {[
                  ["City", "city"],
                  ["State", "state"],
                  ["Country", "country"],
                  ["Address", "address"],
                  ["ZIP", "zip"],
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

              {/* ─── INDUSTRY & TECH ───────────────────────────── */}
              <div>
                <div className="text-[10px] uppercase tracking-widest text-gray-600 font-semibold mb-2">
                  Industry & Tech
                </div>

                {[
                  ["Industry", "industry"],
                  ["Area of Work", "area_of_work"],
                  ["Technology Category", "technology_category"],
                  ["Software Category", "software_category"],
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

              {/* ─── FINANCIALS ───────────────────────────── */}
              <div>
                <div className="text-[10px] uppercase tracking-widest text-gray-600 font-semibold mb-2">
                  Financials
                </div>

                {[
                  ["Employees", "numberofemployees"],
                  ["Annual Revenue", "annualrevenue"],
                ].map(([label, name]) => (
                  <div key={name} className="flex flex-col gap-1 mb-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500">
                      {label}
                    </label>
                    <input
                      type="number"
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
                Add Company
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
