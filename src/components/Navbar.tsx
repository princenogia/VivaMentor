"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link href="/dashboard" className="navbar-logo">
          <Image
            src="/logo.png"
            alt="VivaMentor"
            width={32}
            height={32}
            className="logo-image"
          />
          <span className="logo-text-nav">VivaMentor</span>
          <span className="logo-badge">Medical AI</span>
        </Link>

        {/* Center - Quick Stats */}
        <div className="navbar-center">
          <div className="nav-stat">
            <span className="stat-value">35</span>
            <span className="stat-label">Subjects</span>
          </div>
          <div className="nav-divider"></div>
          <div className="nav-stat">
            <span className="stat-value">∞</span>
            <span className="stat-label">Questions</span>
          </div>
        </div>

        {/* User Menu */}
        {user && (
          <div className="navbar-user">
            <div className="user-info">
              <div className="user-avatar">
                {user.displayName?.charAt(0).toUpperCase() ||
                  user.email?.charAt(0).toUpperCase()}
              </div>
              <div className="user-details">
                <span className="user-name">
                  {user.displayName || "Student"}
                </span>
                <span className="user-email">{user.email}</span>
              </div>
            </div>
            <button onClick={handleLogout} className="logout-btn">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
