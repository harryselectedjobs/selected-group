export const mockSequences = [
  {
    id: "1",
    name: "New Lead Outreach",
    goal: "Book discovery calls with leads",
    status: "Active",
    stepCount: 5,
    enrolledContacts: 142,
    replyRate: 12,
    openRate: 44,
    clickRate: 26,

    steps: [
      {
        id: "s1",
        stepNumber: 1,
        subject: "Welcome Email",
        delayDays: 0,
        body: "Hi {{firstname}}, welcome to our platform.",
        sendWindowStart: "09:00",
        sendWindowEnd: "17:00",
      },

      {
        id: "s2",
        stepNumber: 2,
        subject: "Follow Up",
        delayDays: 2,
        body: "Just checking if you saw my previous email.",
        sendWindowStart: "09:00",
        sendWindowEnd: "17:00",
      },
    ],
  },

  {
    id: "2",
    name: "Customer Onboarding",
    goal: "Guide new customers",
    status: "Paused",
    stepCount: 4,
    enrolledContacts: 88,
    replyRate: 9,
    openRate: 38,
    clickRate: 18,
    steps: [],
  },
];

export const mockContacts = [
  {
    id: "1",
    firstName: "Dipti",
    lastName: "Bhowmik",
    email: "dipti@example.com",

    enrolledSequences: [
      {
        sequenceId: "1",
        currentStep: 2,
        totalSteps: 5,
        nextSendDate: "2026-05-12",
        status: "Active",
      },
    ],
  },

  {
    id: "2",
    firstName: "Rahul",
    lastName: "Sharma",
    email: "rahul@example.com",

    enrolledSequences: [
      {
        sequenceId: "1",
        currentStep: 3,
        totalSteps: 5,
        nextSendDate: "2026-05-15",
        status: "Paused",
      },
    ],
  },
];