"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function HomeContent() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("event") || "default";

  const baseVideos = [
    { id: "video1", name: "Adabel Guerrero" },
    { id: "video2", name: "Valeria Archimó" },
    { id: "video3", name: "Yagui" },
    { id: "video4", name: "Rodrigo Jara" },
    { id: "video5", name: "Muscari" },
    { id: "video6", name: "Maxi Diorio" },
    { id: "video7", name: "Manu" },
    { id: "video8", name: "Mai" },
    { id: "video9", name: "Mai & Jona" },
    { id: "video10", name: "Luli" },
    { id: "video11", name: "Luca Martín" },
    { id: "video12", name: "Licha" },
    { id: "video13", name: "Jona Hidalgo" },
    { id: "video14", name: "Flor de la V" },
    { id: "video15", name: "Fer & Turquesa" },
    { id: "video16", name: "Dori Ganino" },
    { id: "video17", name: "Brenda, Rodri, Yagui" },
    { id: "video18", name: "Brenda Matto" },
    { id: "video19", name: "Bimbo" },
    { id: "video20", name: "Ampi & Turquesa" },
  ];

  const [videos, setVideos] = useState(baseVideos);

  useEffect(() => {
    const shuffled = [...baseVideos].sort(() => Math.random() - 0.5);
    setVideos(shuffled);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)",
        color: "white",
        padding: "20px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1 style={{ color: "#ffb300", fontSize: "42px", margin: 0 }}>
          SEX
        </h1>

        <h2 style={{ fontSize: "22px", fontWeight: 400 }}>
          Deslizá para ver contenido exclusivo
        </h2>

        <div style={{ marginTop: "20px", fontSize: "14px", opacity: 0.8 }}>
          <strong>⚠️ Una elección, una oportunidad.</strong>
          <br />
          Podés elegir un solo video y reproducirlo una única vez.
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {videos.map((video) => (
          <div
            key={video.id}
            onClick={() => {
              const watched = localStorage.getItem(`watched_${eventId}`);

              if (watched) {
                window.location.href = "/used";
                return;
              }

              localStorage.setItem(
                `selected_video_${eventId}`,
                video.id
              );

              window.location.href = `/watch/${video.id}?event=${eventId}`;
            }}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px",
              borderRadius: "20px",
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.2)",
              cursor: "pointer",
            }}
          >
            <img
              src={`/images/${video.id}.jpg`}
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                objectFit: "cover",
                marginRight: "15px",
              }}
            />

            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: "bold", fontSize: "18px" }}>
                {video.name}
              </div>
              <div style={{ fontSize: "12px", opacity: 0.7 }}>
                Video exclusivo
              </div>
            </div>

            <div
              style={{
                width: "45px",
                height: "45px",
                borderRadius: "50%",
                border: "2px solid rgba(255,255,255,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
              }}
            >
              ▶
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
