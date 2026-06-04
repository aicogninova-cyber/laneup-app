import React from 'react';
import { useState, useEffect, useRef } from 'react';

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────
const T = {
  // Core palette — Ale's colors: pink → violet → blue
  pink: '#FF3CA0',
  violet: '#9B5DE5',
  blue: '#2DD4F0',
  navy: '#0A0E27',
  navyMid: '#111635',
  navyCard: '#161B3A',
  navyBorder: '#252D5C',
  // Text
  textPrimary: '#F0F2FF',
  textSecondary: '#8B93C4',
  textMuted: '#4A527A',
  // Status
  green: '#00D68F',
  amber: '#FFB830',
  red: '#FF4D6A',
};

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body, #root { background: ${T.navy}; font-family: 'DM Sans', sans-serif; color: ${T.textPrimary}; }
    input, select, textarea {
      background: ${T.navyMid}; border: 1px solid ${T.navyBorder}; color: ${T.textPrimary};
      border-radius: 10px; padding: 10px 14px; font-size: 13px; font-family: 'DM Sans', sans-serif;
      outline: none; transition: border-color .2s;
    }
    input:focus, select:focus, textarea:focus { border-color: ${T.violet}; }
    input::placeholder, textarea::placeholder { color: ${T.textMuted}; }
    select option { background: ${T.navyMid}; color: ${T.textPrimary}; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: ${T.navyMid}; }
    ::-webkit-scrollbar-thumb { background: ${T.navyBorder}; border-radius: 2px; }
    @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:none; } }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.6} }
    @keyframes wave { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
    @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
    .fade-up { animation: fadeUp .4s ease both; }
    .fade-up-1 { animation: fadeUp .4s .05s ease both; }
    .fade-up-2 { animation: fadeUp .4s .1s ease both; }
    .fade-up-3 { animation: fadeUp .4s .15s ease both; }
  `}</style>
);

// ─── REUSABLE COMPONENTS ─────────────────────────────────────────────────

function GlowButton({
  children,
  onClick,
  color = T.pink,
  small,
  full,
  outline,
  disabled,
  style: s = {},
}) {
  const bg = outline ? 'transparent' : color;
  const border = `1.5px solid ${color}`;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: bg,
        border,
        color: outline ? color : T.navy,
        borderRadius: 50,
        padding: small ? '7px 18px' : '12px 28px',
        fontSize: small ? 12 : 14,
        fontWeight: 600,
        cursor: disabled ? 'default' : 'pointer',
        fontFamily: "'DM Sans', sans-serif",
        letterSpacing: '.02em',
        width: full ? '100%' : 'auto',
        opacity: disabled ? 0.4 : 1,
        transition: 'transform .15s, opacity .15s',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        ...s,
      }}
      onMouseEnter={(e) => {
        if (!disabled) e.currentTarget.style.transform = 'scale(1.03)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      {children}
    </button>
  );
}

function Card({ children, style: s = {}, glow }) {
  return (
    <div
      style={{
        background: T.navyCard,
        border: `1px solid ${glow ? T.navyBorder : T.navyBorder}`,
        borderRadius: 16,
        padding: 16,
        boxShadow: glow
          ? `0 0 0 1px ${T.violet}30, 0 4px 24px ${T.violet}15`
          : 'none',
        ...s,
      }}
    >
      {children}
    </div>
  );
}

function Badge({ children, color = T.violet }) {
  return (
    <span
      style={{
        background: color + '22',
        color,
        border: `1px solid ${color}44`,
        borderRadius: 20,
        padding: '3px 10px',
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '.03em',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  );
}

function Pill({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: active ? T.violet : 'transparent',
        border: `1px solid ${active ? T.violet : T.navyBorder}`,
        color: active ? '#fff' : T.textSecondary,
        borderRadius: 20,
        padding: '5px 13px',
        fontSize: 12,
        fontWeight: active ? 600 : 400,
        cursor: 'pointer',
        fontFamily: "'DM Sans', sans-serif",
        transition: 'all .15s',
      }}
    >
      {children}
    </button>
  );
}

function Label({ children }) {
  return (
    <div
      style={{
        fontSize: 11,
        color: T.textMuted,
        marginBottom: 5,
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: '.06em',
      }}
    >
      {children}
    </div>
  );
}

function Divider() {
  return (
    <div style={{ height: 1, background: T.navyBorder, margin: '12px 0' }} />
  );
}

function ScoreBadge({ score }) {
  const color = score >= 75 ? T.green : score >= 55 ? T.amber : T.red;
  return (
    <div
      style={{
        background: color + '18',
        border: `1px solid ${color}44`,
        borderRadius: 10,
        padding: '6px 10px',
        textAlign: 'center',
        minWidth: 52,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          fontSize: 18,
          fontWeight: 700,
          color,
          fontFamily: "'Clash Display', sans-serif",
        }}
      >
        {Math.round(score)}
      </div>
      <div
        style={{
          fontSize: 9,
          color,
          textTransform: 'uppercase',
          letterSpacing: '.08em',
          marginTop: 1,
        }}
      >
        match
      </div>
    </div>
  );
}

// ─── WAVE DECORATION ─────────────────────────────────────────────────────
function WaveBar() {
  return (
    <div
      style={{
        height: 3,
        overflow: 'hidden',
        borderRadius: 2,
        background: T.navyBorder,
      }}
    >
      <div
        style={{
          height: '100%',
          width: '200%',
          background: `linear-gradient(90deg, ${T.pink}, ${T.violet}, ${T.blue}, ${T.pink})`,
          animation: 'wave 3s linear infinite',
        }}
      />
    </div>
  );
}

// ─── SPLASH / ONBOARDING ─────────────────────────────────────────────────
function SplashScreen({ onContinue }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: T.navy,
        padding: 32,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow orbs */}
      <div
        style={{
          position: 'absolute',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: T.pink + '12',
          filter: 'blur(80px)',
          top: -60,
          left: -60,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: T.violet + '18',
          filter: 'blur(100px)',
          bottom: -100,
          right: -80,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: T.blue + '15',
          filter: 'blur(60px)',
          top: '40%',
          right: 20,
          pointerEvents: 'none',
        }}
      />

      <div
        className="fade-up"
        style={{ textAlign: 'center', maxWidth: 340, position: 'relative' }}
      >
        {/* Logo mark */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 22,
            background: `linear-gradient(135deg, ${T.pink}, ${T.violet})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            boxShadow: `0 0 40px ${T.pink}40`,
          }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path
              d="M4 20 Q10 12 20 20 Q30 28 36 20"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M4 28 Q10 20 20 28 Q30 36 36 28"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              opacity=".6"
            />
            <circle cx="30" cy="12" r="5" fill="white" opacity=".9" />
            <path
              d="M27 12 L33 12 M30 9 L30 15"
              stroke={T.pink}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <h1
          style={{
            fontFamily: "'Clash Display', sans-serif",
            fontSize: 42,
            fontWeight: 700,
            letterSpacing: '-.02em',
            lineHeight: 1,
            marginBottom: 6,
          }}
        >
          Lane
          <span
            style={{
              background: `linear-gradient(135deg, ${T.pink}, ${T.violet})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Up
          </span>
        </h1>
        <p style={{ color: T.textSecondary, fontSize: 14, marginBottom: 4 }}>
          Your recruiting journey
        </p>
        <p
          style={{
            color: T.textMuted,
            fontSize: 12,
            fontStyle: 'italic',
            marginBottom: 36,
          }}
        >
          from first lap to signing day
        </p>

        <WaveBar />

        <p
          style={{
            color: T.textMuted,
            fontSize: 11,
            margin: '16px 0 32px',
            lineHeight: 1.7,
          }}
        >
          Built by a swimmer, for every athlete.
          <br />
          <span style={{ color: T.pink }}>
            Made with love for Alejandra — Ale — Stich ♡
          </span>
        </p>

        <GlowButton
          onClick={onContinue}
          full
          style={{ justifyContent: 'center' }}
        >
          Get started
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </GlowButton>

        <p style={{ color: T.textMuted, fontSize: 11, marginTop: 20 }}>
          Already started? Your data is saved automatically.
        </p>
      </div>
    </div>
  );
}

// ─── SPORT SELECTOR ───────────────────────────────────────────────────────
const SPORTS = [
  {
    id: 'swimming',
    label: 'Swimming',
    icon: '🏊‍♀️',
    color: T.blue,
    desc: 'Times · NCAA standards · College match',
  },
  {
    id: 'basketball',
    label: 'Basketball',
    icon: '🏀',
    color: T.pink,
    desc: 'Measurables · D1/D2 standards',
  },
  {
    id: 'volleyball',
    label: 'Volleyball',
    icon: '🏐',
    color: T.violet,
    desc: 'Jump reach · Stats · School match',
  },
  {
    id: 'soccer',
    label: 'Soccer',
    icon: '⚽',
    color: T.green,
    desc: 'Club rank · Goals · Assists',
  },
  {
    id: 'lacrosse',
    label: 'Lacrosse',
    icon: '🥍',
    color: T.amber,
    desc: 'Position · Stats · IWLCA',
  },
  {
    id: 'track',
    label: 'Track & Field',
    icon: '🏃‍♀️',
    color: T.pink,
    desc: 'Personal bests · Standards',
  },
  {
    id: 'football',
    label: 'Football',
    icon: '🏈',
    color: T.amber,
    desc: '40 time · Measurables · Stars',
  },
];

function SportSelector({ onSelect }) {
  return (
    <div
      style={{ padding: '24px 16px', minHeight: '100vh', background: T.navy }}
    >
      <div className="fade-up" style={{ marginBottom: 28 }}>
        <div
          style={{
            fontSize: 11,
            color: T.violet,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '.1em',
            marginBottom: 8,
          }}
        >
          LaneUp
        </div>
        <h2
          style={{
            fontFamily: "'Clash Display', sans-serif",
            fontSize: 26,
            fontWeight: 700,
            lineHeight: 1.2,
            marginBottom: 8,
          }}
        >
          What sport
          <br />
          do you play?
        </h2>
        <p style={{ color: T.textSecondary, fontSize: 13 }}>
          Everything adapts — standards, stats, school filters, emails
        </p>
      </div>
      <div
        className="fade-up-1"
        style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
      >
        {SPORTS.map((s) => (
          <button
            key={s.id}
            onClick={() => onSelect(s.id)}
            style={{
              background: T.navyCard,
              border: `1px solid ${T.navyBorder}`,
              borderRadius: 14,
              padding: '14px 16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              textAlign: 'left',
              transition: 'border-color .15s, transform .15s',
              fontFamily: "'DM Sans', sans-serif",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = s.color;
              e.currentTarget.style.transform = 'translateX(4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = T.navyBorder;
              e.currentTarget.style.transform = 'none';
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: s.color + '22',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 22,
                flexShrink: 0,
              }}
            >
              {s.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: T.textPrimary,
                  marginBottom: 2,
                }}
              >
                {s.label}
              </div>
              <div style={{ fontSize: 12, color: T.textSecondary }}>
                {s.desc}
              </div>
            </div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              style={{ flexShrink: 0 }}
            >
              <path
                d="M6 4l4 4-4 4"
                stroke={T.textMuted}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── BOTTOM NAV ───────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: 'home', icon: 'M3 12l9-9 9 9M5 10v9h5v-5h4v5h5v-9', label: 'Home' },
  {
    id: 'search',
    icon: 'M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z',
    label: 'Schools',
  },
  {
    id: 'tracker',
    icon: 'M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11',
    label: 'Tracker',
  },
  {
    id: 'times',
    icon: 'M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM12 6v6l4 2',
    label: 'Times',
  },
  {
    id: 'profile',
    icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
    label: 'Profile',
  },
];

function BottomNav({ tab, setTab }) {
  return (
    <div
      style={{
        position: 'sticky',
        bottom: 0,
        background: T.navyMid,
        borderTop: `1px solid ${T.navyBorder}`,
        display: 'flex',
        padding: '8px 0 12px',
        zIndex: 100,
        backdropFilter: 'blur(12px)',
      }}
    >
      {NAV_ITEMS.map((n) => {
        const active = tab === n.id;
        return (
          <button
            key={n.id}
            onClick={() => setTab(n.id)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: active ? T.pink : T.textMuted,
              fontFamily: "'DM Sans', sans-serif",
              transition: 'color .15s',
            }}
          >
            {active && (
              <div
                style={{
                  position: 'absolute',
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: T.pink,
                  marginTop: -8,
                  boxShadow: `0 0 8px ${T.pink}`,
                }}
              />
            )}
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d={n.icon} />
            </svg>
            <span style={{ fontSize: 10, fontWeight: active ? 600 : 400 }}>
              {n.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ─── HOME TAB ─────────────────────────────────────────────────────────────
function HomeTab({ student, savedUnis, fups, sport, setTab, customEvents }) {
  const cfg = SPORTS.find((s) => s.id === sport) || SPORTS[0];
  const totalFups = Object.values(fups).reduce((a, b) => a + b.length, 0);
  const doneFups = Object.values(fups).reduce(
    (a, b) => a + b.filter((f) => f.done).length,
    0
  );
  const pct = totalFups ? Math.round((doneFups / totalFups) * 100) : 0;
  const upcomingEvents = [...(customEvents || [])]
    .sort((a, b) => a.date?.localeCompare(b.date))
    .slice(0, 3);

  return (
    <div style={{ padding: '20px 16px', paddingBottom: 4 }}>
      {/* Header */}
      <div className="fade-up" style={{ marginBottom: 20 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                color: T.violet,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '.1em',
                marginBottom: 4,
              }}
            >
              {cfg.icon} {cfg.label}
            </div>
            <h1
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: 26,
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              {student.firstName
                ? `Hey, ${student.firstName}`
                : 'Welcome to LaneUp'}
            </h1>
            <p style={{ color: T.textSecondary, fontSize: 13, marginTop: 4 }}>
              Your recruiting dashboard
            </p>
          </div>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${T.pink}, ${T.violet})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18,
              boxShadow: `0 0 20px ${T.pink}40`,
            }}
          >
            {student.firstName ? student.firstName[0].toUpperCase() : 'A'}
          </div>
        </div>
      </div>

      <WaveBar />

      {/* Stats row */}
      <div
        className="fade-up-1"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 10,
          margin: '16px 0',
        }}
      >
        {[
          {
            label: 'Saved',
            value: savedUnis.length,
            color: T.violet,
            icon: '🏫',
          },
          {
            label: 'Steps done',
            value: `${doneFups}/${totalFups}`,
            color: T.pink,
            icon: '✓',
          },
          {
            label: 'Reminders',
            value: customEvents?.length || 0,
            color: T.blue,
            icon: '🔔',
          },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              background: T.navyCard,
              border: `1px solid ${T.navyBorder}`,
              borderRadius: 14,
              padding: '12px 10px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 18, marginBottom: 4 }}>{s.icon}</div>
            <div
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: 20,
                fontWeight: 700,
                color: s.color,
              }}
            >
              {s.value}
            </div>
            <div style={{ fontSize: 10, color: T.textMuted, marginTop: 2 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      {totalFups > 0 && (
        <Card className="fade-up-2" style={{ marginBottom: 14 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 8,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 500 }}>
              Recruiting progress
            </span>
            <span style={{ fontSize: 13, color: T.violet, fontWeight: 700 }}>
              {pct}%
            </span>
          </div>
          <div
            style={{
              height: 6,
              background: T.navyBorder,
              borderRadius: 3,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                borderRadius: 3,
                width: `${pct}%`,
                background: `linear-gradient(90deg, ${T.pink}, ${T.violet})`,
                transition: 'width .5s ease',
              }}
            />
          </div>
        </Card>
      )}

      {/* Academic snapshot */}
      {(student.gpa || student.satScore) && (
        <Card className="fade-up-2" style={{ marginBottom: 14 }}>
          <div
            style={{
              fontSize: 12,
              color: T.textMuted,
              marginBottom: 10,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '.06em',
            }}
          >
            Academic profile
          </div>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {student.gpa && (
              <div>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: T.pink,
                    fontFamily: "'Clash Display', sans-serif",
                  }}
                >
                  {student.gpa}
                </div>
                <div style={{ fontSize: 11, color: T.textMuted }}>
                  GPA (unweighted)
                </div>
              </div>
            )}
            {student.satScore && (
              <div>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: T.violet,
                    fontFamily: "'Clash Display', sans-serif",
                  }}
                >
                  {student.satScore}
                </div>
                <div style={{ fontSize: 11, color: T.textMuted }}>SAT</div>
              </div>
            )}
            {student.actScore && (
              <div>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: T.blue,
                    fontFamily: "'Clash Display', sans-serif",
                  }}
                >
                  {student.actScore}
                </div>
                <div style={{ fontSize: 11, color: T.textMuted }}>ACT</div>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Quick actions */}
      <div
        className="fade-up-3"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 10,
          marginBottom: 16,
        }}
      >
        {[
          { label: 'Find schools', icon: '🏫', color: T.pink, tab: 'search' },
          { label: 'My times', icon: '⏱', color: T.blue, tab: 'times' },
          { label: 'Tracker', icon: '✅', color: T.violet, tab: 'tracker' },
          { label: 'My profile', icon: '👤', color: T.amber, tab: 'profile' },
        ].map((a) => (
          <button
            key={a.label}
            onClick={() => setTab(a.tab)}
            style={{
              background: T.navyCard,
              border: `1px solid ${T.navyBorder}`,
              borderRadius: 14,
              padding: '14px 16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontFamily: "'DM Sans', sans-serif",
              transition: 'border-color .15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = a.color)}
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = T.navyBorder)
            }
          >
            <span style={{ fontSize: 20 }}>{a.icon}</span>
            <span
              style={{ fontSize: 13, fontWeight: 500, color: T.textPrimary }}
            >
              {a.label}
            </span>
          </button>
        ))}
      </div>

      {/* Upcoming reminders */}
      {upcomingEvents.length > 0 && (
        <Card style={{ marginBottom: 16 }}>
          <div
            style={{
              fontSize: 12,
              color: T.textMuted,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '.06em',
              marginBottom: 10,
            }}
          >
            Upcoming reminders
          </div>
          {upcomingEvents.map((ev, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: 10,
                alignItems: 'center',
                marginBottom: i < upcomingEvents.length - 1 ? 8 : 0,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: T.pink,
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: T.textPrimary,
                  }}
                >
                  {ev.title}
                </div>
                <div style={{ fontSize: 11, color: T.textMuted }}>
                  {ev.date}
                </div>
              </div>
            </div>
          ))}
        </Card>
      )}

      {/* "Made by Ale" footer */}
      <div style={{ textAlign: 'center', padding: '8px 0 4px' }}>
        <span style={{ fontSize: 11, color: T.textMuted }}>LaneUp · </span>
        <span
          style={{
            fontSize: 11,
            background: `linear-gradient(90deg, ${T.pink}, ${T.violet})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 600,
          }}
        >
          by Ale ♡
        </span>
      </div>
    </div>
  );
}

