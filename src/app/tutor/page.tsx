"use client";

import { useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useVoiceTutor } from "@/hooks/useVoiceTutor";
import VoiceOrb from "@/components/VoiceOrb";
import { SUBJECTS } from "@/lib/vapi";

function TutorContent() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const subjectId = searchParams.get("subject") || "mathematics";
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const subject = SUBJECTS.find((s) => s.id === subjectId) || SUBJECTS[0];

  const {
    status,
    messages,
    isMuted,
    volumeLevel,
    error,
    liveTranscript,
    startCall,
    endCall,
    toggleMute,
  } = useVoiceTutor({
    subjectId,
    userName: user?.displayName || "Student",
  });

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, liveTranscript]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="spinner w-12 h-12" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="tutor-page">
      {/* Header */}
      <header className="tutor-header">
        <Link href="/dashboard" className="back-link">
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </Link>

        <div className="subject-badge">
          <span className={`subject-emoji`}>{subject.icon}</span>
          <span className="subject-label">{subject.name}</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="tutor-main">
        {/* Error Display */}
        {error && (
          <div className="error-message">
            <p className="error-title">Connection Error</p>
            <p className="error-text">{error.message}</p>
            <p className="error-hint">Make sure your VAPI key is configured</p>
          </div>
        )}

        {/* Voice Orb */}
        <div className="voice-orb-wrapper">
          <VoiceOrb
            isActive={status === "active"}
            volumeLevel={volumeLevel}
            isConnecting={status === "connecting"}
          />

          {/* Status below orb */}
          <p className="orb-status">
            {status === "idle" && "Tap to start"}
            {status === "connecting" && "Connecting..."}
            {status === "active" && "Listening..."}
            {status === "ending" && "Ending..."}
          </p>
        </div>

        {/* Controls */}
        <div className="tutor-controls">
          {status === "idle" ? (
            <button onClick={startCall} className="start-btn">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
              Start
            </button>
          ) : (
            <>
              <button
                onClick={toggleMute}
                className={`control-btn ${isMuted ? "muted" : ""}`}
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  </svg>
                )}
              </button>

              <button
                onClick={endCall}
                disabled={status === "ending"}
                className="control-btn end"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </>
          )}
        </div>
      </main>

      {/* Live Captions Box - Fixed at Bottom */}
      <div className="captions-box">
        <div className="captions-header">
          <span className="captions-indicator">
            <span
              className={`dot ${status === "active" ? "active" : ""}`}
            ></span>
            Live Captions
          </span>
        </div>
        <div className="captions-content">
          {messages.length === 0 && !liveTranscript ? (
            <p className="captions-placeholder">Captions will appear here...</p>
          ) : (
            <>
              {messages.slice(-3).map((msg, idx) => (
                <div key={idx} className={`caption-line ${msg.role}`}>
                  <span className="caption-role">
                    {msg.role === "user" ? "You" : "AI"}:
                  </span>
                  <span className="caption-text">{msg.content}</span>
                </div>
              ))}
              {liveTranscript && (
                <div className={`caption-line ${liveTranscript.role} live`}>
                  <span className="caption-role">
                    {liveTranscript.role === "user" ? "You" : "AI"}:
                  </span>
                  <span className="caption-text">{liveTranscript.text}</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TutorPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-black">
          <div className="spinner w-12 h-12" />
        </div>
      }
    >
      <TutorContent />
    </Suspense>
  );
}
