import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

import {
  ArrowLeft,
  Plus,
  GripVertical,
  Trash2,
  Clock,
  Loader2,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                STEP CARD                                   */
/* -------------------------------------------------------------------------- */

function StepCard({
  step,
  onUpdate,
  onDelete,
  disableDelete,
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
        <GripVertical className="w-5 h-5 text-gray-500 mt-1 shrink-0" />

        <div className="flex-1">
          {/* HEADER */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-xl font-semibold text-white">
                Step {step.stepNumber}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Configure automated email step
              </p>
            </div>

            <button
              disabled={disableDelete}
              onClick={() => onDelete(step.id)}
              className={`p-2 rounded-lg transition ${
                disableDelete
                  ? "opacity-30 cursor-not-allowed"
                  : "text-red-400 hover:bg-red-500/10"
              }`}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* BODY */}
          <div className="space-y-5">
            {/* STATUS */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Step Status
              </label>

              <select
                value={step.status}
                onChange={(e) =>
                  onUpdate(step.id, {
                    status: e.target.value,
                  })
                }
                className="w-full bg-black border border-[#222] rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500"
              >
                <option value="draft">Draft</option>

                <option value="active">
                  Active
                </option>

                <option value="paused">
                  Paused
                </option>
              </select>
            </div>

            {/* DELAY */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Delay Days
              </label>

              <input
                type="number"
                min={0}
                value={step.delayDays}
                onChange={(e) =>
                  onUpdate(step.id, {
                    delayDays:
                      Number(e.target.value) || 0,
                  })
                }
                className="w-40 bg-black border border-[#222] rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500"
              />
            </div>

            {/* SUBJECT */}
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
                placeholder="Write subject..."
                className="w-full bg-black border border-[#222] rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500"
              />
            </div>

            {/* BODY */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Email Body
              </label>

              <textarea
                rows={7}
                value={step.body}
                onChange={(e) =>
                  onUpdate(step.id, {
                    body: e.target.value,
                  })
                }
                placeholder="Write your email..."
                className="w-full bg-black border border-[#222] rounded-xl px-4 py-3 text-white outline-none resize-none focus:border-purple-500"
              />

              {/* MERGE TAGS */}
              <div className="flex flex-wrap gap-2 mt-3">
                {mergeTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() =>
                      onUpdate(step.id, {
                        body:
                          (step.body || "") +
                          " " +
                          tag,
                      })
                    }
                    className="px-3 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs hover:bg-purple-500/20 transition"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* SEND WINDOW */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* START */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Start Time
                </label>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />

                  <input
                    type="time"
                    value={step.sendWindowStart}
                    onChange={(e) =>
                      onUpdate(step.id, {
                        sendWindowStart:
                          e.target.value,
                      })
                    }
                    className="w-full bg-black border border-[#222] rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              {/* END */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  End Time
                </label>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />

                  <input
                    type="time"
                    value={step.sendWindowEnd}
                    onChange={(e) =>
                      onUpdate(step.id, {
                        sendWindowEnd:
                          e.target.value,
                      })
                    }
                    className="w-full bg-black border border-[#222] rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500"
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

/* -------------------------------------------------------------------------- */
/*                            CREATE SEQUENCE PAGE                            */
/* -------------------------------------------------------------------------- */

export default function CreateSequence() {
  const navigate = useNavigate();

  const [sequenceName, setSequenceName] =
    useState("");

  const [goal, setGoal] = useState("");

  const [status, setStatus] =
    useState("draft");

  const [saving, setSaving] =
    useState(false);

  const [error, setError] = useState("");

  /* SEARCH + FILTER */

  const [searchTerm, setSearchTerm] =
    useState("");

  const [filterStatus, setFilterStatus] =
    useState("all");

  /* STEPS */

  const [steps, setSteps] = useState([
    {
      id: crypto.randomUUID(),

      stepNumber: 1,

      delayDays: 0,

      subject: "",

      body: "",

      sendWindowStart: "09:00",

      sendWindowEnd: "17:00",

      status: "draft",
    },
  ]);

  /* -------------------------------------------------------------------------- */
  /*                                  ADD STEP                                  */
  /* -------------------------------------------------------------------------- */

  const addStep = () => {
    const newStep = {
      id: crypto.randomUUID(),

      stepNumber: steps.length + 1,

      delayDays: 0,

      subject: "",

      body: "",

      sendWindowStart: "09:00",

      sendWindowEnd: "17:00",

      status: "draft",
    };

    setSteps((prev) => [...prev, newStep]);
  };

  /* -------------------------------------------------------------------------- */
  /*                                UPDATE STEP                                 */
  /* -------------------------------------------------------------------------- */

  const updateStep = (id, updates) => {
    setSteps((prev) =>
      prev.map((step) =>
        step.id === id
          ? { ...step, ...updates }
          : step
      )
    );
  };

  /* -------------------------------------------------------------------------- */
  /*                                DELETE STEP                                 */
  /* -------------------------------------------------------------------------- */

  const deleteStep = (id) => {
    if (steps.length === 1) {
      alert(
        "Sequence must contain at least 1 step."
      );

      return;
    }

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

  /* -------------------------------------------------------------------------- */
  /*                                FILTER STEPS                                */
  /* -------------------------------------------------------------------------- */

  const filteredSteps = steps.filter((step) => {
    const matchesSearch =
      (step.subject || "")
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        ) ||
      (step.body || "")
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        );

    const matchesStatus =
      filterStatus === "all"
        ? true
        : step.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  /* -------------------------------------------------------------------------- */
  /*                                  VALIDATE                                  */
  /* -------------------------------------------------------------------------- */

  const validateForm = () => {
    if (!sequenceName.trim()) {
      return "Sequence name is required.";
    }

    if (!goal.trim()) {
      return "Goal is required.";
    }

    for (const step of steps) {
      if (!step.subject.trim()) {
        return `Step ${step.stepNumber} subject is required.`;
      }

      if (!step.body.trim()) {
        return `Step ${step.stepNumber} body is required.`;
      }
    }

    return null;
  };

  /* -------------------------------------------------------------------------- */
  /*                                  SAVE                                      */
  /* -------------------------------------------------------------------------- */

  const handleSave = async () => {
    setError("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);

      return;
    }

    try {
      setSaving(true);

      const payload = {
        name: sequenceName,

        goal,

        status,

        steps: steps.map((step) => ({
          step_order: step.stepNumber,

          delay_days: step.delayDays,

          subject: step.subject,

          body_template: step.body,

          send_window_start:
            step.sendWindowStart + ":00",

          send_window_end:
            step.sendWindowEnd + ":00",
        })),
      };

      await api.post("/sequences", payload);

      navigate("/sequences");

    } catch (error) {
      console.error(error);

      setError(
        error?.response?.data?.message ||
          "Failed to create sequence."
      );

    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-40">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        {/* HEADER */}

        <div className="mb-10">
          <Link
            to="/sequences"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-5 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Sequences
          </Link>

          <h1 className="text-4xl font-bold mb-2">
            Create New Sequence
          </h1>

          <p className="text-gray-400">
            Build automated email workflows
          </p>
        </div>

        {/* ERROR */}

        {error && (
          <div className="mb-6 border border-red-500/20 bg-red-500/10 text-red-400 rounded-2xl px-5 py-4">
            {error}
          </div>
        )}

        {/* DETAILS */}

        <div className="bg-[#111111] border border-[#222] rounded-3xl p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">
            Sequence Details
          </h2>

          <div className="space-y-5">
            {/* NAME */}

            <input
              value={sequenceName}
              onChange={(e) =>
                setSequenceName(
                  e.target.value
                )
              }
              placeholder="Sequence Name"
              className="w-full bg-black border border-[#222] rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500"
            />

            {/* GOAL */}

            <input
              value={goal}
              onChange={(e) =>
                setGoal(e.target.value)
              }
              placeholder="Goal"
              className="w-full bg-black border border-[#222] rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500"
            />

            {/* STATUS */}

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="w-full bg-black border border-[#222] rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500"
            >
              <option value="draft">
                Draft
              </option>

              <option value="active">
                Active
              </option>

              <option value="paused">
                Paused
              </option>
            </select>
          </div>
        </div>

        {/* SEARCH + FILTER */}

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* SEARCH */}

          <input
            placeholder="Search steps..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(
                e.target.value
              )
            }
            className="flex-1 bg-black border border-[#222] rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500"
          />

          {/* FILTER */}

          <select
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(
                e.target.value
              )
            }
            className="bg-black border border-[#222] rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500 min-w-[180px]"
          >
            <option value="all">
              All Steps
            </option>

            <option value="draft">
              Draft
            </option>

            <option value="active">
              Active
            </option>

            <option value="paused">
              Paused
            </option>
          </select>
        </div>

        {/* STEPS */}

        <div className="bg-[#111111] border border-[#222] rounded-3xl p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-semibold">
                Email Steps
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                Create automated outreach flow
              </p>
            </div>

            <button
              onClick={addStep}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition"
            >
              <Plus className="w-4 h-4" />
              Add Step
            </button>
          </div>

          {/* NO RESULTS */}

          {filteredSteps.length === 0 ? (
            <div className="border border-dashed border-[#333] rounded-2xl p-10 text-center text-gray-500">
              No steps found.
            </div>
          ) : (
            <div className="space-y-5">
              {filteredSteps.map((step) => (
                <StepCard
                  key={step.id}
                  step={step}
                  onUpdate={updateStep}
                  onDelete={deleteStep}
                  disableDelete={
                    steps.length === 1
                  }
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM ACTION BAR */}

      <div className="fixed bottom-0 left-0 right-0 bg-[#111111]/95 backdrop-blur-md border-t border-[#222] z-50">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row justify-end gap-4">
          <button
            onClick={() =>
              navigate("/sequences")
            }
            disabled={saving}
            className="px-6 py-3 rounded-xl border border-[#222] hover:bg-[#1a1a1a] transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2 min-w-[180px]"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Sequence"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}