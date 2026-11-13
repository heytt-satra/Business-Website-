import { useId, type CSSProperties } from "react";

export default function Visual({
  kind = "fusion",
  color = "#88baff",
  className = "",
}: {
  kind?: string;
  color?: string;
  className?: string;
}) {
  const gradientId = useId().replace(/:/g, "");
  if (kind === "orbital")
    return (
      <div
        className={`visual orbital-art ${className}`}
        role="img"
        aria-label="AI-generated concept rendering of orbital infrastructure"
      />
    );
  return (
    <div
      className={`visual visual-${kind} ${className}`}
      style={{ "--art-color": color } as CSSProperties}
    >
      <svg viewBox="0 0 600 420" fill="none" aria-hidden="true">
        <defs>
          <radialGradient id={gradientId}>
            <stop stopColor="currentColor" stopOpacity=".2" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="300" cy="210" r="220" fill={`url(#${gradientId})`} />
        <g stroke="currentColor">
          {kind === "fusion" && (
            <g transform="translate(300 210) rotate(-24)">
              {Array.from({ length: 28 }, (_, i) => (
                <ellipse
                  key={i}
                  rx="145"
                  ry="58"
                  transform={`rotate(${i * 6.43})`}
                  opacity={0.15 + i / 70}
                  strokeWidth={i % 5 === 0 ? 2 : 0.7}
                />
              ))}
              <ellipse rx="157" ry="157" strokeDasharray="2 12" />
              <ellipse rx="118" ry="118" opacity=".35" />
              <ellipse rx="71" ry="71" strokeWidth="2" />
              <path d="M-205 0H-165M165 0H205M0-205V-165M0 165V205" />
            </g>
          )}
          {kind === "silicon" && (
            <g transform="translate(300 215) rotate(-28) skewX(12)">
              {[155, 135, 115, 95, 75].map((n, i) => (
                <rect
                  key={n}
                  x={-n}
                  y={-n * 0.68}
                  width={n * 2}
                  height={n * 1.36}
                  opacity={0.18 + i * 0.15}
                  strokeWidth={i === 4 ? 3 : 1}
                />
              ))}
              {Array.from({ length: 17 }, (_, i) => (
                <g key={i} opacity=".5">
                  <path
                    d={`M${-128 + i * 16} -110v-38m0 258v38M-160 ${-80 + i * 10}h-40m360 0h40`}
                  />
                  <path
                    d={`M${-60 + i * 7.5} -40v80M-60 ${-40 + i * 5}h120`}
                    opacity=".4"
                  />
                </g>
              ))}
              <rect
                x="-54"
                y="-34"
                width="108"
                height="68"
                fill="currentColor"
                fillOpacity=".08"
              />
            </g>
          )}
          {kind === "bio" && (
            <g>
              {Array.from({ length: 23 }, (_, i) => {
                const y = 32 + i * 16,
                  x = 300 + Math.sin(i * 0.4) * 92,
                  x2 = 600 - x;
                return (
                  <g key={i}>
                    <path d={`M${x} ${y}L${x2} ${y}`} opacity=".3" />
                    <circle cx={x} cy={y} r={5} fill="currentColor" />
                    <circle
                      cx={x2}
                      cy={y}
                      r={5}
                      fill="currentColor"
                      opacity=".5"
                    />
                  </g>
                );
              })}
            </g>
          )}
          {(kind === "intelligence" || kind === "robotics") && (
            <g>
              {Array.from({ length: 6 }, (_, i) =>
                Array.from({ length: 5 }, (_, j) => (
                  <g key={`${i}-${j}`}>
                    <path
                      d={`M${95 + i * 82} ${65 + j * 72}l82 72m-82 0l82-72`}
                      opacity=".12"
                    />
                    <circle
                      cx={95 + i * 82}
                      cy={65 + j * 72}
                      r={kind === "robotics" ? 8 : 3 + i}
                      fill="currentColor"
                      fillOpacity=".15"
                      opacity=".8"
                    />
                  </g>
                )),
              )}
              <path d="M218 138H382V282H218Z" strokeWidth="2" />
              <circle cx="300" cy="210" r="42" strokeDasharray="2 6" />
              <path d="M278 210h44m-22-22v44" />
            </g>
          )}
          {kind === "quantum" && (
            <g transform="translate(300 210)">
              {[0, 60, 120].map((n) => (
                <ellipse
                  key={n}
                  rx="168"
                  ry="64"
                  transform={`rotate(${n})`}
                  strokeWidth="1.5"
                />
              ))}
              {[0, 60, 120, 180, 240, 300].map((n) => (
                <circle
                  key={n}
                  cx={Math.cos((n * Math.PI) / 180) * 168}
                  cy={Math.sin((n * Math.PI) / 180) * 168}
                  r="6"
                  fill="currentColor"
                />
              ))}
              <circle r="15" fill="currentColor" fillOpacity=".4" />
              <circle r="190" strokeDasharray="1 12" opacity=".3" />
            </g>
          )}
          {kind === "propulsion" && (
            <g transform="translate(300 175)">
              <path
                d="M-42-100H42L50-15Q55 45 115 100H-115Q-55 45-50-15Z"
                strokeWidth="2"
              />
              {Array.from({ length: 11 }, (_, i) => (
                <path
                  key={i}
                  d={`M${-40 + i * 8} -100Q${-65 + i * 13} 20 ${-115 + i * 23} 100`}
                  opacity=".35"
                />
              ))}
              <path d="M-115 105H115M-40-75H40M-45-35H45" />
              {Array.from({ length: 9 }, (_, i) => (
                <path
                  key={i}
                  d={`M${-88 + i * 22} 115l${(4 - i) * 10} ${100 - Math.abs(i - 4) * 12}`}
                  opacity=".6"
                />
              ))}
              <path
                d="M-160-100v205m320-205v205"
                strokeDasharray="3 8"
                opacity=".3"
              />
            </g>
          )}
          {kind === "materials" && (
            <g transform="translate(300 205)">
              {Array.from({ length: 7 }, (_, i) => (
                <g key={i} transform={`rotate(${i * 51.42})`}>
                  <path
                    d="M0-160L125-100L155 40L70 150L-75 145L-155 20L-120-110Z"
                    opacity=".3"
                  />
                  <path
                    d="M0-160L70 150L-120-110L155 40L-155 20L125-100L-75 145Z"
                    opacity=".18"
                  />
                  <circle cy="-160" r="4" fill="currentColor" />
                </g>
              ))}
            </g>
          )}
          {kind === "energy" && (
            <g>
              {Array.from({ length: 9 }, (_, i) => (
                <path
                  key={i}
                  d={`M60 ${100 + i * 27}C170 ${20 + i * 27} 190 ${320 - i * 10} 300 ${210 + i * 9}S420 ${40 + i * 23} 540 ${100 + i * 27}`}
                  opacity={0.2 + i * 0.07}
                />
              ))}
              <circle
                cx="300"
                cy="210"
                r="130"
                strokeDasharray="1 10"
                opacity=".4"
              />
            </g>
          )}
          {kind === "human" && (
            <g transform="translate(300 210)">
              <circle cy="-91" r="33" />
              <path
                d="M-72 110L-58-14Q0-65 58-14L72 110M0-45V135M-58-14L-110 77M58-14L110 77"
                strokeWidth="2"
              />
              {[-42, 0, 42].map((x, i) => (
                <circle
                  key={x}
                  cx={x}
                  cy={i === 1 ? 0 : 38}
                  r="8"
                  fill="currentColor"
                  fillOpacity=".4"
                />
              ))}
              <circle r="177" strokeDasharray="3 12" opacity=".5" />
              <path d="M-210 0h40m340 0h40M0-200v30M0 170v30" />
            </g>
          )}
        </g>
        <g fill="currentColor" opacity=".5" fontFamily="monospace" fontSize="9">
          <text x="25" y="30">
            TERA / {kind.toUpperCase()}
          </text>
          <text x="25" y="397">
            CONCEPT DIAGRAM · NOT TO SCALE
          </text>
          <text x="520" y="397">
            FIG. 01
          </text>
        </g>
      </svg>
    </div>
  );
}
