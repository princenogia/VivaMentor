"use client";

interface VoiceOrbProps {
  isActive: boolean;
  volumeLevel: number;
  isConnecting?: boolean;
}

export default function VoiceOrb({
  isActive,
  volumeLevel,
  isConnecting = false,
}: VoiceOrbProps) {
  // Scale the orb based on volume (1.0 to 1.3)
  const scale = isActive ? 1 + volumeLevel * 0.3 : 1;

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow rings */}
      {isActive && (
        <>
          <div
            className="absolute w-48 h-48 rounded-full bg-gradient-to-r from-primary-500/20 to-accent-500/20 voice-orb-ring"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="absolute w-48 h-48 rounded-full bg-gradient-to-r from-primary-500/15 to-accent-500/15 voice-orb-ring"
            style={{ animationDelay: "0.5s" }}
          />
          <div
            className="absolute w-48 h-48 rounded-full bg-gradient-to-r from-primary-500/10 to-accent-500/10 voice-orb-ring"
            style={{ animationDelay: "1s" }}
          />
        </>
      )}

      {/* Main orb */}
      <div
        className={`relative w-40 h-40 rounded-full transition-all duration-150 flex items-center justify-center ${
          isConnecting
            ? "bg-gradient-to-br from-yellow-500 to-orange-500"
            : isActive
            ? "bg-gradient-to-br from-primary-500 to-accent-500"
            : "bg-gradient-to-br from-gray-600 to-gray-700"
        }`}
        style={{
          transform: `scale(${scale})`,
          boxShadow: isActive
            ? `0 0 60px rgba(14, 165, 233, 0.4), 0 0 120px rgba(217, 70, 239, 0.2)`
            : isConnecting
            ? `0 0 40px rgba(234, 179, 8, 0.4)`
            : "none",
        }}
      >
        {/* Inner glow */}
        <div
          className={`absolute inset-2 rounded-full bg-gradient-to-br ${
            isConnecting
              ? "from-yellow-400 to-orange-400"
              : isActive
              ? "from-primary-400 to-accent-400"
              : "from-gray-500 to-gray-600"
          } opacity-50`}
        />

        {/* Icon */}
        <div className="relative z-10">
          {isConnecting ? (
            <div className="spinner w-12 h-12 border-4 border-white/30 border-t-white" />
          ) : (
            <svg
              className={`w-16 h-16 ${
                isActive ? "text-white" : "text-gray-400"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
