import { useState, useEffect } from "react";
import { Search, Upload, Building2, Users } from "lucide-react";

import CompaniesTable from "../components/CompaniesTable";
import ContactsTable from "../components/ContactsTable";


const API_BASE = "http://13.61.16.106:1802";

export default function CRM() {
  const [activeTab, setActiveTab] = useState(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [uploading, setUploading] = useState(false);

  // ✅ debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // ✅ REAL CSV Upload
  const handleCSVUpload = async (e) => {
    if (!activeTab) return;

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
        alert(data.message || "Upload failed ❌");
      } else {
        alert("Upload successful ✅");
      }
    } catch (err) {
      console.error(err);
      alert("Upload failed ❌");
    }

    setUploading(false);
  };

  return (
    <div className="bg-[#0B0B0B] text-white min-h-screen">
      <div className="flex pt-[80px]">

        {/* SIDEBAR */}
        <div className="w-64 fixed top-[80px] bottom-0 bg-[#0F0F0F] border-r border-white/10 p-6">
          <h2 className="text-lg font-semibold mb-6">CRM</h2>

          {/* CSV Upload */}
          <label
            className={`flex items-center justify-center gap-2 px-3 py-2 text-sm rounded mb-6
            ${
              !activeTab
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-white text-black cursor-pointer"
            }`}
          >
            <Upload size={14} />
            {uploading ? "Uploading..." : "Import CSV"}

            <input
              type="file"
              hidden
              disabled={!activeTab}
              onChange={handleCSVUpload}
            />
          </label>

          {/* NAV */}
          <div className="flex flex-col gap-2 text-sm">
            <button
              onClick={() => setActiveTab("companies")}
              className={`px-3 py-2 rounded flex items-center gap-2 ${
                activeTab === "companies"
                  ? "bg-white text-black"
                  : "text-gray-400 hover:bg-white/10"
              }`}
            >
              <Building2 size={14} />
              Companies
            </button>

            <button
              onClick={() => setActiveTab("contacts")}
              className={`px-3 py-2 rounded flex items-center gap-2 ${
                activeTab === "contacts"
                  ? "bg-white text-black"
                  : "text-gray-400 hover:bg-white/10"
              }`}
            >
              <Users size={14} />
              Contacts
            </button>
          </div>
        </div>

        {/* MAIN */}
        <div className="ml-64 flex-1 px-8 py-6">

          {/* EMPTY STATE */}
          {!activeTab && (
            <div className="flex items-center justify-center h-[70vh] text-gray-500">
              Select a section to start
            </div>
          )}

          {/* SEARCH */}
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
            </div>
          )}

          {/* DYNAMIC TABLES */}
          {activeTab === "companies" && (
            <CompaniesTable search={debouncedSearch} />
          )}

          {activeTab === "contacts" && (
            <ContactsTable search={debouncedSearch} />
          )}

        </div>
      </div>
    </div>
  );
}
