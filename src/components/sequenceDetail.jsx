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

useEffect(() => {
  fetchSequence();
}, []);
const [emailBody, setEmailBody] =
  useState("");

const fetchSequence = async () => {
  try {
    const response = await api.get(
      `/sequences/${id}`
    );

    setSequence(response.data);
  } catch (error) {
    console.error(
      "Error fetching sequence:",
      error
    );
  }
};
  const [activeTab, setActiveTab] = useState("overview");
  const [showEnrollModal, setShowEnrollModal] = useState(false);
const [showStepModal, setShowStepModal] = useState(false);
const [subject, setSubject] =
  useState("");

const [delayDays, setDelayDays] =
  useState(0);

const [startTime, setStartTime] =
  useState("");

const [endTime, setEndTime] =
  useState("");
  const [editingStepId, setEditingStepId] =
  useState(null);
  

  
const enrolledContacts = [];
const handleSaveStep = async () => {
  try {

    const stepData = {
      step_order:
        (sequence.steps?.length || 0) + 1,

      delay_days: delayDays,

      subject: subject,

      body_template: emailBody,

      send_window_start:
        startTime + ":00",

      send_window_end:
        endTime + ":00",
    };

    if (editingStepId) {

      await api.patch(
        `/sequences/${id}/steps/${editingStepId}`,
        stepData
      );

    } else {

      await api.post(
        `/sequences/${id}/steps`,
        stepData
      );
    }

    fetchSequence();

    setShowStepModal(false);

    setEditingStepId(null);

  } catch (error) {
    console.error(error);
  }
};

   
  const getStatusBadge = (status) => {
  const styles = {
    draft:
      "bg-gray-500/10 text-gray-400 border border-gray-500/20",

    active:
      "bg-green-500/10 text-green-400 border border-green-500/20",

    paused:
      "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  };

  return styles[status] || styles.draft;
};
const handleDeleteStep = async (stepId) => {
  try {
   await api.delete(
  `/sequences/${id}/steps/${stepId}`
);

    fetchSequence();

  } catch (error) {
    console.error(error);
  }
};

const handleEditStep = (step) => {

  console.log(step);

  setEditingStepId(step.step_id);

  setSubject(step.subject);

  setEmailBody(step.body_template);

  setDelayDays(step.delay_days);

 setStartTime(
  String(step.send_window_start).slice(0, 5)
);

setEndTime(
  String(step.send_window_end).slice(0, 5)
);
  setShowStepModal(true);
};
if (!sequence) {
  return (
    <div className="text-white p-10">
      Loading...
    </div>
  );
}
  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Header */}
      <div className="mb-10">
        <Link
          to="/sequences"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-5 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Sequences
        </Link>

        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-4xl font-bold">{sequence.name}</h1>

              <span
                className={`px-3 py-1 rounded-full text-sm ${getStatusBadge(
                  sequence.status
                )}`}
              >
                {sequence.status}
              </span>
            </div>

            <p className="text-gray-400">{sequence.goal}</p>
          </div>

          <div className="flex items-center gap-3">
            {sequence.status === "Active" ? (
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-yellow-500/20 text-yellow-400 hover:bg-yellow-500/10 transition">
                <Pause className="w-4 h-4" />
                Pause
              </button>
            ) : (
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-green-500/20 text-green-400 hover:bg-green-500/10 transition">
                <Play className="w-4 h-4" />
                Activate
              </button>
            )}

            <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#222] text-gray-300 hover:bg-[#111] transition">
              <Edit className="w-4 h-4" />
              Edit
            </button>

            <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/10 transition">
  <Trash2 className="w-4 h-4" />
  Delete
