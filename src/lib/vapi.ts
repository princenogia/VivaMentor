import Vapi from "@vapi-ai/web";

// Create a singleton instance of Vapi
let vapiInstance: Vapi | null = null;

export function getVapiInstance(): Vapi {
  if (!vapiInstance) {
    const webToken = process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN;
    if (!webToken) {
      throw new Error("VAPI web token is not configured");
    }
    vapiInstance = new Vapi(webToken);
  }
  return vapiInstance;
}

// Get the workflow ID for Vapi calls
export function getVapiWorkflowId(): string {
  const workflowId = process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID;
  if (!workflowId) {
    throw new Error("VAPI workflow ID is not configured");
  }
  return workflowId;
}

// Check if Vapi is properly configured
export const isVapiConfigured = Boolean(
  process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN &&
    process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN !== "your_vapi_web_token_here"
);

// Medical & Surgical Subjects
export const SUBJECTS = [
  // Basic Medical Sciences
  {
    id: "human-anatomy",
    name: "Human Anatomy",
    icon: "🦴",
    description: "Gross anatomy, regional anatomy",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "physiology",
    name: "Physiology",
    icon: "💓",
    description: "Body functions and systems",
    color: "from-red-500 to-pink-500",
  },
  {
    id: "biochemistry",
    name: "Biochemistry",
    icon: "🧬",
    description: "Metabolic pathways, enzymes",
    color: "from-purple-500 to-violet-500",
  },
  {
    id: "histology",
    name: "Histology",
    icon: "🔬",
    description: "Tissue structure and function",
    color: "from-teal-500 to-emerald-500",
  },
  {
    id: "embryology",
    name: "Embryology",
    icon: "🧫",
    description: "Development and congenital disorders",
    color: "from-amber-500 to-orange-500",
  },
  {
    id: "pathology",
    name: "Pathology",
    icon: "🩺",
    description: "Disease mechanisms",
    color: "from-rose-500 to-red-500",
  },
  {
    id: "microbiology",
    name: "Microbiology",
    icon: "🦠",
    description: "Bacteria, viruses, parasites",
    color: "from-green-500 to-lime-500",
  },
  {
    id: "pharmacology",
    name: "Pharmacology",
    icon: "💊",
    description: "Drug actions and interactions",
    color: "from-indigo-500 to-blue-500",
  },
  {
    id: "forensic-medicine",
    name: "Forensic Medicine",
    icon: "⚖️",
    description: "Legal medicine, toxicology",
    color: "from-slate-500 to-gray-500",
  },
  {
    id: "community-medicine",
    name: "Community Medicine",
    icon: "🏥",
    description: "Public health, epidemiology",
    color: "from-cyan-500 to-teal-500",
  },

  // Clinical Medicine
  {
    id: "general-medicine",
    name: "General Medicine",
    icon: "🩻",
    description: "Internal medicine, diagnosis",
    color: "from-blue-600 to-indigo-500",
  },
  {
    id: "general-surgery",
    name: "General Surgery",
    icon: "🔪",
    description: "Surgical principles, procedures",
    color: "from-red-600 to-rose-500",
  },
  {
    id: "orthopedics",
    name: "Orthopedics",
    icon: "🦿",
    description: "Bones, joints, musculoskeletal",
    color: "from-amber-600 to-yellow-500",
  },
  {
    id: "obstetrics-gynecology",
    name: "Obstetrics & Gynecology",
    icon: "🤰",
    description: "Women's health, childbirth",
    color: "from-pink-500 to-fuchsia-500",
  },
  {
    id: "pediatrics",
    name: "Pediatrics",
    icon: "👶",
    description: "Child health and development",
    color: "from-sky-500 to-blue-500",
  },
  {
    id: "anesthesiology",
    name: "Anesthesiology",
    icon: "😴",
    description: "Anesthesia, pain management",
    color: "from-violet-500 to-purple-500",
  },
  {
    id: "radiology",
    name: "Radiology",
    icon: "📡",
    description: "Imaging, X-ray, CT, MRI",
    color: "from-gray-500 to-zinc-500",
  },
  {
    id: "emergency-medicine",
    name: "Emergency Medicine",
    icon: "🚑",
    description: "Acute care, trauma",
    color: "from-red-500 to-orange-500",
  },

  // Surgical Specialties
  {
    id: "surgical-anatomy",
    name: "Surgical Anatomy",
    icon: "🫀",
    description: "Applied anatomy for surgery",
    color: "from-rose-600 to-red-500",
  },
  {
    id: "surgical-pathology",
    name: "Surgical Pathology",
    icon: "🧪",
    description: "Tissue diagnosis, biopsies",
    color: "from-purple-600 to-pink-500",
  },
  {
    id: "clinical-pharmacology",
    name: "Clinical Pharmacology",
    icon: "💉",
    description: "Drug therapy in practice",
    color: "from-emerald-500 to-green-500",
  },
  {
    id: "intensive-care",
    name: "Intensive Care Medicine",
    icon: "🏨",
    description: "ICU, critical care",
    color: "from-blue-700 to-indigo-600",
  },
  {
    id: "trauma-emergency",
    name: "Trauma & Emergency Care",
    icon: "🩹",
    description: "Acute trauma management",
    color: "from-orange-600 to-red-500",
  },
  {
    id: "infection-control",
    name: "Infection Control",
    icon: "🧴",
    description: "Sterilization, sepsis prevention",
    color: "from-teal-600 to-cyan-500",
  },
  {
    id: "medical-ethics",
    name: "Medical Ethics & Law",
    icon: "📜",
    description: "Ethics, consent, legal issues",
    color: "from-slate-600 to-gray-500",
  },
  {
    id: "operative-techniques",
    name: "Operative Techniques",
    icon: "✂️",
    description: "Surgical skills, procedures",
    color: "from-red-700 to-rose-600",
  },
  {
    id: "perioperative-care",
    name: "Pre/Postoperative Care",
    icon: "📋",
    description: "Surgical care management",
    color: "from-amber-600 to-orange-500",
  },

  // Surgical Subspecialties
  {
    id: "neurosurgery",
    name: "Neurosurgery",
    icon: "🧠",
    description: "Brain and spine surgery",
    color: "from-violet-600 to-purple-500",
  },
  {
    id: "cardiothoracic-surgery",
    name: "Cardiothoracic Surgery",
    icon: "❤️",
    description: "Heart and chest surgery",
    color: "from-red-600 to-pink-500",
  },
  {
    id: "plastic-surgery",
    name: "Plastic & Reconstructive",
    icon: "🎭",
    description: "Reconstructive procedures",
    color: "from-fuchsia-500 to-pink-500",
  },
  {
    id: "pediatric-surgery",
    name: "Pediatric Surgery",
    icon: "🧒",
    description: "Surgery in children",
    color: "from-sky-600 to-cyan-500",
  },
  {
    id: "urology",
    name: "Urology",
    icon: "🫘",
    description: "Urinary and male reproductive",
    color: "from-yellow-600 to-amber-500",
  },
  {
    id: "gi-surgery",
    name: "Gastrointestinal Surgery",
    icon: "🫃",
    description: "Digestive system surgery",
    color: "from-green-600 to-emerald-500",
  },
  {
    id: "surgical-oncology",
    name: "Surgical Oncology",
    icon: "🎗️",
    description: "Cancer surgery",
    color: "from-purple-700 to-violet-600",
  },
  {
    id: "transplant-surgery",
    name: "Transplant Surgery",
    icon: "🫁",
    description: "Organ transplantation",
    color: "from-blue-600 to-cyan-500",
  },
];

