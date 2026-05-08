import React from "react";

export default function EnrollContactsModal({
  sequenceName,
  onClose,
}) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#111111] border border-[#222] rounded-2xl p-8 w-[500px]">
        <h2 className="text-2xl font-bold text-white mb-3">
          Enroll Contacts
        </h2>

        <p className="text-gray-400 mb-6">
          Add contacts to {sequenceName}
        </p>

        <input
          type="text"
          placeholder="Search contacts..."
          className="w-full bg-black border border-[#222] rounded-xl px-4 py-3 text-white outline-none mb-6"
        />

        <div className="space-y-3 mb-6">
          <div className="bg-black border border-[#222] rounded-xl p-4 text-white">
            Dipti Bhowmik
          </div>

          <div className="bg-black border border-[#222] rounded-xl p-4 text-white">
            Rahul Sharma
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl border border-[#222] text-gray-300"
          >
            Cancel
          </button>

          <button className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            Enroll
          </button>
        </div>
      </div>
    </div>
  );
}