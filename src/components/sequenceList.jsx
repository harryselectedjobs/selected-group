import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Search,
  Filter,
  Mail,
  Send,
  TrendingUp,
} from "lucide-react";

import api from "../services/api";

export default function SequenceList() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [mockSequences, setMockSequences] = useState([]);

  useEffect(() => {
    fetchSequences();
  }, []);

  const fetchSequences = async () => {
    try {
      const response = await api.get("/sequences");
      setMockSequences(response.data || []);
    } catch (error) {
      console.error("Error fetching sequences:", error);
    }
  };

  /* ---------------- FILTER LOGIC ---------------- */

const filteredSequences = mockSequences.filter((s) => {
  const status = (s.status || "").toLowerCase();
  const filter = statusFilter.toLowerCase();

  const matchesStatus =
    filter === "all" ? true : status === filter;

  const matchesSearch =
    (s.name || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    (s.goal || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

  return matchesStatus && matchesSearch;
});

  /* ---------------- STATS ---------------- */

  const totalSequences = mockSequences.length;

  const activeSequences = mockSequences.filter(
    (s) => s.status === "Active"
  ).length;

  const totalEmailsSent = mockSequences.reduce(
    (sum, s) => sum + (s.enrolledContacts || 0) * (s.stepCount || 0),
    0
  );

  const avgReplyRate = mockSequences.length
    ? Math.round(
        mockSequences.reduce(
          (sum, s) => sum + (s.replyRate || 0),
          0
        ) / mockSequences.length
      )
    : 0;

  /* ---------------- BADGE ---------------- */

  const getStatusBadge = (status) => {
    const styles = {
      Draft:
        "bg-gray-500/10 text-gray-400 border border-gray-500/20",
      Active:
        "bg-green-500/10 text-green-400 border border-green-500/20",
      Paused:
        "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
    };

    return styles[status] || styles.Draft;
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Email Sequences
          </h1>
          <p className="text-gray-400 mt-2">
            Automate outreach with personalized email sequences
          </p>
        </div>

        <Link
          to="/sequences/create"
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition"
        >
          <Plus className="w-5 h-5" />
          New Sequence
        </Link>
      </div>

      {/* ANALYTICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <Card title="Total Sequences" value={totalSequences} icon={<Mail />} />
        <Card title="Active Sequences" value={activeSequences} icon={<TrendingUp />} />
        <Card title="Emails Sent" value={totalEmailsSent.toLocaleString()} icon={<Send />} />
        <Card title="Avg Reply Rate" value={`${avgReplyRate}%`} icon={<Mail />} />
      </div>

      {/* FILTERS */}
      <div className="bg-[#111111] border border-[#222] rounded-2xl p-4 mb-8">
        <div className="flex flex-col md:flex-row items-center gap-4">
          
          {/* SEARCH */}
          <div className="flex-1 relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />

            <input
              type="text"
              placeholder="Search sequences..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black border border-[#222] rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:border-purple-500"
            />
          </div>

          {/* FILTER */}
          <div className="flex items-center gap-3">
  <Filter className="w-5 h-5 text-gray-400" />

  <div className="relative">
    <select
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
      className="appearance-none bg-[#0a0a0a] border border-[#2a2a2a] text-white px-4 py-2.5 pr-10 rounded-xl outline-none focus:border-purple-500 transition"
    >
      <option value="All">All Status</option>
      <option value="Active">Active</option>
      <option value="Draft">Draft</option>
      <option value="Paused">Paused</option>
    </select>

    {/* custom arrow */}
    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
      ▼
    </div>
  </div>
</div>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-[#111111] border border-[#222] rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#151515] border-b border-[#222]">
              <tr>
                <th className="px-6 py-5 text-left text-gray-400">Sequence Name</th>
                <th className="px-6 py-5 text-left text-gray-400">Goal</th>
                <th className="px-6 py-5 text-left text-gray-400">Status</th>
                <th className="px-6 py-5 text-left text-gray-400">Steps</th>
                <th className="px-6 py-5 text-left text-gray-400">Enrolled</th>
                <th className="px-6 py-5 text-left text-gray-400">Reply Rate</th>
              </tr>
            </thead>

            <tbody>
              {filteredSequences.map((sequence) => (
                <tr
                  key={sequence.sequence_id}
                  className="border-t border-[#1f1f1f] hover:bg-[#181818] cursor-pointer"
                >
                  <td className="px-6 py-5">
                    <Link
                      to={`/sequences/${sequence.sequence_id}`}
                      className="font-medium hover:text-purple-400"
                    >
                      {sequence.name}
                    </Link>
                  </td>

                  <td className="px-6 py-5 text-gray-400 truncate max-w-xs">
                    {sequence.goal}
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getStatusBadge(
                        sequence.status
                      )}`}
                    >
                      {sequence.status}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-gray-300">
                    {sequence.stepCount} steps
                  </td>

                  <td className="px-6 py-5 text-gray-300">
                    {sequence.enrolledContacts} contacts
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2 bg-[#222] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                          style={{ width: `${sequence.replyRate}%` }}
                        />
                      </div>

                      <span className="text-sm text-purple-400">
                        {sequence.replyRate}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ---------------- CARD ---------------- */

function Card({ title, value, icon }) {
  return (
    <div className="bg-[#111111] border border-[#222] rounded-2xl p-6 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-400 mb-2">{title}</p>
        <h2 className="text-3xl font-bold">{value}</h2>
      </div>

      <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
        {icon}
      </div>
    </div>
  );
}