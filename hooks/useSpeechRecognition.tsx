"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type SpeechResult = {
  transcript: string;
  isFinal: boolean;
};

type SpeechErrorType =
  | "not-supported"
  | "not-allowed"
  | "no-speech"
  | "aborted"
  | "audio-capture"
  | "network"
  | "service-not-allowed"
  | "bad-grammar"
  | "language-not-supported"
  | "unknown";

type SpeechError = {
  type: SpeechErrorType;
  message: string;
};

const ERROR_MESSAGES: Record<SpeechErrorType, string> = {
  "not-supported":
    "Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.",
  "not-allowed":
    "Microphone access denied. Please allow microphone permissions in your browser settings.",
  "no-speech": "No speech detected. Please try again.",
  aborted: "Speech recognition was aborted. Please try again.",
  "audio-capture":
    "Microphone not found or not working. Please check your microphone.",
  network: "Network error occurred. Please check your connection.",
  "service-not-allowed":
    "Speech recognition service is not allowed. Please check your browser settings.",
  "bad-grammar": "Speech recognition grammar error.",
  "language-not-supported": "The selected language is not supported.",
  unknown: "An unknown error occurred. Please try again.",
};

export function useSpeechRecognition() {
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const callbackRef = useRef<((result: SpeechResult) => void) | null>(null);
  const [listening, setListening] = useState(false);
  const [error, setError] = useState<SpeechError | null>(null);
  const [isSupported, setIsSupported] = useState<boolean | null>(null);

  const checkSupport = useCallback(() => {
    if (isSupported !== null) return isSupported;

    if (typeof window === "undefined") {
      setIsSupported(false);
      return false;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    const supported = !!SpeechRecognition;
    setIsSupported(supported);
    return supported;
  }, [isSupported]);

  const mapErrorType = (errorCode: string): SpeechErrorType => {
    switch (errorCode) {
      case "not-allowed":
      case "permission-denied":
        return "not-allowed";
      case "no-speech":
        return "no-speech";
      case "aborted":
        return "aborted";
      case "audio-capture":
        return "audio-capture";
      case "network":
        return "network";
      case "service-not-allowed":
        return "service-not-allowed";
      case "bad-grammar":
        return "bad-grammar";
      case "language-not-supported":
        return "language-not-supported";
      default:
        return "unknown";
    }
  };

  const start = useCallback(() => {
    if (!checkSupport()) {
      const errorObj: SpeechError = {
        type: "not-supported",
        message: ERROR_MESSAGES["not-supported"],
      };
      setError(errorObj);
      toast.error(errorObj.message, { duration: 4000 });
      return;
    }

    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    try {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }

      const recognition: SpeechRecognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = true;
      recognition.continuous = false;

      recognition.onstart = () => {
        setListening(true);
        setError(null);
      };

      recognition.onend = () => {
        setListening(false);
      };

      recognition.onresult = (event: any) => {
        try {
          const result = event.results[event.resultIndex][0];
          const speechResult: SpeechResult = {
            transcript: result.transcript,
            isFinal: event.results[event.resultIndex].isFinal,
          };

          if (callbackRef.current) {
            callbackRef.current(speechResult);
          }
        } catch (err) {
          console.error("Error processing speech result:", err);
          const errorObj: SpeechError = {
            type: "unknown",
            message: "Error processing speech. Please try again.",
          };
          setError(errorObj);
          toast.error(errorObj.message, { duration: 4000 });
        }
      };

      recognition.onerror = (event: any) => {
        const errorType = mapErrorType(event.error);
        const errorObj: SpeechError = {
          type: errorType,
          message: ERROR_MESSAGES[errorType],
        };
        setError(errorObj);
        toast.error(errorObj.message, {
          duration: errorType === "no-speech" ? 2000 : 4000,
        });
        setListening(false);

        if (recognitionRef.current) {
          try {
            recognitionRef.current.stop();
          } catch (e) {}
          recognitionRef.current = null;
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      const errorObj: SpeechError = {
        type: "unknown",
        message: err instanceof Error ? err.message : ERROR_MESSAGES.unknown,
      };
      setError(errorObj);
      toast.error(errorObj.message, { duration: 4000 });
      setListening(false);
    }
  }, [checkSupport]);

  const stop = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        console.error("Error stopping speech recognition:", err);
      }
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const onResult = useCallback((callback: (result: SpeechResult) => void) => {
    callbackRef.current = callback;
  }, []);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
    };
  }, []);

  return {
    start,
    stop,
    onResult,
    listening,
    error,
    isSupported,
    clearError,
  };
}
