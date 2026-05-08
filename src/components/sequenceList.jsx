import React, {
  useState,
  useEffect,
} from "react";
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
  const [mockSequences, setMockSequences] = useState([]);

  const filteredSequences =
    statusFilter === "All"
      ? mockSequences
      : mockSequences.filter(
          (s) => s.status === statusFilter
        );

  const totalSequences = mockSequences.length;

  const activeSequences = mockSequences.filter(
    (s) => s.status === "Active"
  ).length;

  const totalEmailsSent = mockSequences.reduce(
    (sum, s) => sum + s.enrolledContacts * s.stepCount,
    0
  );

  const avgReplyRate = Math.round(
    mockSequences.reduce(
      (sum, s) => sum + s.replyRate,
      0
    ) / mockSequences.length
  );

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
  useEffect(() => {
  fetchSequences();
}, []);

const fetchSequences = async () => {
  try {
    const response = await api.get("/sequences");

    setMockSequences(response.data);
  } catch (error) {
    console.error(
      "Error fetching sequences:",
      error
    );
  }
};

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Email Sequences
          </h1>

          <p className="text-gray-400 mt-2">
            Automate outreach with personalized email
            sequences
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

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <Card
          title="Total Sequences"
          value={totalSequences}
          icon={<Mail className="w-5 h-5" />}
        />

        <Card
          title="Active Sequences"
          value={activeSequences}
          icon={<TrendingUp className="w-5 h-5" />}
        />

        <Card
          title="Emails Sent"
          value={totalEmailsSent.toLocaleString()}
          icon={<Send className="w-5 h-5" />}
        />

        <Card
          title="Avg Reply Rate"
          value={`${avgReplyRate}%`}
          icon={<Mail className="w-5 h-5" />}
        />
      </div>

      {/* Filters */}
      <div className="bg-[#111111] border border-[#222] rounded-2xl p-4 mb-8">
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Search */}
          <div className="flex-1 relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />

            <input
              type="text"
              placeholder="Search sequences..."
              className="w-full bg-black border border-[#222] rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:border-purple-500"
            />
          </div>

          {/* Filter */}
          <div className="flex items-center gap-3 bg-black border border-[#222] px-4 py-3 rounded-xl">
            <Filter className="w-5 h-5 text-gray-400" />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="bg-transparent text-white outline-none"
            >
              <option className="bg-black">All</option>

              <option className="bg-black">
                Active
              </option>

              <option className="bg-black">
                Draft
              </option>

              <option className="bg-black">
                Paused
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#111111] border border-[#222] rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#151515] border-b border-[#222]">
              <tr>
                <th className="text-left px-6 py-5 text-sm font-medium text-gray-400">
                  Sequence Name
                </th>

                <th className="text-left px-6 py-5 text-sm font-medium text-gray-400">
                  Goal
                </th>

                <th className="text-left px-6 py-5 text-sm font-medium text-gray-400">
                  Status
                </th>

                <th className="text-left px-6 py-5 text-sm font-medium text-gray-400">
                  Steps
                </th>

                <th className="text-left px-6 py-5 text-sm font-medium text-gray-400">
                  Enrolled
                </th>

                <th className="text-left px-6 py-5 text-sm font-medium text-gray-400">
                  Reply Rate
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredSequences.map((sequence) => (
                <tr
                  key={sequence.sequence_id}
                  className="border-t border-[#1f1f1f] hover:bg-[#181818] transition cursor-pointer"
                >
                  <td className="px-6 py-5">
                    <Link
                      to={`/sequences/${sequence.sequence_id}`}
                      className="font-medium hover:text-purple-400 transition"
                    >
                      {sequence.name}
                    </Link>
                  </td>

                  <td className="px-6 py-5 text-gray-400 max-w-sm truncate">
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
                          style={{
                            width: `${sequence.replyRate}%`,
                          }}
                        />
                      </div>

                      <span className="text-sm font-medium text-purple-400">
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

function Card({ title, value, icon }) {
  return (
    <div className="bg-[#111111] border border-[#222] rounded-2xl p-6 flex items-center justify-between hover:border-purple-500/20 transition">
      <div>
        <p className="text-sm text-gray-400 mb-2">
          {title}
        </p>

        <h2 className="text-3xl font-bold">
          {value}
        </h2>
      </div>

      <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
        {icon}
      </div>
    </div>
  );
}