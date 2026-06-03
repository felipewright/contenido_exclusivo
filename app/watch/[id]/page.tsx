"use client";

import { useEffect, useState } from "react";
import { use } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

interface WatchPageProps {
  params: Promise<{ id: string }>;
}

export default function WatchPage(props: WatchPageProps) {
  const params = use(props.params);

  const searchParams = useSearchParams();
  const eventId = searchParams.get("event") || "default";

  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const selected = localStorage.getItem(
      `selected_video_${eventId}`
    );
    const watched = localStorage.getItem(`watched_${eventId}`);

    if (!selected || selected !== params.id || watched) {
      setValid(false);
      setLoading(false);
      return;
    }

    setValid(true);

    const { data } = supabase.storage
      .from("videos")
      .getPublicUrl(`${params.id}.mp4`);

    setVideoUrl(data.publicUrl);
    setLoading(false);
  }, [params.id, eventId]);

  const handleEnd = () => {
    localStorage.setItem(`watched_${eventId}`, "true");
    window.location.href = "/used";
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "black",
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: "18px", opacity: 0.7, marginBottom: "10px" }}>
          Preparando tu video...
        </div>

        <div
          style={{
            width: "40px",
            height: "40px",
            border: "3px solid rgba(255,255,255,0.2)",
            borderTop: "3px solid white",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />

        <style>
          {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
        </style>
      </div>
    );
  }

  if (!valid) return <div>Access denied</div>;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {videoUrl && (
        <video
          src={videoUrl}
          controls
          preload="metadata"
          onEnded={handleEnd}
          style={{
            width: "100%",
            maxWidth: "900px",
            borderRadius: "12px",
          }}
        />
      )}
    </div>
  );
}