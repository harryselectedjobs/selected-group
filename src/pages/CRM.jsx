import { useState, useEffect } from "react";
import {
  Search,
  Upload,
  Building2,
  Users,
  Plus,
  X,
} from "lucide-react";

const API_BASE = "http://13.61.16.106:1802";

export default function CRM() {
  const [activeTab, setActiveTab] = useState(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [companies, setCompanies] = useState([]);
  const [contacts, setContacts] = useState([]);

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [form, setForm] = useState({
    name: "",
    domain: "",
    city: "",
    country: "",
  });

  // ✅ Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // ✅ FETCH COMPANIES
  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const searchParam = debouncedSearch ? `&search=${debouncedSearch}` : "";
      const res = await fetch(
        `${API_BASE}/api/companies?page=1&limit=9999${searchParam}`
      );

      if (!res.ok) throw new Error("Fetch failed");

      const data = await res.json();
      console.log(data)
      
      const normalizeCompany = (item) => {
        // Extract company name from domain if name is missing
        const nameFromDomain = (domain) => {
          if (!domain) return "";
          return domain
            .replace(/^https?:\/\//, "")        // Remove protocol
            .replace(/^www\./, "")               // Remove www
            .replace(/\.(com|co|in|org|net|io|dev|com\.br|co\.uk|co\.in|com\.au)$/i, "") // Remove TLDs
            .replace(/[_-]/g, " ")              // Replace _ and - with space
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
        };

        const cleanName = item.name?.trim() || "";
        const cleanDomain = item.domain?.trim() || "";

        return {
          ...item,
          name: cleanName,
          domain: cleanDomain,
          displayName: cleanName.length > 0 ? cleanName : nameFromDomain(cleanDomain),
        };
      };

      const cleaned = (data.data || []).map(normalizeCompany);

const unique = Array.from(
  new Map(cleaned.map(item => [item.id || item.domain, item])).values()
);

setCompanies(unique);



    } catch (err) {
      console.error("Fetch error:", err);
      setCompanies([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (activeTab === "companies") {
      fetchCompanies();
    }
  }, [activeTab, debouncedSearch]);

  // ✅ CSV UPLOAD
  const handleCSVUpload = async (e) => {
    if (!activeTab) {
      alert("Select Companies or Contacts first");
      return;
    }

    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(
        `${API_BASE}/api/upload-csv?type=${activeTab}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.status !== "success") {
        alert(data.message || "Upload failed");
      } else {
        alert("Upload successful ✅");
        fetchCompanies();
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed ❌");
    }

    setUploading(false);
  };

  // ✅ ADD COMPANY
  const handleAdd = async () => {
    if (!form.name) return;

    try {
      const res = await fetch(`${API_BASE}/api/companies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();

      setShowModal(false);
      setForm({ name: "", domain: "", city: "", country: "" });

      fetchCompanies();
    } catch {
      alert("Error adding company");
    }
  };

  const data = activeTab === "companies" ? companies : contacts;

  return (
    <div className="bg-[#0B0B0B] text-white min-h-screen">
      <div className="flex pt-[80px]">

        {/* SIDEBAR */}
        <div className="w-64 fixed top-[80px] bottom-0 bg-[#0F0F0F] border-r border-white/10 p-6">
          <h2 className="text-lg font-semibold mb-6">CRM</h2>

          {/* CSV */}
          <label className="flex items-center justify-center gap-2 bg-white text-black px-3 py-2 text-sm cursor-pointer rounded mb-6">
            <Upload size={14} />
            {uploading ? "Uploading..." : "Import CSV"}
            <input type="file" hidden onChange={handleCSVUpload} />
          </label>

          {/* NAV */}
          <div className="flex flex-col gap-2 text-sm">
            <button
              onClick={() => setActiveTab("companies")}
              className={`px-3 py-2 rounded text-gray-400 hover:bg-white/10 ${
                activeTab === "companies"
                  ? "border-l-2 border-white text-white"
                  : ""
              }`}
            >
              My Companies
            </button>

            <button
              onClick={() => setActiveTab("contacts")}
              className={`px-3 py-2 rounded text-gray-400 hover:bg-white/10 ${
                activeTab === "contacts"
                  ? "border-l-2 border-white text-white"
                  : ""
              }`}
            >
              My Contacts
            </button>
          </div>
        </div>

        {/* MAIN */}
        <div className="ml-64 flex-1 px-8 py-6 relative">

          {/* EMPTY STATE */}
          {!activeTab && (
            <div className="flex items-center justify-center h-[70vh] text-gray-500">
              Select a section to start
            </div>
          )}

          {/* SEARCH + ADD */}
          {activeTab && (
            <div className="flex justify-between mb-6">

              <div className="flex items-center gap-3 bg-[#111] px-4 py-2 border border-white/10 rounded w-[260px]">
                <Search size={14} />
                <input
                  className="bg-transparent outline-none text-sm w-full"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {activeTab === "companies" && (
                <button
                  onClick={() => setShowModal(true)}
                  className="flex items-center gap-2 border border-white/20 px-4 py-2 text-sm rounded hover:bg-white/10"
                >
                  <Plus size={14} />
                  Add Company
                </button>
              )}
            </div>
          )}

          {/* TABLE */}
          {activeTab && (
            <div className="bg-[#111] border border-white/10 rounded overflow-hidden">

              <div className="p-4 border-b border-white/10">
                {activeTab === "companies" ? "Companies" : "Contacts"}
              </div>

              {loading ? (
                <div className="p-4 space-y-3">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-4 bg-white/10 rounded animate-pulse" />
                  ))}
                </div>
              ) : data.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  No data found
                </div>
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
                    {data.map((item, i) => (
                      <tr
                        key={i}
                        onClick={() => setSelectedItem(item)}
                        className="border-b border-white/5 hover:bg-white/5 cursor-pointer"
                      >
                        <td className="p-3 flex items-center gap-2">
                          <Building2 size={14} />
                          {item.displayName || item.name || "-"}

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
          )}

          {/* SLIDE PANEL */}
          {selectedItem && (
            <div className="fixed top-0 right-0 w-[400px] h-full bg-[#111] border-l border-white/10 p-6 shadow-lg">

              <div className="flex justify-between mb-4">
                <h2 className="text-lg font-semibold">
                  {selectedItem.name || selectedItem.firstname}
                </h2>

                <button onClick={() => setSelectedItem(null)}>
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-3 text-sm max-h-[calc(100vh-200px)] overflow-y-auto">
                <p><span className="text-gray-400">Name:</span> {selectedItem.name || "-"}</p>
                <p><span className="text-gray-400">Domain:</span> {selectedItem.domain || "-"}</p>
                <p><span className="text-gray-400">Website:</span> {selectedItem.website ? <a href={selectedItem.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{selectedItem.website}</a> : "-"}</p>
                <p><span className="text-gray-400">Industry:</span> {selectedItem.industry || "-"}</p>
                <p><span className="text-gray-400">Employees:</span> {selectedItem.numberofemployees ? selectedItem.numberofemployees.toLocaleString() : "-"}</p>
                <p><span className="text-gray-400">Annual Revenue:</span> {selectedItem.annualrevenue ? `$${(selectedItem.annualrevenue / 1000000).toFixed(2)}M` : "-"}</p>
                <p><span className="text-gray-400">Address:</span> {selectedItem.address || "-"}</p>
                <p><span className="text-gray-400">City:</span> {selectedItem.city || "-"}</p>
                <p><span className="text-gray-400">State:</span> {selectedItem.state || "-"}</p>
                <p><span className="text-gray-400">Country:</span> {selectedItem.country || "-"}</p>
                <p><span className="text-gray-400">ZIP:</span> {selectedItem.zip || "-"}</p>
                <p><span className="text-gray-400">LinkedIn:</span> {selectedItem.linkedin_company_page ? <a href={selectedItem.linkedin_company_page} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">View Profile</a> : "-"}</p>
                {selectedItem.description && (
                  <div className="border-t border-white/10 pt-3">
                    <p><span className="text-gray-400">Description:</span></p>
                    <p className="text-gray-300 text-xs mt-2">{selectedItem.description}</p>
                  </div>
                )}
              </div>
            </div> 
          )}
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-[#111] p-6 rounded w-[400px]">

            <h3 className="mb-4">Add Company</h3>

            <input
              placeholder="Name"
              className="w-full mb-3 p-2 bg-black border border-white/10"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <button
              onClick={handleAdd}
              className="bg-white text-black px-4 py-2 w-full"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
