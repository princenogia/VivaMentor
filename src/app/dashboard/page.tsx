"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import SubjectCard from "@/components/SubjectCard";
import { SUBJECTS } from "@/lib/vapi";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // Filter subjects based on search query
  const filteredSubjects = useMemo(() => {
    if (!searchQuery.trim()) return SUBJECTS;
    const query = searchQuery.toLowerCase();
    return SUBJECTS.filter(
      (subject) =>
        subject.name.toLowerCase().includes(query) ||
        subject.description.toLowerCase().includes(query) ||
        subject.id.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="spinner w-12 h-12" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="dashboard-page">
      <Navbar />

      <main className="dashboard-main">
        {/* Welcome Section */}
        <section className="dashboard-welcome">
          <h1>
            Welcome back,{" "}
            <span className="text-gradient">
              {user.displayName || "Student"}
            </span>
          </h1>
          <p>Choose a subject to start your AI-powered tutoring session</p>
        </section>

        {/* How It Works - Horizontal Steps */}
        <section className="how-it-works">
          <h2>How VivaMentor Works</h2>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Select a Subject</h3>
                <p>Choose the topic you want to practice</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number step-2">2</div>
              <div className="step-content">
                <h3>Speak & Listen</h3>
                <p>Answer questions using your voice</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number step-3">3</div>
              <div className="step-content">
                <h3>Get Instant Feedback</h3>
                <p>Receive corrections and explanations</p>
              </div>
            </div>
          </div>
        </section>

        {/* Subject Grid with Search */}
        <section className="subjects-section">
          <div className="subjects-header">
            <h2>Choose Your Subject</h2>
            <div className="search-box">
              <svg
                className="search-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search subjects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="search-clear"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {filteredSubjects.length > 0 ? (
            <div className="subjects-grid">
              {filteredSubjects.map((subject) => (
                <SubjectCard
                  key={subject.id}
                  id={subject.id}
                  name={subject.name}
                  icon={subject.icon}
                  description={subject.description}
                  color={subject.color}
                />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>No subjects found matching &quot;{searchQuery}&quot;</p>
              <button onClick={() => setSearchQuery("")} className="reset-btn">
                Clear search
              </button>
            </div>
          )}
        </section>

        {/* Tips Section */}
        <section className="tips-section">
          <h2>💡 Tips for Best Results</h2>
          <ul>
            <li>
              <span className="check">✓</span> Use a quiet environment and speak
              clearly
            </li>
            <li>
              <span className="check">✓</span> Allow microphone access when
              prompted
            </li>
            <li>
              <span className="check">✓</span> Answer naturally - the AI
              understands conversational responses
            </li>
            <li>
              <span className="check">✓</span> Ask for clarification if you
              don&apos;t understand a question
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