// ─── PROFILE TAB ─────────────────────────────────────────────────────────
const US_STATES = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
  'Washington D.C.',
];
const MAJORS = [
  'Business / Management',
  'International Relations',
  'Political Science',
  'Economics',
  'Finance',
  'Marketing',
  'Communications',
  'Pre-Law',
  'Pre-Med',
  'Engineering',
  'Computer Science',
  'Psychology',
  'Environmental Studies',
];

function ProfileTab({
  student,
  updS,
  togArr,
  doSave,
  savedMsg,
  sport,
  setSport,
}) {
  const [section, setSection] = useState('personal');
  const sections = [
    ['personal', 'Personal'],
    ['academic', 'Academic'],
    ['athletic', 'Athletic'],
    ['preferences', 'Fit'],
  ];

  return (
    <div style={{ padding: '20px 16px', paddingBottom: 4 }}>
      <div className="fade-up" style={{ marginBottom: 16 }}>
        <h2
          style={{
            fontFamily: "'Clash Display', sans-serif",
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          My profile
        </h2>
        <p style={{ color: T.textSecondary, fontSize: 13, marginTop: 4 }}>
          The more you fill in, the better your school matches
        </p>
      </div>

      {/* Section tabs */}
      <div
        style={{
          display: 'flex',
          gap: 7,
          marginBottom: 16,
          overflowX: 'auto',
          paddingBottom: 4,
        }}
      >
        {sections.map(([id, label]) => (
          <Pill key={id} active={section === id} onClick={() => setSection(id)}>
            {label}
          </Pill>
        ))}
      </div>

      {section === 'personal' && (
        <div className="fade-up">
          <Card style={{ marginBottom: 12 }}>
            <Label>Name</Label>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 10,
                marginBottom: 12,
              }}
            >
              <div>
                <input
                  placeholder="First name"
                  value={student.firstName || ''}
                  onChange={(e) => updS('firstName', e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <input
                  placeholder="Last name"
                  value={student.lastName || ''}
                  onChange={(e) => updS('lastName', e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>
            </div>
            <Label>Contact</Label>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                marginBottom: 12,
              }}
            >
              <input
                placeholder="Email address"
                value={student.email || ''}
                onChange={(e) => updS('email', e.target.value)}
                style={{ width: '100%' }}
              />
              <input
                placeholder="Phone number"
                value={student.phone || ''}
                onChange={(e) => updS('phone', e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
            <Label>High school</Label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <input
                placeholder="High school name"
                value={student.highSchool || ''}
                onChange={(e) => updS('highSchool', e.target.value)}
                style={{ width: '100%' }}
              />
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 10,
                }}
              >
                <select
                  value={student.hsState || ''}
                  onChange={(e) => updS('hsState', e.target.value)}
                  style={{ width: '100%' }}
                >
                  <option value="">State...</option>
                  {US_STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <select
                  value={student.graduationYear || '2027'}
                  onChange={(e) => updS('graduationYear', e.target.value)}
                  style={{ width: '100%' }}
                >
                  {['2026', '2027', '2028', '2029'].map((y) => (
                    <option key={y} value={y}>
                      Class of {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Card>
          <Card style={{ marginBottom: 12 }}>
            <Label>Heritage & background</Label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <input
                placeholder="Family / parents origin (e.g. Colombia)"
                value={student.parentsOrigin || ''}
                onChange={(e) => updS('parentsOrigin', e.target.value)}
                style={{ width: '100%' }}
              />
              <select
                value={student.ethnicity || ''}
                onChange={(e) => updS('ethnicity', e.target.value)}
                style={{ width: '100%' }}
              >
                <option value="">Ethnicity...</option>
                {[
                  'Hispanic / Latino',
                  'White / Caucasian',
                  'Black / African American',
                  'Asian / Pacific Islander',
                  'Native American',
                  'Middle Eastern',
                  'Multiracial',
                  'Prefer not to say',
                ].map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
            <Divider />
            <Label>Languages</Label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {[
                'English',
                'Spanish',
                'Portuguese',
                'French',
                'Mandarin',
                'Arabic',
                'Other',
              ].map((l) => {
                const active =
                  (student.nativeLanguages || []).includes(l) ||
                  (student.additionalLanguages || []).includes(l);
                return (
                  <Pill
                    key={l}
                    active={active}
                    onClick={() => togArr('additionalLanguages', l)}
                  >
                    {l}
                  </Pill>
                );
              })}
            </div>
          </Card>
        </div>
      )}

      {section === 'academic' && (
        <div className="fade-up">
          <Card style={{ marginBottom: 12 }}>
            <Label>Test scores</Label>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: 10,
                marginBottom: 12,
              }}
            >
              {[
                ['GPA', 'gpa', '3.80'],
                ['SAT', 'satScore', '1350'],
                ['ACT', 'actScore', '30'],
              ].map(([l, k, ph]) => (
                <div key={k}>
                  <div
                    style={{
                      fontSize: 11,
                      color: T.textMuted,
                      marginBottom: 4,
                    }}
                  >
                    {l}
                  </div>
                  <input
                    type="number"
                    placeholder={ph}
                    value={student[k] || ''}
                    onChange={(e) => updS(k, e.target.value)}
                    style={{ width: '100%' }}
                  />
                </div>
              ))}
            </div>
            <Label>Intended majors</Label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {MAJORS.map((m) => (
                <Pill
                  key={m}
                  active={(student.majorInterests || []).includes(m)}
                  onClick={() => togArr('majorInterests', m)}
                >
                  {m}
                </Pill>
              ))}
            </div>
          </Card>
          <Card style={{ marginBottom: 12 }}>
            <Label>Extracurriculars</Label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div>
                <div
                  style={{ fontSize: 11, color: T.textMuted, marginBottom: 4 }}
                >
                  Volunteer hours
                </div>
                <input
                  type="number"
                  placeholder="e.g. 150 hours"
                  value={student.volunteerHours || ''}
                  onChange={(e) => updS('volunteerHours', e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <div
                  style={{ fontSize: 11, color: T.textMuted, marginBottom: 4 }}
                >
                  Leadership (team captain, NHS, student gov...)
                </div>
                <textarea
                  placeholder="Describe your top leadership roles"
                  value={student.leadershipDescription || ''}
                  onChange={(e) =>
                    updS('leadershipDescription', e.target.value)
                  }
                  style={{ width: '100%', minHeight: 64, resize: 'vertical' }}
                />
              </div>
              <div>
                <div
                  style={{ fontSize: 11, color: T.textMuted, marginBottom: 4 }}
                >
                  Research experience
                </div>
                <textarea
                  placeholder="Any research projects, science fair, independent study"
                  value={student.researchDescription || ''}
                  onChange={(e) => updS('researchDescription', e.target.value)}
                  style={{ width: '100%', minHeight: 64, resize: 'vertical' }}
                />
              </div>
            </div>
          </Card>
        </div>
      )}

      {section === 'athletic' && (
        <div className="fade-up">
          <Card style={{ marginBottom: 12 }}>
            <Label>Sport</Label>
            <select
              value={sport}
              onChange={(e) => setSport(e.target.value)}
              style={{ width: '100%', marginBottom: 12 }}
            >
              {SPORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.icon} {s.label}
                </option>
              ))}
            </select>
            {sport === 'swimming' && (
              <>
                <Label>Swimming level</Label>
                <select
                  value={student.swimLevel || 'Club swimmer'}
                  onChange={(e) => updS('swimLevel', e.target.value)}
                  style={{ width: '100%', marginBottom: 12 }}
                >
                  {[
                    'High school team only',
                    'Club swimmer',
                    'Regional / Sectionals',
                    'Junior Nationals',
                    'Senior Nationals / Olympic Trials',
                  ].map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
                <Label>National percentile</Label>
                <select
                  value={student.swimPercentile || ''}
                  onChange={(e) => updS('swimPercentile', e.target.value)}
                  style={{ width: '100%', marginBottom: 12 }}
                >
                  <option value="">Unknown / not sure</option>
                  <option value="top1">Top 1-2% (Olympic Trials)</option>
                  <option value="top5">Top 5% (Junior Nationals)</option>
                  <option value="top15">Top 10-15% (Sectionals)</option>
                  <option value="top25">Top 25% (Regional / club)</option>
                  <option value="regional">Regional / state level</option>
                </select>
                <Label>Best events</Label>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 6,
                    marginBottom: 12,
                  }}
                >
                  {[
                    '50 Free',
                    '100 Free',
                    '200 Free',
                    '500 Free',
                    '1650 Free',
                    '100 Back',
                    '200 Back',
                    '100 Breast',
                    '200 Breast',
                    '100 Fly',
                    '200 Fly',
                    '200 IM',
                    '400 IM',
                  ].map((ev) => (
                    <Pill
                      key={ev}
                      active={(student.swimEvents || []).includes(ev)}
                      onClick={() => togArr('swimEvents', ev)}
                    >
                      {ev}
                    </Pill>
                  ))}
                </div>
                {(student.swimEvents || []).length > 0 && (
                  <>
                    <Label>Best times (SCY)</Label>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 8,
                      }}
                    >
                      {(student.swimEvents || []).map((ev) => (
                        <div key={ev}>
                          <div
                            style={{
                              fontSize: 11,
                              color: T.textMuted,
                              marginBottom: 3,
                            }}
                          >
                            {ev}
                          </div>
                          <input
                            placeholder="e.g. 52.34"
                            value={(student.swimTimes || {})[ev] || ''}
                            onChange={(e) =>
                              updS('swimTimes', {
                                ...student.swimTimes,
                                [ev]: e.target.value,
                              })
                            }
                            style={{ width: '100%' }}
                          />
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </Card>
        </div>
      )}

      {section === 'preferences' && (
        <div className="fade-up">
          <Card style={{ marginBottom: 12 }}>
            <Label>Location</Label>
            <select
              value={student.locationPref || 'anywhere'}
              onChange={(e) => updS('locationPref', e.target.value)}
              style={{ width: '100%', marginBottom: 12 }}
            >
              <option value="anywhere">Anywhere in the USA</option>
              <option value="in-state">Prefer in-state</option>
              <option value="specific">Specific states</option>
              <option value="out-of-state">Prefer out-of-state</option>
            </select>
            <Label>Max tuition (thousands/yr)</Label>
            <input
              type="number"
              placeholder="e.g. 40 = $40,000/yr"
              value={student.maxTuition || ''}
              onChange={(e) => updS('maxTuition', e.target.value)}
              style={{ width: '100%', marginBottom: 12 }}
            />
            <Label>Priorities</Label>
            {[
              ['needAthletic', 'Athletic scholarship required'],
              ['latinCommunityPref', 'Latin community important'],
              ['bilingualPref', 'Bilingual campus'],
              ['latinStudiesPref', 'Latin American studies program'],
              ['needScholarship', 'Need-based financial aid'],
            ].map(([k, label]) => (
              <div
                key={k}
                onClick={() => updS(k, !student[k])}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 12px',
                  borderRadius: 10,
                  marginBottom: 8,
                  cursor: 'pointer',
                  background: student[k] ? T.violet + '22' : T.navyMid,
                  border: `1px solid ${student[k] ? T.violet : T.navyBorder}`,
                }}
              >
                <div
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 5,
                    flexShrink: 0,
                    background: student[k] ? T.violet : T.navyBorder,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {student[k] && (
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6l3 3 5-5"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                </div>
                <span
                  style={{
                    fontSize: 13,
                    color: student[k] ? T.textPrimary : T.textSecondary,
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </Card>
        </div>
      )}

      <GlowButton
        onClick={doSave}
        full
        style={{ justifyContent: 'center', marginBottom: 16 }}
      >
        {savedMsg ? '✓ Saved!' : 'Save profile'}
      </GlowButton>
    </div>
  );
}

// ─── UNIVERSITIES DATA ────────────────────────────────────────────────────
const UNIVERSITIES = [
  {
    id: 1,
    name: 'University of Virginia',
    shortName: 'UVA',
    city: 'Charlottesville',
    state: 'Virginia',
    tier: 'D1 Power 4',
    conference: 'ACC',
    acceptRate: 17,
    avgGPA: 3.9,
    satLow: 1350,
    satHigh: 1540,
    tuitionOut: 58950,
    majors: [
      'Business / Management',
      'International Relations',
      'Political Science',
      'Economics',
    ],
    swimProgram: '6× consecutive NCAA champion',
    coachName: 'Todd DeSorbo',
    coachEmail: 'swimming@virginia.edu',
    latinCommunity: 'moderate',
    bilingualCampus: false,
    scholarshipAvail: true,
    size: 'Large',
    environment: 'College town',
  },
  {
    id: 2,
    name: 'Stanford University',
    shortName: 'Stanford',
    city: 'Stanford',
    state: 'California',
    tier: 'D1 Power 4',
    conference: 'ACC',
    acceptRate: 4,
    avgGPA: 3.96,
    satLow: 1500,
    satHigh: 1580,
    tuitionOut: 62484,
    majors: [
      'Business / Management',
      'International Relations',
      'Economics',
      'Engineering',
      'Computer Science',
    ],
    swimProgram: '12× NCAA champion',
    coachName: 'Chris Lindauer',
    coachEmail: 'swimdive@stanford.edu',
    latinCommunity: 'moderate',
    bilingualCampus: false,
    scholarshipAvail: true,
    size: 'Large',
    environment: 'Suburban',
  },
  {
    id: 3,
    name: 'University of Texas',
    shortName: 'UT Austin',
    city: 'Austin',
    state: 'Texas',
    tier: 'D1 Power 4',
    conference: 'SEC',
    acceptRate: 29,
    avgGPA: 3.75,
    satLow: 1230,
    satHigh: 1490,
    tuitionOut: 40996,
    majors: [
      'Business / Management',
      'International Relations',
      'Economics',
      'Communications',
    ],
    swimProgram: 'Top 3 nationally — SEC powerhouse',
    coachName: 'Carol Capitani',
    coachEmail: 'wswim@utexas.edu',
    latinCommunity: 'very high',
    bilingualCampus: true,
    scholarshipAvail: true,
    size: 'Very Large',
    environment: 'Urban city',
  },
  {
    id: 4,
    name: 'University of Florida',
    shortName: 'UF',
    city: 'Gainesville',
    state: 'Florida',
    tier: 'D1 Power 4',
    conference: 'SEC',
    acceptRate: 24,
    avgGPA: 3.9,
    satLow: 1310,
    satHigh: 1490,
    tuitionOut: 28658,
    majors: [
      'Business / Management',
      'International Relations',
      'Economics',
      'Communications',
      'Pre-Law',
    ],
    swimProgram: '#6 nationally; Anthony Nesty HC',
    coachName: 'Anthony Nesty',
    coachEmail: 'swdv@ufl.edu',
    latinCommunity: 'high',
    bilingualCampus: true,
    scholarshipAvail: true,
    size: 'Very Large',
    environment: 'College town',
  },
  {
    id: 5,
    name: 'University of Miami',
    shortName: 'UM',
    city: 'Coral Gables',
    state: 'Florida',
    tier: 'D1 Power 4',
    conference: 'ACC',
    acceptRate: 19,
    avgGPA: 3.8,
    satLow: 1350,
    satHigh: 1510,
    tuitionOut: 59330,
    majors: [
      'Business / Management',
      'International Relations',
      'Economics',
      'Communications',
      'Pre-Law',
    ],
    swimProgram: 'Top 15 nationally; ACC record 391 pts',
    coachName: 'Andy Kershaw',
    coachEmail: 'swim@miami.edu',
    latinCommunity: 'very high',
    bilingualCampus: true,
    scholarshipAvail: true,
    size: 'Medium',
    environment: 'Urban city',
  },
  {
    id: 6,
    name: 'American University',
    shortName: 'AU',
    city: 'Washington',
    state: 'District of Columbia',
    tier: 'D1 Mid-Major',
    conference: 'Patriot League',
    acceptRate: 38,
    avgGPA: 3.7,
    satLow: 1230,
    satHigh: 1430,
    tuitionOut: 56226,
    majors: [
      'Business / Management',
      'International Relations',
      'Political Science',
      'Economics',
      'Communications',
      'Pre-Law',
    ],
    swimProgram: 'D1 Patriot League — #1 IR in USA',
    coachName: 'Michael Donahue',
    coachEmail: 'swim@american.edu',
    latinCommunity: 'moderate',
    bilingualCampus: false,
    scholarshipAvail: true,
    size: 'Medium',
    environment: 'Urban city',
  },
  {
    id: 7,
    name: 'Georgetown University',
    shortName: 'Georgetown',
    city: 'Washington',
    state: 'District of Columbia',
    tier: 'D1 Mid-Major',
    conference: 'Big East',
    acceptRate: 12,
    avgGPA: 3.9,
    satLow: 1440,
    satHigh: 1570,
    tuitionOut: 62244,
    majors: [
      'Business / Management',
      'International Relations',
      'Political Science',
      'Economics',
      'Pre-Law',
    ],
    swimProgram: 'D1 Big East; SFS world-famous IR',
    coachName: 'John Carroll',
    coachEmail: 'swim@georgetown.edu',
    latinCommunity: 'moderate',
    bilingualCampus: false,
    scholarshipAvail: true,
    size: 'Medium',
    environment: 'Urban city',
  },
  {
    id: 8,
    name: 'George Washington University',
    shortName: 'GWU',
    city: 'Washington',
    state: 'District of Columbia',
    tier: 'D1 Mid-Major',
    conference: 'Atlantic 10',
    acceptRate: 45,
    avgGPA: 3.7,
    satLow: 1270,
    satHigh: 1450,
    tuitionOut: 62340,
    majors: [
      'Business / Management',
      'International Relations',
      'Political Science',
      'Economics',
      'Pre-Law',
    ],
    swimProgram: 'A-10 champion 2024-25; 2 blocks from State Dept',
    coachName: 'Chico Rego',
    coachEmail: 'swim@gwu.edu',
    latinCommunity: 'moderate',
    bilingualCampus: false,
    scholarshipAvail: true,
    size: 'Medium',
    environment: 'Urban city',
  },
  {
    id: 9,
    name: 'Columbia University',
    shortName: 'Columbia',
    city: 'New York City',
    state: 'New York',
    tier: 'D1 Ivy',
    conference: 'Ivy League',
    acceptRate: 4,
    avgGPA: 3.96,
    satLow: 1510,
    satHigh: 1580,
    tuitionOut: 67044,
    majors: [
      'Business / Management',
      'International Relations',
      'Political Science',
      'Economics',
      'Pre-Law',
      'Engineering',
      'Computer Science',
    ],
    swimProgram: 'D1 Ivy; Diana Casanova (Latina HC); SIPA #1 globally',
    coachName: 'Diana Casanova',
    coachEmail: 'swim@columbia.edu',
    latinCommunity: 'high',
    bilingualCampus: true,
    scholarshipAvail: false,
    size: 'Large',
    environment: 'Urban city',
  },
  {
    id: 10,
    name: 'Harvard University',
    shortName: 'Harvard',
    city: 'Cambridge',
    state: 'Massachusetts',
    tier: 'D1 Ivy',
    conference: 'Ivy League',
    acceptRate: 4,
    avgGPA: 3.96,
    satLow: 1500,
    satHigh: 1580,
    tuitionOut: 57261,
    majors: [
      'Business / Management',
      'International Relations',
      'Political Science',
      'Economics',
      'Pre-Law',
      'Engineering',
    ],
    swimProgram: 'D1 Ivy; 100% need-based aid',
    coachName: 'Stephanie Morawski',
    coachEmail: 'swim@harvard.edu',
    latinCommunity: 'moderate',
    bilingualCampus: false,
    scholarshipAvail: false,
    size: 'Large',
    environment: 'College town',
  },
  {
    id: 11,
    name: 'Nova Southeastern University',
    shortName: 'NSU',
    city: 'Fort Lauderdale',
    state: 'Florida',
    tier: 'D2 Champion',
    conference: 'Sunshine State',
    acceptRate: 60,
    avgGPA: 3.4,
    satLow: 1050,
    satHigh: 1280,
    tuitionOut: 36950,
    majors: [
      'Business / Management',
      'International Relations',
      'Economics',
      'Pre-Law',
      'Pre-Med',
    ],
    swimProgram: '4× consecutive D2 national champion',
    coachName: 'Josh Corliss',
    coachEmail: 'swim@nova.edu',
    latinCommunity: 'very high',
    bilingualCampus: true,
    scholarshipAvail: true,
    size: 'Large',
    environment: 'Suburban',
  },
  {
    id: 12,
    name: 'Rice University',
    shortName: 'Rice',
    city: 'Houston',
    state: 'Texas',
    tier: 'D1 Mid-Major',
    conference: 'American Athletic',
    acceptRate: 9,
    avgGPA: 3.95,
    satLow: 1500,
    satHigh: 1580,
    tuitionOut: 60960,
    majors: [
      'Business / Management',
      'International Relations',
      'Economics',
      'Engineering',
      'Computer Science',
    ],
    swimProgram:
      'Ivy-equivalent academics; Houston = largest Colombian city USA',
    coachName: 'Seth Huston',
    coachEmail: 'swim@rice.edu',
    latinCommunity: 'high',
    bilingualCampus: true,
    scholarshipAvail: true,
    size: 'Small',
    environment: 'Urban city',
  },
];

// ─── MATCH SCORING ────────────────────────────────────────────────────────
function calcMatch(s, u) {
  let sc = 50;
  if (s.latinCommunityPref && u.latinCommunity === 'very high') sc += 15;
  else if (s.latinCommunityPref && u.latinCommunity === 'high') sc += 8;
  if (s.bilingualPref && u.bilingualCampus) sc += 10;
  if (s.needAthletic && !u.scholarshipAvail) sc -= 25;
  if (s.needAthletic && u.scholarshipAvail) sc += 10;
  const gpa = parseFloat(s.gpa);
  if (!isNaN(gpa)) {
    const d = gpa - u.avgGPA;
    if (d >= 0.2) sc += 12;
    else if (d >= 0) sc += 6;
    else if (d < -0.3) sc -= 8;
  }
  const sat = parseInt(s.satScore);
  if (!isNaN(sat)) {
    if (sat >= u.satHigh) sc += 10;
    else if (sat >= u.satLow) sc += 5;
    else sc -= 6;
  }
  if (s.majorInterests?.length > 0)
    sc += Math.min(
      s.majorInterests.filter((m) => u.majors.includes(m)).length * 5,
      15
    );
  const sp = s.swimPercentile;
  if (sp === 'top1' && u.tier === 'D1 Power 4') sc += 20;
  else if (sp === 'top5' && ['D1 Power 4', 'D1 Mid-Major'].includes(u.tier))
    sc += 15;
  else if (sp === 'top15' && ['D1 Mid-Major', 'D1 Ivy'].includes(u.tier))
    sc += 15;
  else if (sp === 'top25' && ['D2 Champion', 'D1 Mid-Major'].includes(u.tier))
    sc += 15;
  return Math.max(0, Math.min(100, sc));
}

const TIER_COLOR = {
  'D1 Power 4': T.pink,
  'D1 Mid-Major': T.violet,
  'D1 Ivy': T.blue,
  'D2 Champion': T.green,
};
const FOLLOW_UP_STEPS = [
  'Initial email sent',
  'Questionnaire submitted',
  'Coach replied',
  'Call scheduled',
  'Call completed',
  'Visit requested',
  'Visit scheduled',
  'Visit completed',
  'Application submitted',
  'Scholarship offer',
  'Verbal commitment',
  'Signed NLI',
];

// ─── SEARCH TAB ───────────────────────────────────────────────────────────
function SearchTab({ student, saved, togSave, fups, addFup, notes, updNote }) {
  const [q, setQ] = useState('');
  const [tier, setTier] = useState('All');
  const [exp, setExp] = useState(null);

  const unis = UNIVERSITIES.filter((u) => {
    if (tier !== 'All' && u.tier !== tier) return false;
    if (q) {
      const lq = q.toLowerCase();
      return (
        u.name.toLowerCase().includes(lq) ||
        u.city.toLowerCase().includes(lq) ||
        u.coachName.toLowerCase().includes(lq)
      );
    }
    return true;
  })
    .map((u) => ({ ...u, ms: calcMatch(student, u) }))
    .sort((a, b) => b.ms - a.ms);

  const tiers = ['All', 'D1 Power 4', 'D1 Mid-Major', 'D1 Ivy', 'D2 Champion'];

  return (
    <div style={{ padding: '20px 16px', paddingBottom: 4 }}>
      <div className="fade-up" style={{ marginBottom: 14 }}>
        <h2
          style={{
            fontFamily: "'Clash Display', sans-serif",
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          Find schools
        </h2>
        <p style={{ color: T.textSecondary, fontSize: 13, marginTop: 4 }}>
          {unis.length} programs · sorted by your match score
        </p>
      </div>
      <div className="fade-up-1" style={{ marginBottom: 12 }}>
        <input
          placeholder="Search schools, cities, coaches..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{ width: '100%', marginBottom: 10 }}
        />
        <div
          style={{
            display: 'flex',
            gap: 7,
            overflowX: 'auto',
            paddingBottom: 4,
          }}
        >
          {tiers.map((t) => (
            <Pill key={t} active={tier === t} onClick={() => setTier(t)}>
              {t}
            </Pill>
          ))}
        </div>
      </div>

      <div
        className="fade-up-2"
        style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
      >
        {unis.map((u) => {
          const isSaved = saved.includes(u.id);
          const isExp = exp === u.id;
          const tc = TIER_COLOR[u.tier] || T.violet;
          const uF = fups[`${u.id}`] || [];

          return (
            <div
              key={u.id}
              style={{
                background: T.navyCard,
                borderRadius: 16,
                overflow: 'hidden',
                border: `1px solid ${isSaved ? T.pink + '60' : T.navyBorder}`,
                boxShadow: isSaved ? `0 0 0 1px ${T.pink}20` : 'none',
              }}
            >
              <div
                style={{ padding: '14px 14px 12px', cursor: 'pointer' }}
                onClick={() => setExp(isExp ? null : u.id)}
              >
                <div
                  style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}
                >
                  <ScoreBadge score={u.ms} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: 'flex',
                        gap: 7,
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        marginBottom: 2,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Clash Display', sans-serif",
                          fontSize: 15,
                          fontWeight: 600,
                        }}
                      >
                        {u.shortName}
                      </span>
                      <Badge color={tc}>{u.tier}</Badge>
                      {u.latinCommunity === 'very high' && (
                        <Badge color={T.amber}>🌮 Latin</Badge>
                      )}
                      {u.bilingualCampus && (
                        <Badge color={T.green}>Bilingual</Badge>
                      )}
                    </div>
                    <div style={{ fontSize: 12, color: T.textSecondary }}>
                      {u.city}, {u.state} · {u.conference}
                    </div>
                    <div
                      style={{ fontSize: 11, color: T.textMuted, marginTop: 2 }}
                    >
                      Coach: {u.coachName}
                    </div>
                    {uF.length > 0 && (
                      <div
                        style={{ fontSize: 11, color: T.violet, marginTop: 3 }}
                      >
                        ✓ {uF.filter((f) => f.done).length}/{uF.length} steps
                        done
                      </div>
                    )}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 6,
                      alignItems: 'flex-end',
                    }}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        togSave(u.id);
                      }}
                      style={{
                        background: isSaved ? T.pink : 'transparent',
                        border: `1px solid ${isSaved ? T.pink : T.navyBorder}`,
                        color: isSaved ? T.navy : T.textMuted,
                        borderRadius: 20,
                        padding: '4px 12px',
                        fontSize: 11,
                        fontWeight: 600,
                        cursor: 'pointer',
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      {isSaved ? 'Saved ♡' : 'Save'}
                    </button>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      style={{ color: T.textMuted }}
                    >
                      <path
                        d={isExp ? 'M4 10l4-4 4 4' : 'M4 6l4 4 4-4'}
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {isExp && (
                <div
                  style={{
                    borderTop: `1px solid ${T.navyBorder}`,
                    padding: '12px 14px',
                  }}
                >
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: 8,
                      marginBottom: 12,
                    }}
                  >
                    {[
                      ['Accept rate', `${u.acceptRate}%`],
                      ['Avg GPA', u.avgGPA],
                      ['SAT range', `${u.satLow}–${u.satHigh}`],
                      ['Tuition', `$${u.tuitionOut.toLocaleString()}`],
                    ].map(([l, v]) => (
                      <div
                        key={l}
                        style={{
                          background: T.navyMid,
                          borderRadius: 8,
                          padding: '8px 10px',
                        }}
                      >
                        <div
                          style={{
                            fontSize: 10,
                            color: T.textMuted,
                            marginBottom: 2,
                          }}
                        >
                          {l}
                        </div>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: T.textPrimary,
                          }}
                        >
                          {v}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: T.textSecondary,
                      marginBottom: 10,
                      lineHeight: 1.5,
                    }}
                  >
                    {u.swimProgram}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      gap: 7,
                      flexWrap: 'wrap',
                      marginBottom: 10,
                    }}
                  >
                    <a
                      href={`mailto:${u.coachEmail}`}
                      style={{
                        fontSize: 12,
                        color: T.blue,
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        background: T.blue + '15',
                        padding: '6px 12px',
                        borderRadius: 20,
                        border: `1px solid ${T.blue}40`,
                      }}
                    >
                      ✉ Email coach
                    </a>
                    <button
                      onClick={() => addFup(u.id, 'Initial email sent')}
                      style={{
                        fontSize: 12,
                        color: T.violet,
                        background: T.violet + '15',
                        border: `1px solid ${T.violet}40`,
                        padding: '6px 12px',
                        borderRadius: 20,
                        cursor: 'pointer',
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      + Track step
                    </button>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        color: T.textMuted,
                        marginBottom: 5,
                      }}
                    >
                      My notes
                    </div>
                    <textarea
                      placeholder="Add notes about this school..."
                      value={notes[`${u.id}`] || ''}
                      onChange={(e) => updNote(u.id, e.target.value)}
                      style={{
                        width: '100%',
                        minHeight: 52,
                        resize: 'vertical',
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── TRACKER TAB ─────────────────────────────────────────────────────────
function TrackerTab({ savedUnis, fups, addFup, togFup, remFup, notes }) {
  const total = Object.values(fups).reduce((a, b) => a + b.length, 0);
  const done = Object.values(fups).reduce(
    (a, b) => a + b.filter((f) => f.done).length,
    0
  );

  if (savedUnis.length === 0) {
    return (
      <div
        style={{ padding: '20px 16px', textAlign: 'center', paddingTop: 80 }}
      >
        <div style={{ fontSize: 40, marginBottom: 12 }}>🏫</div>
        <h3
          style={{
            fontFamily: "'Clash Display', sans-serif",
            fontSize: 20,
            marginBottom: 8,
          }}
        >
          No schools saved yet
        </h3>
        <p style={{ color: T.textSecondary, fontSize: 13 }}>
          Go to Find Schools and save programs you're interested in
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px 16px', paddingBottom: 4 }}>
      <div className="fade-up" style={{ marginBottom: 14 }}>
        <h2
          style={{
            fontFamily: "'Clash Display', sans-serif",
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          Tracker
        </h2>
        <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
          {[
            ['Schools', savedUnis.length, T.pink],
            ['Completed', done, T.green],
            ['Pending', total - done, T.amber],
          ].map(([l, v, c]) => (
            <div
              key={l}
              style={{
                flex: 1,
                background: T.navyCard,
                borderRadius: 12,
                padding: '10px 8px',
                textAlign: 'center',
                border: `1px solid ${T.navyBorder}`,
              }}
            >
              <div
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize: 22,
                  fontWeight: 700,
                  color: c,
                }}
              >
                {v}
              </div>
              <div style={{ fontSize: 10, color: T.textMuted }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {savedUnis.map((u) => {
          const uF = fups[`${u.id}`] || [];
          const udone = uF.filter((f) => f.done).length;
          const pct = uF.length ? Math.round((udone / uF.length) * 100) : 0;
          const tc = TIER_COLOR[u.tier] || T.violet;

          return (
            <Card key={u.id} glow={pct === 100}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 10,
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "'Clash Display', sans-serif",
                      fontSize: 16,
                      fontWeight: 600,
                    }}
                  >
                    {u.shortName}
                  </div>
                  <div style={{ fontSize: 12, color: T.textSecondary }}>
                    {u.city} ·{' '}
                    <a
                      href={`mailto:${u.coachEmail}`}
                      style={{ color: T.blue, textDecoration: 'none' }}
                    >
                      {u.coachEmail}
                    </a>
                  </div>
                </div>
                <Badge color={tc}>{pct === 100 ? '✓ Done' : `${pct}%`}</Badge>
              </div>

              {uF.length > 0 && (
                <div
                  style={{
                    height: 4,
                    background: T.navyBorder,
                    borderRadius: 2,
                    marginBottom: 10,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${pct}%`,
                      background: `linear-gradient(90deg, ${T.pink}, ${T.violet})`,
                      borderRadius: 2,
                      transition: 'width .4s',
                    }}
                  />
                </div>
              )}

              {uF.map((f, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '6px 0',
                    borderBottom: `1px solid ${T.navyBorder}`,
                  }}
                >
                  <div
                    onClick={() => togFup(u.id, i)}
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 5,
                      flexShrink: 0,
                      cursor: 'pointer',
                      background: f.done ? T.green : 'transparent',
                      border: `1.5px solid ${f.done ? T.green : T.navyBorder}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {f.done && (
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M2 6l3 3 5-5"
                          stroke={T.navy}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                  </div>
                  <span
                    style={{
                      fontSize: 12,
                      flex: 1,
                      color: f.done ? T.textMuted : T.textPrimary,
                      textDecoration: f.done ? 'line-through' : 'none',
                    }}
                  >
                    {f.type}
                  </span>
                  <span style={{ fontSize: 10, color: T.textMuted }}>
                    {f.date}
                  </span>
                  <button
                    onClick={() => remFup(u.id, i)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: T.textMuted,
                      fontSize: 14,
                      padding: '0 4px',
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}

              <div style={{ marginTop: 10 }}>
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      addFup(u.id, e.target.value);
                      e.target.value = '';
                    }
                  }}
                  style={{ width: '100%', fontSize: 12 }}
                >
                  <option value="">+ Log a follow-up step...</option>
                  {FOLLOW_UP_STEPS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {notes[`${u.id}`] && (
                <div
                  style={{
                    marginTop: 8,
                    fontSize: 11,
                    color: T.textMuted,
                    fontStyle: 'italic',
                    borderTop: `1px solid ${T.navyBorder}`,
                    paddingTop: 8,
                  }}
                >
                  📝 {notes[`${u.id}`]}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ─── TIMES TAB ────────────────────────────────────────────────────────────
const SWIM_STANDARDS = {
  '50 Free': { d1Top: '22.30', d1B: '22.76', d2: '23.70', naia: '25.03' },
  '100 Free': { d1Top: '48.50', d1B: '49.49', d2: '51.40', naia: '54.51' },
  '200 Free': {
    d1Top: '1:45.00',
    d1B: '1:47.08',
    d2: '1:50.90',
    naia: '1:56.68',
  },
  '500 Free': {
    d1Top: '4:42.00',
    d1B: '4:46.49',
    d2: '4:56.80',
    naia: '5:14.91',
  },
  '1650 Free': {
    d1Top: '16:10.00',
    d1B: '16:42.00',
    d2: '17:20.00',
    naia: '18:30.00',
  },
  '100 Back': { d1Top: '52.50', d1B: '54.01', d2: '55.80', naia: '57.50' },
  '200 Back': {
    d1Top: '1:53.00',
    d1B: '1:56.32',
    d2: '2:00.00',
    naia: '2:04.00',
  },
  '100 Breast': {
    d1Top: '59.00',
    d1B: '1:00.21',
    d2: '1:02.50',
    naia: '1:03.50',
  },
  '200 Breast': {
    d1Top: '2:09.00',
    d1B: '2:11.77',
    d2: '2:15.00',
    naia: '2:17.00',
  },
  '100 Fly': { d1Top: '52.00', d1B: '53.76', d2: '55.40', naia: '58.76' },
  '200 Fly': {
    d1Top: '1:56.00',
    d1B: '1:58.43',
    d2: '2:02.00',
    naia: '2:06.00',
  },
  '200 IM': {
    d1Top: '1:57.00',
    d1B: '1:59.65',
    d2: '2:03.40',
    naia: '2:11.37',
  },
  '400 IM': {
    d1Top: '4:12.00',
    d1B: '4:17.29',
    d2: '4:26.00',
    naia: '4:38.00',
  },
};

function tSec(t) {
  if (!t?.trim()) return null;
  const p = t.trim().split(':');
  if (p.length === 2) {
    const m = parseFloat(p[0]),
      s = parseFloat(p[1]);
    return isNaN(m) || isNaN(s) ? null : m * 60 + s;
  }
  const s = parseFloat(t);
  return isNaN(s) ? null : s;
}

function getTier(ev, t) {
  const s = SWIM_STANDARDS[ev];
  if (!s || !t) return null;
  const ts = tSec(t);
  if (ts === null) return null;
  if (ts <= tSec(s.d1Top)) return { label: 'D1 elite', color: T.green };
  if (ts <= tSec(s.d1B)) return { label: 'D1 recruit', color: T.blue };
  if (ts <= tSec(s.d2)) return { label: 'D2 recruit', color: T.violet };
  if (ts <= tSec(s.naia)) return { label: 'NAIA range', color: T.amber };
  return { label: 'Developing', color: T.textMuted };
}

function TimesTab({ student, updS }) {
  const events = Object.keys(SWIM_STANDARDS);
  const hasAny = events.some((ev) => (student.swimTimes || {})[ev]);

  return (
    <div style={{ padding: '20px 16px', paddingBottom: 4 }}>
      <div className="fade-up" style={{ marginBottom: 14 }}>
        <h2
          style={{
            fontFamily: "'Clash Display', sans-serif",
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          My times
        </h2>
        <p style={{ color: T.textSecondary, fontSize: 13, marginTop: 4 }}>
          Enter SCY times — tier updates instantly
        </p>
      </div>

      <Card className="fade-up-1" style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 8 }}>
          Look up official times
        </div>
        <a
          href="https://www.usaswimming.org/times/data-hub/time-search"
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: T.blue + '15',
            border: `1px solid ${T.blue}40`,
            borderRadius: 10,
            padding: '10px 14px',
            textDecoration: 'none',
          }}
        >
          <span style={{ fontSize: 13, color: T.blue, fontWeight: 500 }}>
            USA Swimming time search
          </span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke={T.blue}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </Card>

      <div
        className="fade-up-2"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 10,
          marginBottom: 14,
        }}
      >
        {events.map((ev) => {
          const t = (student.swimTimes || {})[ev] || '';
          const tier = t ? getTier(ev, t) : null;
          return (
            <div
              key={ev}
              style={{
                background: tier ? tier.color + '15' : T.navyCard,
                border: `1px solid ${tier ? tier.color + '50' : T.navyBorder}`,
                borderRadius: 12,
                padding: '10px 12px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 5,
                }}
              >
                <span style={{ fontSize: 11, color: T.textSecondary }}>
                  {ev}
                </span>
                {tier && (
                  <span
                    style={{ fontSize: 10, color: tier.color, fontWeight: 600 }}
                  >
                    {tier.label}
                  </span>
                )}
              </div>
              <input
                placeholder="e.g. 54.23"
                value={t}
                onChange={(e) =>
                  updS('swimTimes', {
                    ...(student.swimTimes || {}),
                    [ev]: e.target.value,
                  })
                }
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  color: tier ? tier.color : T.textPrimary,
                  fontSize: 18,
                  fontWeight: 700,
                  fontFamily: "'Clash Display', sans-serif",
                  padding: 0,
                  outline: 'none',
                }}
              />
            </div>
          );
        })}
      </div>

      {hasAny && (
        <Card className="fade-up-3">
          <div
            style={{
              fontSize: 12,
              color: T.textMuted,
              marginBottom: 10,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '.06em',
            }}
          >
            Standards reference (Women's SCY 2025-26)
          </div>
          {events
            .filter((ev) => (student.swimTimes || {})[ev])
            .map((ev) => {
              const s = SWIM_STANDARDS[ev];
              const t = (student.swimTimes || {})[ev];
              const tier = getTier(ev, t);
              return (
                <div
                  key={ev}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '7px 0',
                    borderBottom: `1px solid ${T.navyBorder}`,
                  }}
                >
                  <div
                    style={{
                      width: 80,
                      fontSize: 11,
                      color: T.textSecondary,
                      flexShrink: 0,
                    }}
                  >
                    {ev}
                  </div>
                  <div
                    style={{
                      flex: 1,
                      fontFamily: "'Clash Display', sans-serif",
                      fontSize: 14,
                      fontWeight: 600,
                      color: tier?.color || T.textPrimary,
                    }}
                  >
                    {t}
                  </div>
                  {tier && <Badge color={tier.color}>{tier.label}</Badge>}
                  <div
                    style={{ fontSize: 10, color: T.textMuted, flexShrink: 0 }}
                  >
                    B: {s.d1B}
                  </div>
                </div>
              );
            })}
        </Card>
      )}
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────
const STORAGE_KEY = 'laneup_v2';
const EP = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  highSchool: '',
  hsState: '',
  graduationYear: '2027',
  gpa: '',
  satScore: '',
  actScore: '',
  ethnicity: '',
  parentsOrigin: '',
  nativeLanguages: ['English'],
  additionalLanguages: [],
  swimLevel: 'Club swimmer',
  swimEvents: [],
  swimTimes: {},
  swimPercentile: '',
  majorInterests: ['Business / Management', 'International Relations'],
  locationPref: 'anywhere',
  maxTuition: '',
  needScholarship: false,
  needAthletic: false,
  latinCommunityPref: false,
  bilingualPref: false,
  latinStudiesPref: false,
  volunteerHours: '',
  leadershipDescription: '',
  researchDescription: '',
};

export default function LaneUp() {
  const [screen, setScreen] = useState('splash'); // splash | sport | app
  const [sport, setSport] = useState('');
  const [tab, setTab] = useState('home');
  const [student, setStudent] = useState(EP);
  const [saved, setSaved] = useState([]);
  const [fups, setFups] = useState({});
  const [notes, setNotes] = useState({});
  const [customEvents, setCustomEvents] = useState([]);
  const [savedMsg, setSavedMsg] = useState(false);

  useEffect(() => {
    try {
      const d = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      if (d.student) setStudent(d.student);
      if (d.saved) setSaved(d.saved);
      if (d.fups) setFups(d.fups);
      if (d.notes) setNotes(d.notes);
      if (d.customEvents) setCustomEvents(d.customEvents);
      if (d.sport) {
        setSport(d.sport);
        setScreen('app');
      } else if (d.seenSplash) setScreen('sport');
    } catch (e) {}
  }, []);

  function persist(ns, nsa, nf, nn, nce, nsp) {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          student: ns || student,
          saved: nsa || saved,
          fups: nf || fups,
          notes: nn || notes,
          customEvents: nce || customEvents,
          sport: nsp !== undefined ? nsp : sport,
          seenSplash: true,
        })
      );
    } catch (e) {}
  }

  function updS(k, v) {
    const ns = { ...student, [k]: v };
    setStudent(ns);
    persist(ns);
  }
  function togArr(k, v) {
    const a = student[k] || [];
    const ns = {
      ...student,
      [k]: a.includes(v) ? a.filter((x) => x !== v) : [...a, v],
    };
    setStudent(ns);
    persist(ns);
  }
  function togSave(id) {
    const ns = saved.includes(id)
      ? saved.filter((x) => x !== id)
      : [...saved, id];
    setSaved(ns);
    persist(null, ns);
  }
  function addFup(id, type) {
    const k = `${id}`,
      ex = fups[k] || [],
      nf = {
        ...fups,
        [k]: [
          ...ex,
          { type, date: new Date().toLocaleDateString(), done: false },
        ],
      };
    setFups(nf);
    persist(null, null, nf);
  }
  function togFup(id, i) {
    const k = `${id}`,
      a = (fups[k] || []).map((f, j) =>
        j === i ? { ...f, done: !f.done } : f
      ),
      nf = { ...fups, [k]: a };
    setFups(nf);
    persist(null, null, nf);
  }
  function remFup(id, i) {
    const k = `${id}`,
      a = (fups[k] || []).filter((_, j) => j !== i),
      nf = { ...fups, [k]: a };
    setFups(nf);
    persist(null, null, nf);
  }
  function updNote(id, v) {
    const nn = { ...notes, [`${id}`]: v };
    setNotes(nn);
    persist(null, null, null, nn);
  }
  function doSave() {
    persist(student, saved, fups, notes, customEvents, sport);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  }
  function selectSport(s) {
    setSport(s);
    setScreen('app');
    persist(null, null, null, null, null, s);
  }

  const savedUnis = UNIVERSITIES.filter((u) => saved.includes(u.id)).map(
    (u) => ({ ...u, ms: calcMatch(student, u) })
  );

  if (screen === 'splash')
    return (
      <>
        <GlobalStyle />
        <SplashScreen
          onContinue={() => {
            persist();
            setScreen('sport');
          }}
        />
      </>
    );
  if (screen === 'sport')
    return (
      <>
        <GlobalStyle />
        <SportSelector onSelect={selectSport} />
      </>
    );

  return (
    <>
      <GlobalStyle />
      <div
        style={{
          maxWidth: 480,
          margin: '0 auto',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          background: T.navy,
        }}
      >
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {tab === 'home' && (
            <HomeTab
              student={student}
              savedUnis={savedUnis}
              fups={fups}
              sport={sport}
              setTab={setTab}
              customEvents={customEvents}
            />
          )}
          {tab === 'search' && (
            <SearchTab
              student={student}
              saved={saved}
              togSave={togSave}
              fups={fups}
              addFup={addFup}
              notes={notes}
              updNote={updNote}
            />
          )}
          {tab === 'tracker' && (
            <TrackerTab
              savedUnis={savedUnis}
              fups={fups}
              addFup={addFup}
              togFup={togFup}
              remFup={remFup}
              notes={notes}
            />
          )}
          {tab === 'times' && <TimesTab student={student} updS={updS} />}
          {tab === 'profile' && (
            <ProfileTab
              student={student}
              updS={updS}
              togArr={togArr}
              doSave={doSave}
              savedMsg={savedMsg}
              sport={sport}
              setSport={(s) => {
                setSport(s);
                persist(null, null, null, null, null, s);
              }}
            />
          )}
        </div>
        <BottomNav tab={tab} setTab={setTab} />
      </div>
    </>
  );
}
