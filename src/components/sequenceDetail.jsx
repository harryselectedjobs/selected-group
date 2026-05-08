import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Play,
  Pause,
  Mail,
  MousePointerClick,
  Reply,
  Users,
  Plus,
  Eye,
} from "lucide-react";
import api from "../services/api";

export default function SequenceDetail() {
  const { id } = useParams();

  const [sequence, setSequence] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  const [showStepModal, setShowStepModal] = useState(false);
  const [editingStepId, setEditingStepId] = useState(null);

  const [subject, setSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [delayDays, setDelayDays] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [enrolledContacts] = useState([]);

  /* ---------------- FETCH ---------------- */

  useEffect(() => {
    fetchSequence();
  }, []);

  const fetchSequence = async () => {
    try {
      const response = await api.get(`/sequences/${id}`);
      setSequence(response.data);
    } catch (error) {
      console.error("Error fetching sequence:", error);
    }
  };

  /* ---------------- SAVE STEP ---------------- */

  const handleSaveStep = async () => {
    try {
      const stepData = {
        step_order: (sequence?.steps?.length || 0) + 1,
        delay_days: delayDays,
        subject,
        body_template: emailBody,
        send_window_start: startTime + ":00",
        send_window_end: endTime + ":00",
      };

      if (editingStepId) {
        await api.patch(
          `/sequences/${id}/steps/${editingStepId}`,
          stepData
        );
      } else {
        await api.post(`/sequences/${id}/steps`, stepData);
      }

      fetchSequence();
      setShowStepModal(false);
      setEditingStepId(null);
    } catch (error) {
      console.error(error);
    }
  };

  /* ---------------- DELETE STEP ---------------- */

  const handleDeleteStep = async (stepId) => {
    try {
      await api.delete(`/sequences/${id}/steps/${stepId}`);
      fetchSequence();
    } catch (error) {
      console.error(error);
    }
  };

  /* ---------------- EDIT STEP ---------------- */

  const handleEditStep = (step) => {
    setEditingStepId(step.step_id);
    setSubject(step.subject);
    setEmailBody(step.body_template);
    setDelayDays(step.delay_days);

    setStartTime(String(step.send_window_start).slice(0, 5));
    setEndTime(String(step.send_window_end).slice(0, 5));

    setShowStepModal(true);
  };

  /* ---------------- STATUS BADGE ---------------- */

  const getStatusBadge = (status) => {
    const styles = {
      draft:
        "bg-gray-500/10 text-gray-400 border border-gray-500/20",
      active:
        "bg-green-500/10 text-green-400 border border-green-500/20",
      paused:
        "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
    };

    return styles[status?.toLowerCase()] || styles.draft;
  };

  /* ---------------- LOADING ---------------- */

  if (!sequence) {
    return (
      <div className="min-h-screen bg-black text-white pt-20 p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20 relative z-0">

      {/* HEADER */}
      <div className="mb-10">
        <Link
          to="/sequences"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-5 transition relative z-50"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Sequences
        </Link>

        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-4xl font-bold">
                {sequence.name}
              </h1>

              <span
                className={`px-3 py-1 rounded-full text-sm ${getStatusBadge(
                  sequence.status
                )}`}
              >
                {sequence.status}
              </span>
            </div>

            <p className="text-gray-400">
              {sequence.goal}
            </p>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="border-b border-[#222] mb-8">
        <div className="flex gap-8">
          {["overview", "steps", "contacts"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 capitalize border-b-2 transition ${
                activeTab === tab
                  ? "border-purple-500 text-purple-400"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* OVERVIEW */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <Card title="Open Rate" value={`${sequence.openRate || 0}%`} icon={<Mail />} />
          <Card title="Click Rate" value={`${sequence.clickRate || 0}%`} icon={<MousePointerClick />} />
          <Card title="Reply Rate" value={`${sequence.replyRate || 0}%`} icon={<Reply />} />
          <Card title="Enrolled" value={sequence.enrolledContacts || 0} icon={<Users />} />
        </div>
      )}

      {/* STEPS */}
      {activeTab === "steps" && (
        <div className="max-w-4xl">
          <div className="flex justify-end mb-8">
            <button
              onClick={() => setShowStepModal(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600"
            >
              <Plus className="w-4 h-4" />
              Add Step
            </button>
          </div>

          <div className="relative">
            <div className="absolute left-7 top-0 bottom-0 w-[2px] bg-[#222]" />

            <div className="space-y-8">
              {(sequence.steps || []).map((step) => (
                <div
                  key={step.step_id}
                  className="relative pl-24"
                >
                  {/* STEP NUMBER */}
                  <div className="absolute left-0 w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                    {step.step_order}
                  </div>

                  {/* CARD */}
                  <div className="bg-[#111111] border border-[#222] rounded-2xl p-6">
                    <div className="flex justify-between mb-4">
                      <h3 className="text-xl font-semibold">
                        {step.subject}
                      </h3>

                      <div className="flex gap-2">
                        <button onClick={() => handleEditStep(step)}>
                          <Edit className="w-4 h-4 text-gray-400" />
                        </button>

                        <button onClick={() => handleDeleteStep(step.step_id)}>
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </div>

                    <p className="text-gray-400 whitespace-pre-wrap">
                      {step.body_template}
                    </p>

                    <p className="text-sm text-gray-500 mt-3">
                      Send window: {step.send_window_start} - {step.send_window_end}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CONTACTS */}
      {activeTab === "contacts" && (
        <div className="text-gray-400">
          Contacts section coming soon...
        </div>
      )}

      {/* MODAL */}
      {showStepModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111111] border border-[#222] rounded-3xl p-8 w-full max-w-2xl">

            <h2 className="text-2xl mb-6">
              {editingStepId ? "Edit Step" : "Add Step"}
            </h2>

            <input
              className="w-full mb-4 p-3 bg-black border border-[#222] rounded-xl"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
            />

            <textarea
              className="w-full mb-4 p-3 bg-black border border-[#222] rounded-xl"
              rows={6}
              value={emailBody}
              onChange={(e) => setEmailBody(e.target.value)}
              placeholder="Email body"
            />

            <div className="flex gap-4 mb-6">
              <input
                type="number"
                value={delayDays}
                onChange={(e) => setDelayDays(e.target.value)}
                className="w-full p-3 bg-black border border-[#222] rounded-xl"
                placeholder="Delay"
              />

              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full p-3 bg-black border border-[#222] rounded-xl"
              />

              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full p-3 bg-black border border-[#222] rounded-xl"
              />
            </div>

            <div className="flex justify-end gap-4">
              <button onClick={() => setShowStepModal(false)}>
                Cancel
              </button>

              <button
                onClick={handleSaveStep}
                className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- CARD ---------------- */

function Card({ title, value, icon }) {
  return (
    <div className="bg-[#111111] border border-[#222] rounded-2xl p-6 flex justify-between">
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <h2 className="text-3xl font-bold">{value}</h2>
      </div>
      <div className="text-purple-400">{icon}</div>
    </div>
  );
}