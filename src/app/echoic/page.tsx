export default function Echoic() {
  return (
    <main className="page-hero" style={{ minHeight: "100svh" }}>
      <div className="shell">
        <p className="eyebrow hot">Vetro Echoic</p>
        <h1 style={{ maxWidth: "13ch" }}>Discontinued.</h1>
        <div className="notice" style={{ marginTop: "2.5rem" }}>
          <span className="eyebrow">Status</span>
          The Vetro Echoic project has been discontinued, either temporarily or
          permanently, due to its lack of long-term viability and significant
          technical challenges. Vetro Collection is unaffected and continues to
          ship.
        </div>
        <div className="cta-actions" style={{ justifyContent: "flex-start", marginTop: "2rem" }}>
          <a href="/Vetro-Studio/" className="btn btn-ghost">
            Back to Vetro Collection
          </a>
        </div>
      </div>
    </main>
  );
}
