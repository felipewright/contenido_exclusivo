export default function UsedPage() {
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
        textAlign: "center",
        padding: "30px",
        fontFamily: "sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "40px",
          fontWeight: "bold",
          lineHeight: "1.2",
          marginBottom: "20px",
        }}
      >
        ¿Te dejamos con ganas de más?
      </h1>

      <div style={{ fontSize: "40px", marginBottom: "20px" }}>
        💋
      </div>

      <p
        style={{
          fontSize: "18px",
          opacity: 0.7,
          maxWidth: "300px",
          marginBottom: "40px",
        }}
      >
        Seguinos en nuestras redes y encontrá más contenido
      </p>

      <div
        style={{
          display: "flex",
          gap: "25px",
          marginBottom: "60px",
        }}
      >

        <a
          href="https://www.tiktok.com/@vivituexperiencia.sx?_r=1&_t=ZS-96sM3mUxIC9"
          target="_blank"
        >
          <div style={circleStyle}>
            <img src="/icons/tiktok.png" style={iconStyle} />
          </div>
        </a>

        <a
          href="https://www.instagram.com/infovivituexperienciaok?igsh=czExaWN0YXQ2MXI="
          target="_blank"
        >
          <div style={circleStyle}>
            <img src="/icons/instagram.png" style={iconStyle} />
          </div>
        </a>

        <a
          href="https://x.com/sexobra?s=21"
          target="_blank"
        >
          <div style={circleStyle}>
            <img src="/icons/x.png" style={iconStyle} />
          </div>
        </a>
      </div>

      <div
        style={{
          color: "#ffb300",
          fontWeight: "bold",
          fontSize: "32px",
        }}
      >
        SEX
      </div>
    </div>
  );
}

const circleStyle = {
  width: "70px",
  height: "70px",
  borderRadius: "50%",
  border: "2px solid rgba(255,255,255,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const iconStyle = {
  width: "28px",
  height: "28px",
  filter: "invert(1)",
};