</button>
          </div>
        </div>
      </div>

      {/* Tabs */}
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

      {/* Overview */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <Card
            title="Open Rate"
            value={`${sequence.openRate || 0}%`}
            icon={<Mail className="w-5 h-5" />}
          />

          <Card
            title="Click Rate"
            value={`${sequence.clickRate || 0}%`}
            icon={<MousePointerClick className="w-5 h-5" />}
          />

          <Card
            title="Reply Rate"
           value={`${sequence.replyRate || 0}%`}
            icon={<Reply className="w-5 h-5" />}
          />

          <Card
            title="Enrolled"
            value={sequence.enrolledContacts || 0}
            icon={<Users className="w-5 h-5" />}
          />
        </div>
      )}

      {/* Steps */}
      {activeTab === "steps" && (
        <div className="max-w-4xl">
          <div className="flex justify-end mb-8">
            <button
  onClick={() => setShowStepModal(true)}
  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition"
>
              <Plus className="w-4 h-4" />
              Add Step
            </button>
          </div>

         <div className="relative pointer-events-auto">
            <div className="absolute left-7 top-0 bottom-0 w-[2px] bg-[#222] pointer-events-none" />

          <div className="space-y-8">
              {(sequence.steps || []).map((step) => (
               <div
 key={step.step_id}
  className="relative pl-24 z-50"
>
                  {/* Number */}
                  <div className="absolute left-0 w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center font-semibold shadow-lg">
                    {step.step_order}
                  </div>

                  {/* Card */}
                 <div className="relative z-50 bg-[#111111] border border-[#222] rounded-2xl p-6 hover:border-purple-500/30 transition">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          {step.subject}
                        </h3>

                        <p className="text-gray-400 text-sm">
                          {step.delayDays === 0
                            ? "Sent immediately"
                            : `Sent ${step.delay_days} days after previous step`}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <button
  type="button"
  onClick={() =>
    handleEditStep(step)
  }
  className="p-2 rounded-lg hover:bg-[#181818] transition cursor-pointer z-50 relative"
>
                          <Edit className="w-4 h-4 text-gray-400" />
                        </button>

                       <button
  type="button"
  onClick={() =>
    handleDeleteStep(step.step_id)
  }
  className="p-2 rounded-lg hover:bg-red-500/10 transition cursor-pointer z-50 relative"
>
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </div>

                    <div className="bg-black border border-[#222] rounded-xl p-4 mb-4">
                      <p className="text-gray-300 whitespace-pre-wrap">
                        {step.body_template}
                      </p>
                    </div>

                    <p className="text-sm text-gray-500">
                      Send window: {step.send_window_start} -{" "}
                      {step.send_window_end}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Contacts */}
      {activeTab === "contacts" && (
        <div>
          <div className="flex justify-end mb-6">
            <button
             onClick={() => alert("Enroll Modal Coming Soon")}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition"
            >
              <Plus className="w-4 h-4" />
              Enroll Contacts
            </button>
          </div>

          <div className="bg-[#111111] border border-[#222] rounded-3xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#151515] border-b border-[#222]">
                <tr>
                  <th className="text-left px-6 py-4 text-sm text-gray-400">
                    Contact
                  </th>

                  <th className="text-left px-6 py-4 text-sm text-gray-400">
                    Current Step
                  </th>

                  <th className="text-left px-6 py-4 text-sm text-gray-400">
                    Next Send
                  </th>

                  <th className="text-left px-6 py-4 text-sm text-gray-400">
                    Status
                  </th>

                  <th className="text-left px-6 py-4 text-sm text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {enrolledContacts.map((contact) => {
                  const enrollment = contact.enrolledSequences.find(
                    (es) => es.sequenceId === sequence.sequence_id
                  );

                  if (!enrollment) return null;
                  

                  return (
                    <tr
                      key={contact.id}
                      className="border-t border-[#1f1f1f] hover:bg-[#181818] transition"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center font-medium">
                            {contact.firstName[0]}
                            {contact.lastName[0]}
                          </div>

                          <div>
                            <p className="font-medium">
                              {contact.firstName} {contact.lastName}
                            </p>

                            <p className="text-sm text-gray-400">
                              {contact.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-300">
                            {enrollment.currentStep} of{" "}
                            {enrollment.totalSteps}
                          </span>

                          <div className="w-28 h-2 bg-[#222] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                              style={{
                                width: `${
                                  (enrollment.currentStep /
                                    enrollment.totalSteps) *
                                  100
                                }%`,
                              }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5 text-gray-300 text-sm">
                        {new Date(
                          enrollment.nextSendDate
                        ).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${getStatusBadge(
                            enrollment.status
                          )}`}
                        >
                          {enrollment.status}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <button className="p-2 rounded-lg hover:bg-[#181818] transition">
                          <Eye className="w-4 h-4 text-gray-400" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
                
                

              </tbody>
            </table>
          </div>
        </div>
      )}

      {showStepModal && (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
    <div className="bg-[#111111] border border-[#222] rounded-3xl p-8 w-full max-w-2xl">

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">
          Add Step
        </h2>

        <button
          onClick={() => setShowStepModal(false)}
          className="text-gray-400 hover:text-white text-2xl"
        >
          ×
        </button>
      </div>

      <div className="space-y-6">

        <div>
          <label className="block text-sm text-gray-400 mb-2">
            Subject
          </label>

          <input
  type="text"
  value={subject}
  onChange={(e) =>
    setSubject(e.target.value)
  }
  placeholder="Welcome Email"
  className="w-full px-5 py-4 rounded-2xl bg-black border border-[#222] focus:border-purple-500 outline-none"
/>
        </div>

        
<div>
  <label className="block text-sm text-gray-400 mb-2">
    Email Body
  </label>

  <textarea
    rows={8}
    value={emailBody}
    onChange={(e) =>
      setEmailBody(e.target.value)
    }
    placeholder="Write your email..."
    className="w-full px-5 py-4 rounded-2xl bg-black border border-[#222] focus:border-purple-500 outline-none"
  />

  <div className="flex flex-wrap gap-2 mt-3">

    {[
      "{{firstname}}",
      "{{lastname}}",
      "{{company}}",
      "{{jobtitle}}",
    ].map((tag) => (
      <button
        key={tag}
        onClick={() =>
          setEmailBody(
            emailBody + " " + tag
          )
        }
        className="px-3 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm hover:bg-purple-500/20 transition"
      >
        {tag}
      </button>
    ))}

  </div>
</div>

<div className="grid grid-cols-3 gap-4">

  <div>
    <label className="block text-sm text-gray-400 mb-2">
      Delay Days
    </label>

    <input
      type="number"
      value={delayDays}
      onChange={(e) =>
        setDelayDays(e.target.value)
      }
      placeholder="0"
      className="w-full px-5 py-4 rounded-2xl bg-black border border-[#222] focus:border-purple-500 outline-none"
    />
  </div>

  <div>
    <label className="block text-sm text-gray-400 mb-2">
      Start Time
    </label>

    <input
      type="time"
      value={startTime}
      onChange={(e) =>
        setStartTime(e.target.value)
      }
      className="w-full px-5 py-4 rounded-2xl bg-black border border-[#222] focus:border-purple-500 outline-none"
    />
  </div>

  <div>
    <label className="block text-sm text-gray-400 mb-2">
      End Time
    </label>

    <input
      type="time"
      value={endTime}
      onChange={(e) =>
        setEndTime(e.target.value)
      }
      className="w-full px-5 py-4 rounded-2xl bg-black border border-[#222] focus:border-purple-500 outline-none"
    />
  </div>

</div>

        <div className="flex justify-end gap-4 pt-4">

          <button
            onClick={() => setShowStepModal(false)}
            className="px-6 py-3 rounded-2xl border border-[#333] hover:bg-[#181818]"
          >
            Cancel
          </button>

          <button
  onClick={handleSaveStep}
  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90"
>
  Save Step
</button>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

function Card({ title, value, icon }) {
  return (
    <div className="bg-[#111111] border border-[#222] rounded-2xl p-6 flex items-center justify-between hover:border-purple-500/20 transition">
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
