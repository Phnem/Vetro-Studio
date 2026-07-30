export default function Echoic() {
  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '2rem',
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-text)',
        fontFamily: "'Outfit', sans-serif",
        textAlign: 'center',
      }}
    >
      <h1
        style={{
          fontSize: 'clamp(2rem, 5vw, 4rem)',
          fontWeight: 800,
          background: 'var(--color-accent-gradient)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '2rem',
        }}
      >
        Vetro Echoic
      </h1>
      <p
        style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
          color: 'var(--color-text-secondary)',
          maxWidth: '700px',
          lineHeight: 1.7,
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
        }}
      >
        I have to announce that the Vetro Echoic project has been discontinued,
        either temporarily or permanently, due to its lack of long-term viability
        and significant technical challenges.
      </p>
    </main>
  );
}
