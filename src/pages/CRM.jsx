import { useState, useEffect } from "react";
import { Search, Upload, Building2, Users, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import CompaniesTable from "../components/CompaniesTable";
import ContactsTable from "../components/ContactsTable";
import { Mail } from "lucide-react";
import SequenceList from "../components/sequenceList";

const API_BASE = "http://13.48.59.189:1802";

export default function CRM() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [uploading, setUploading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("crm_token");
    navigate("/login", { replace: true });
  };

  // debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  // CSV upload
  const handleCSVUpload = async (e) => {
    if (!activeTab) return;

    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${API_BASE}/api/upload-csv?type=${activeTab}`, {
        method: "POST",
        body: formData,
      });

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
    <div className="bg-[#0B0B0B] text-white min-h-screen flex flex-col">
      <div className="flex flex-1 pt-[80px]">
        {/* OVERLAY */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* SIDEBAR */}
        <div
          className={`
            fixed lg:static top-[80px] bottom-0 w-64 bg-[#0F0F0F]
            border-r border-white/10 p-6 z-30
            transform transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0
          `}
        >
          <h2 className="text-lg font-semibold mb-6">CRM</h2>

          {/* CSV Upload */}
          <label
            className={`flex items-center justify-center gap-2 px-3 py-2 text-sm rounded mb-6 transition
  ${
    activeTab !== "companies" && activeTab !== "contacts"
      ? "bg-gray-600 text-gray-400 cursor-not-allowed"
      : "bg-white text-black cursor-pointer hover:bg-gray-200"
  }`}
          >
            <Upload size={14} />

            {uploading ? "Uploading..." : "Import CSV"}

            <input
              type="file"
              hidden
              accept=".csv"
              disabled={activeTab !== "companies" && activeTab !== "contacts"}
              onChange={handleCSVUpload}
            />
          </label>

          {/* NAV */}
          <div className="flex flex-col gap-2 text-sm">
            <button
              onClick={() => {
                setActiveTab("companies");
                setSidebarOpen(false);
              }}
              className={`px-3 py-2 rounded flex items-center gap-2 transition ${
                activeTab === "companies"
                  ? "bg-white text-black"
                  : "text-gray-400 hover:bg-white/10"
              }`}
            >
              <Building2 size={14} />
              Companies
            </button>

            <button
              onClick={() => {
                setActiveTab("contacts");
                setSidebarOpen(false);
              }}
              className={`px-3 py-2 rounded flex items-center gap-2 transition ${
                activeTab === "contacts"
                  ? "bg-white text-black"
                  : "text-gray-400 hover:bg-white/10"
              }`}
            >
              <Users size={14} />
              Contacts
            </button>
            <button
              onClick={() => {
                setActiveTab("sequences");
                setSidebarOpen(false);
              }}
              className={`px-3 py-2 rounded flex items-center gap-2 transition ${
                activeTab === "sequences"
                  ? "bg-white text-black"
                  : "text-gray-400 hover:bg-white/10"
              }`}
            >
              <Mail size={14} />
              Sequences
            </button>
          </div>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="mt-auto pt-4 border-t border-white/10 flex items-center gap-2 text-sm text-gray-500 hover:text-red-400 transition w-full absolute bottom-6 left-0 px-6"
          >
            <LogOut size={14} />
            Sign out
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-6">
          {/* MOBILE MENU */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="px-3 py-2 bg-white text-black rounded text-sm"
            >
              Menu
            </button>
          </div>

          {/* 🟢 CRM LANDING */}
          {!activeTab && (
            <div className="flex flex-col items-center justify-center h-[70vh] text-center">
              <h2 className="text-2xl font-semibold mb-2">CRM Dashboard</h2>

              <p className="text-gray-400 text-sm mb-8 max-w-md leading-relaxed">
                Upload and manage your company and contact data using CSV files.
                Only <span className="text-white font-medium">.csv</span> format
                is supported.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                {/* Upload Companies */}
                <label className="group px-6 py-3 bg-white text-black rounded-lg text-sm font-medium flex items-center gap-2 cursor-pointer hover:bg-gray-200 transition-all shadow-sm">
                  <Building2
                    size={16}
                    className="group-hover:scale-110 transition-transform"
                  />

                  {uploading && activeTab === "companies"
                    ? "Uploading..."
                    : "Upload Companies"}

                  <input
                    type="file"
                    hidden
                    accept=".csv"
                    onChange={(e) => {
                      setActiveTab("companies");

                      setTimeout(() => {
                        handleCSVUpload(e);
                      }, 0);
                    }}
                  />
                </label>

                {/* Upload Contacts */}
                <label className="group px-6 py-3 bg-white text-black rounded-lg text-sm font-medium flex items-center gap-2 cursor-pointer hover:bg-gray-200 transition-all shadow-sm">
                  <Users
                    size={16}
                    className="group-hover:scale-110 transition-transform"
                  />

                  {uploading && activeTab === "contacts"
                    ? "Uploading..."
                    : "Upload Contacts"}

                  <input
                    type="file"
                    hidden
                    accept=".csv"
                    onChange={(e) => {
                      setActiveTab("contacts");

                      setTimeout(() => {
                        handleCSVUpload(e);
                      }, 0);
                    }}
                  />
                </label>
              </div>
            </div>
          )}

          {/* 🟢 SEARCH + TABLES */}
          {activeTab && activeTab !== "sequences" && (
            <>
              {/* SEARCH */}
              <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-6">
                <div className="flex items-center gap-3 bg-[#111] px-4 py-2 border border-white/10 rounded w-full sm:max-w-xs">
                  <Search size={14} />

                  <input
                    className="bg-transparent outline-none text-sm w-full"
                    placeholder={`Search ${activeTab}...`}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              {/* TABLE */}
              <div className="bg-[#0F0F0F] border border-white/10 rounded-lg p-4 overflow-x-auto">
                {activeTab === "companies" && (
                  <CompaniesTable search={debouncedSearch} />
                )}

                {activeTab === "contacts" && (
                  <ContactsTable search={debouncedSearch} />
                )}
              </div>
            </>
          )}

          {/* 🟣 SEQUENCES PAGE */}
          {activeTab === "sequences" && <SequenceList />}
        </div>
      </div>
    </div>
  );
}
