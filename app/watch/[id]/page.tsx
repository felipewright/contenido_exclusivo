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
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Cargando contenido...
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
        />
      )}
    </div>
  );
}