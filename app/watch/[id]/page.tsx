"use client";

import { useEffect, useState, use } from "react";
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
    const watched = localStorage.getItem(
      `watched_${eventId}`
    );

    if (!selected || selected !== params.id || watched) {
      setValid(false);
      setLoading(false);
      return;
    }

    setValid(true);

    // LOCK THE EVENT IMMEDIATELY
    localStorage.setItem(`watched_${eventId}`, "true");

    const { data } = supabase.storage
      .from("videos")
      .getPublicUrl(`${params.id}.mp4`);

    setVideoUrl(data.publicUrl);
    setLoading(false);
  }, [params.id, eventId]);

  useEffect(() => {
    const handlePopState = () => {
      window.location.replace("/used");
    };

    window.history.pushState(
      null,
      "",
      window.location.href
    );

    window.addEventListener(
      "popstate",
      handlePopState
    );

    return () => {
      window.removeEventListener(
        "popstate",
        handlePopState
      );
    };
  }, []);

  const handleEnd = () => {
    window.location.replace("/used");
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "black",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Cargando contenido...
      </div>
    );
  }

  if (!valid) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "black",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Access denied
      </div>
    );
  }

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