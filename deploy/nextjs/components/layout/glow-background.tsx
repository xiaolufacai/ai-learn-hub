export function GlowBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Top-right orb */}
      <div
        className="glow-orb animate-glow-pulse"
        style={{
          width: 500,
          height: 500,
          top: -150,
          right: -150,
          background: "radial-gradient(circle, rgba(99,102,241,0.25), transparent 70%)",
        }}
      />
      {/* Bottom-left orb */}
      <div
        className="glow-orb"
        style={{
          width: 400,
          height: 400,
          bottom: -100,
          left: -100,
          background: "radial-gradient(circle, rgba(168,85,247,0.2), transparent 70%)",
          animation: "glow-pulse 10s ease-in-out infinite alternate-reverse",
        }}
      />
      {/* Center-right subtle orb */}
      <div
        className="glow-orb"
        style={{
          width: 300,
          height: 300,
          top: "50%",
          right: "20%",
          background: "radial-gradient(circle, rgba(99,102,241,0.12), transparent 70%)",
          animation: "glow-pulse 12s ease-in-out 2s infinite alternate",
        }}
      />
    </div>
  );
}
