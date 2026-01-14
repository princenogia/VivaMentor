"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { getVapiInstance, getTutorPrompt } from "@/lib/vapi";

export type CallStatus = "idle" | "connecting" | "active" | "ending";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isFinal: boolean;
}

interface UseVoiceTutorOptions {
  subjectId: string;
  userName: string;
  onCallStart?: () => void;
  onCallEnd?: () => void;
  onError?: (error: Error) => void;
}

export function useVoiceTutor({
  subjectId,
  userName,
  onCallStart,
  onCallEnd,
  onError,
}: UseVoiceTutorOptions) {
  const [status, setStatus] = useState<CallStatus>("idle");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [error, setError] = useState<Error | null>(null);
  const [liveTranscript, setLiveTranscript] = useState<{
    role: string;
    text: string;
  } | null>(null);
  const isConnectingRef = useRef(false);

  const vapi = getVapiInstance();

  // Set up event listeners
  useEffect(() => {
    const handleCallStart = () => {
      setStatus("active");
      isConnectingRef.current = false;
      onCallStart?.();
    };

    const handleCallEnd = () => {
      setStatus("idle");
      isConnectingRef.current = false;
      setLiveTranscript(null);
      onCallEnd?.();
    };

    const handleSpeechStart = () => {
      setVolumeLevel(0.5);
    };

    const handleSpeechEnd = () => {
      setVolumeLevel(0);
    };

    const handleVolumeLevel = (level: number) => {
      setVolumeLevel(level);
    };

    const handleMessage = (message: {
      type: string;
      role?: string;
      transcript?: string;
      transcriptType?: string;
    }) => {
      if (message.type === "transcript" && message.transcript) {
        const role = message.role === "user" ? "user" : "assistant";
        const isFinal = message.transcriptType === "final";

        if (isFinal) {
          // Add final transcript to messages
          setMessages((prev) => [
            ...prev,
            {
              role,
              content: message.transcript as string,
              timestamp: new Date(),
              isFinal: true,
            },
          ]);
          setLiveTranscript(null);
        } else {
          // Show partial transcript as live
          setLiveTranscript({ role, text: message.transcript });
        }
      }
    };

    const handleError = (err: Error) => {
      setError(err);
      setStatus("idle");
      isConnectingRef.current = false;
      onError?.(err);
    };

    vapi.on("call-start", handleCallStart);
    vapi.on("call-end", handleCallEnd);
    vapi.on("speech-start", handleSpeechStart);
    vapi.on("speech-end", handleSpeechEnd);
    vapi.on("volume-level", handleVolumeLevel);
    vapi.on("message", handleMessage);
    vapi.on("error", handleError);

    return () => {
      vapi.off("call-start", handleCallStart);
      vapi.off("call-end", handleCallEnd);
      vapi.off("speech-start", handleSpeechStart);
      vapi.off("speech-end", handleSpeechEnd);
      vapi.off("volume-level", handleVolumeLevel);
      vapi.off("message", handleMessage);
      vapi.off("error", handleError);
    };
  }, [vapi, onCallStart, onCallEnd, onError]);

  const startCall = useCallback(async () => {
    if (isConnectingRef.current || status === "active") return;

    isConnectingRef.current = true;
    setStatus("connecting");
    setError(null);
    setMessages([]);
    setLiveTranscript(null);

    try {
      await vapi.start({
        model: {
          provider: "openai",
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: getTutorPrompt(subjectId, userName),
            },
          ],
        },
        voice: {
          provider: "11labs",
          voiceId: "pFZP5JQG7iQjIQuC4Bku", // Lily voice - warm and educational
        },
        name: `VivaMentor - ${subjectId} Tutor`,
      });
    } catch (err) {
      isConnectingRef.current = false;
      setStatus("idle");
      const error =
        err instanceof Error ? err : new Error("Failed to start call");
      setError(error);
      onError?.(error);
    }
  }, [vapi, subjectId, userName, status, onError]);

  const endCall = useCallback(async () => {
    if (status === "idle") return;

    setStatus("ending");
    try {
      await vapi.stop();
    } catch (err) {
      console.error("Error ending call:", err);
    }
    setStatus("idle");
    setLiveTranscript(null);
  }, [vapi, status]);

  const toggleMute = useCallback(() => {
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    vapi.setMuted(newMuteState);
  }, [vapi, isMuted]);

  return {
    status,
    messages,
    isMuted,
    volumeLevel,
    error,
    liveTranscript,
    startCall,
    endCall,
    toggleMute,
  };
}
