import { useState, useEffect } from "react";
import { Users, X, Plus } from "lucide-react";

const API_BASE = "http://13.61.16.106:1802";

export default function ContactsTable({ search }) {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const [showModal, setShowModal] = useState(false);

  // ✅ FORM STATE
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    jobtitle: "",
    email: "",
    phone: "",
    company: "",
    city: "",
    country: "",
  });

  // ✅ FETCH CONTACTS (NORMAL PAGINATION)
  const fetchContacts = async () => {
    setLoading(true);

    try {
      const searchParam = search ? `&search=${search}` : "";

      const res = await fetch(
        `${API_BASE}/api/contacts?page=${page}&limit=${limit}${searchParam}`
      );

      if (!res.ok) throw new Error("Fetch failed");

      const data = await res.json();

      setTotalPages(data.total_pages || 1);

      const normalize = (item) => ({
        ...item,
        displayName:
          `${item.firstname || ""} ${item.lastname || ""}`.trim() || "Unknown",
      });

      setContacts((data.data || []).map(normalize));

    } catch (err) {
      console.error(err);
      setContacts([]);
    }

    setLoading(false);
  };

  // ✅ RESET PAGE ON SEARCH
  useEffect(() => {
    setPage(1);
  }, [search]);

  useEffect(() => {
    fetchContacts();
  }, [page, search]);

  // ✅ ADD CONTACT
  const handleAdd = async () => {
    if (!form.firstname || !form.email) {
      alert("Firstname and Email required");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          lifecycle_stage: "NEW",
        }),
      });

      if (!res.ok) throw new Error();

      alert("Contact added ✅");

      setShowModal(false);
      setForm({
        firstname: "",
        lastname: "",
        jobtitle: "",
        email: "",
        phone: "",
        company: "",
        city: "",
        country: "",
      });

      fetchContacts();

    } catch {
      alert("Failed to add contact ❌");
    }
  };

  return (
    <div className="relative">

      {/* TOP BAR */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 border px-4 py-2 text-sm rounded hover:bg-white/10"
        >
          <Plus size={14} /> Add Contact
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-[#111] border border-white/10 rounded overflow-hidden">
        {loading ? (
          <div className="p-4">Loading...</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="text-gray-400 border-b border-white/10">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Company</th>
              </tr>
            </thead>

            <tbody>
              {contacts.map((item, i) => (
                <tr
                  key={i}
                  onClick={() => setSelectedItem(item)}
                  className="border-b border-white/5 hover:bg-white/5 cursor-pointer"
                >
                  <td className="p-3 flex items-center gap-2">
                    <Users size={14} />
                    {item.displayName}
                  </td>

                  <td className="p-3">{item.email || "-"}</td>
                  <td className="p-3">{item.company || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
        <span>Page {page} of {totalPages}</span>

        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
            className="px-3 py-1 border border-white/20 rounded disabled:opacity-30"
          >
            Prev
          </button>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(p => p + 1)}
            className="px-3 py-1 border border-white/20 rounded disabled:opacity-30"
          >
            Next
          </button>
        </div>
      </div>

      {/* RIGHT PANEL */}
      {selectedItem && (
        <div className="fixed top-[80px] right-0 w-[400px] h-[calc(100vh-80px)] bg-[#111] border-l border-white/10 p-6 z-50 overflow-y-auto">

          <div className="flex justify-between mb-4">
            <h2 className="text-lg font-semibold">
              {selectedItem.displayName}
            </h2>

            <button onClick={() => setSelectedItem(null)}>
              <X size={18} />
            </button>
          </div>

          <div className="space-y-3 text-sm">

            <p><span className="text-gray-400">Email:</span> {selectedItem.email || "-"}</p>
            <p><span className="text-gray-400">Phone:</span> {selectedItem.phone || "-"}</p>
            <p><span className="text-gray-400">Company:</span> {selectedItem.company || "-"}</p>
            <p><span className="text-gray-400">Job Title:</span> {selectedItem.jobtitle || "-"}</p>

            <p><span className="text-gray-400">Location:</span> {selectedItem.city}, {selectedItem.country}</p>

            {selectedItem.hs_linkedin_url && (
              <p>
                <span className="text-gray-400">LinkedIn:</span>{" "}
                <a
                  href={selectedItem.hs_linkedin_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 underline"
                >
                  {selectedItem.hs_linkedin_url}
                </a>
              </p>
            )}
          </div>
        </div>
      )}

      {/* ADD CONTACT MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

          <div className="bg-[#111] p-6 rounded w-[400px] border border-white/10">

            <div className="flex justify-between mb-4">
              <h2 className="text-lg">Add Contact</h2>
              <button onClick={() => setShowModal(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-sm">

              <input
                placeholder="First Name"
                className="w-full p-2 bg-black border border-white/10"
                value={form.firstname}
                onChange={(e) => setForm({ ...form, firstname: e.target.value })}
              />

              <input
                placeholder="Last Name"
                className="w-full p-2 bg-black border border-white/10"
                value={form.lastname}
                onChange={(e) => setForm({ ...form, lastname: e.target.value })}
              />

              <input
                placeholder="Email"
                className="w-full p-2 bg-black border border-white/10"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />

              <input
                placeholder="Job Title"
                className="w-full p-2 bg-black border border-white/10"
                value={form.jobtitle}
                onChange={(e) => setForm({ ...form, jobtitle: e.target.value })}
              />

              <input
                placeholder="Company"
                className="w-full p-2 bg-black border border-white/10"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
              />

              <input
                placeholder="Phone"
                className="w-full p-2 bg-black border border-white/10"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
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
                Save Contact
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
