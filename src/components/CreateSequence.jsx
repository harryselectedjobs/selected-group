import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import {
  ArrowLeft,
  Plus,
  GripVertical,
  Trash2,
  Clock,
} from "lucide-react";

function StepCard({
  step,
  onUpdate,
  onDelete,
}) {
  const mergeTags = [
    "{{firstname}}",
    "{{lastname}}",
    "{{company}}",
    "{{jobtitle}}",
  ];

  return (
    <div className="bg-[#111111] border border-[#222] rounded-2xl p-6 hover:border-purple-500/20 transition">
      <div className="flex items-start gap-4">
        <GripVertical className="w-5 h-5 text-gray-500 mt-1" />

        <div className="flex-1">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-xl font-semibold text-white">
              Step {step.stepNumber}
            </h3>

            <button
              onClick={() => onDelete(step.id)}
              className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-5">
            {/* Delay */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Delay Days
              </label>

              <input
                type="number"
                value={step.delayDays}
                onChange={(e) =>
                  onUpdate(step.id, {
                    delayDays: parseInt(
                      e.target.value
                    ),
                  })
                }
                className="w-32 bg-black border border-[#222] rounded-xl px-4 py-3 text-white outline-none"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Email Subject
              </label>

              <input
                type="text"
                value={step.subject}
                onChange={(e) =>
                  onUpdate(step.id, {
                    subject: e.target.value,
                  })
                }
                placeholder="Enter email subject..."
                className="w-full bg-black border border-[#222] rounded-xl px-4 py-3 text-white outline-none"
              />
            </div>

            {/* Body */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Email Body
              </label>

              <textarea
                rows={6}
                value={step.body}
                onChange={(e) =>
                  onUpdate(step.id, {
                    body: e.target.value,
                  })
                }
                placeholder="Write your email..."
                className="w-full bg-black border border-[#222] rounded-xl px-4 py-3 text-white outline-none resize-none"
              />

              <div className="flex flex-wrap gap-2 mt-3">
                {mergeTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() =>
                      onUpdate(step.id, {
                        body:
                          step.body +
                          " " +
                          tag,
                      })
                    }
                    className="px-3 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Time */}
            <div className="flex gap-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Start Time
                </label>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />

                  <input
                    type="time"
                    value={
                      step.sendWindowStart
                    }
                    onChange={(e) =>
                      onUpdate(step.id, {
                        sendWindowStart:
                          e.target.value,
                      })
                    }
                    className="bg-black border border-[#222] rounded-xl px-4 py-3 text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  End Time
                </label>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />

                  <input
                    type="time"
                    value={
                      step.sendWindowEnd
                    }
                    onChange={(e) =>
                      onUpdate(step.id, {
                        sendWindowEnd:
                          e.target.value,
                      })
                    }
                    className="bg-black border border-[#222] rounded-xl px-4 py-3 text-white outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CreateSequence() {
  const navigate = useNavigate();

  const [sequenceName, setSequenceName] =
    useState("");

  const [goal, setGoal] = useState("");

  const [status, setStatus] =
    useState("Draft");

  const [steps, setSteps] = useState([
    {
      id: "1",
      stepNumber: 1,
      delayDays: 0,
      subject: "",
      body: "",
      sendWindowStart: "09:00",
      sendWindowEnd: "17:00",
    },
  ]);

  const addStep = () => {
    const newStep = {
      id: Date.now().toString(),
      stepNumber: steps.length + 1,
      delayDays: 3,
      subject: "",
      body: "",
      sendWindowStart: "09:00",
      sendWindowEnd: "17:00",
    };

    setSteps([...steps, newStep]);
  };

  const updateStep = (id, updates) => {
    setSteps(
      steps.map((step) =>
        step.id === id
          ? { ...step, ...updates }
          : step
      )
    );
  };

  const deleteStep = (id) => {
    const filtered = steps.filter(
      (step) => step.id !== id
    );

    setSteps(
      filtered.map((step, index) => ({
        ...step,
        stepNumber: index + 1,
      }))
    );
  };

  
  const handleSave = async () => {
  try {
    const response = await api.post(
      "/sequences",
      {
        name: sequenceName,
        goal: goal,
        status: "draft",
      }
    );

    console.log(response.data);

  } catch (error) {
    console.error(error);
  }
};


  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto p-8">
        {/* Header */}
        <div className="mb-10">
          <Link
            to="/sequences"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-5"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Sequences
          </Link>

          <h1 className="text-4xl font-bold mb-2">
            Create New Sequence
          </h1>

          <p className="text-gray-400">
            Build automated email
            workflows
          </p>
        </div>

        {/* Details */}
        <div className="bg-[#111111] border border-[#222] rounded-3xl p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">
            Sequence Details
          </h2>

          <div className="space-y-5">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Sequence Name
              </label>

              <input
                type="text"
                value={sequenceName}
                onChange={(e) =>
                  setSequenceName(
                    e.target.value
                  )
                }
                placeholder="New Lead Outreach"
                className="w-full bg-black border border-[#222] rounded-xl px-4 py-3 text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Goal
              </label>

              <input
                type="text"
                value={goal}
                onChange={(e) =>
                  setGoal(e.target.value)
                }
                placeholder="Book discovery calls..."
                className="w-full bg-black border border-[#222] rounded-xl px-4 py-3 text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Status
              </label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
                className="bg-black border border-[#222] rounded-xl px-4 py-3 text-white outline-none"
              >
                <option>Draft</option>
                <option>Active</option>
              </select>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="bg-[#111111] border border-[#222] rounded-3xl p-8 mb-32">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold">
              Email Steps
            </h2>

            <button
              onClick={addStep}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition"
            >
              <Plus className="w-4 h-4" />
              Add Step
            </button>
          </div>

          <div className="space-y-5">
            {steps.map((step) => (
              <StepCard
                key={step.id}
                step={step}
                onUpdate={updateStep}
                onDelete={deleteStep}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#111111] border-t border-[#222]">
        <div className="max-w-5xl mx-auto px-8 py-4 flex justify-end gap-4">
          <button
            onClick={() =>
              navigate("/sequences")
            }
            className="px-6 py-3 rounded-xl border border-[#222] text-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition"
          >
            Save Sequence
          </button>
        </div>
      </div>
    </div>
  );
}