// Get the tutor system prompt for a subject
export function getTutorPrompt(subjectId: string, userName: string): string {
  const subject = SUBJECTS.find((s) => s.id === subjectId);
  const subjectName = subject?.name || "Medical Studies";

  return `You are VivaMentor, an expert medical tutor specializing in ${subjectName} for medical and surgical students. You are conducting a voice-based exam preparation session with ${userName}.

Your role and behavior:
1. ASK EXAM-STYLE QUESTIONS: Start by asking the student a challenging but fair exam-style question on ${subjectName}. Focus on high-yield topics commonly tested in medical licensing exams (USMLE, MBBS, NEET-PG style). Wait for their verbal response.

2. LISTEN AND EVALUATE: When the student answers, carefully evaluate their response for:
   - Factual accuracy (especially clinical facts, anatomical details, drug names)
   - Depth of understanding and clinical reasoning
   - Proper use of medical terminology
   - Logical reasoning and differential diagnosis approach

3. PROVIDE INSTANT FEEDBACK:
   - If CORRECT: Praise briefly, reinforce the key point, and ask a follow-up question or move to a related clinical scenario.
   - If PARTIALLY CORRECT: Acknowledge what's right, gently correct the mistakes with proper medical explanations, then offer a clarifying question.
   - If INCORRECT: Be supportive ("That's a common misconception in ${subjectName}"), provide the correct answer with clinical context, and offer an easier related question.

4. TEACHING STYLE:
   - Use clinical correlations and real-world scenarios when possible
   - Mention important mnemonics where applicable
   - Keep explanations concise for voice (30-60 seconds max)
   - Use encouraging language ("Excellent clinical reasoning!", "Good differential thinking!")
   - Speak naturally, as a real medical professor would

5. SESSION FLOW:
   - Start with medium difficulty, adjust based on performance
   - Cover different aspects within ${subjectName} (theory, clinical, practical)
   - For surgical topics, include operative indications, techniques, and complications
   - End sessions positively with key takeaways and study tips

Remember: You are having a VOICE conversation. Keep responses conversational, natural, and appropriately paced for speaking aloud. Avoid using special characters, markdown, or formatting that wouldn't translate well to speech.

Begin by warmly greeting ${userName} and asking your first ${subjectName} question.`;
}
