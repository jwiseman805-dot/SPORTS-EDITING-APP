export default function SportIcon({ sport, size = 18 }: { sport: string; size?: number }) {
  const p = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "shrink-0",
  };

  switch (sport) {
    case "football":
      return (
        <svg {...p}>
          <ellipse cx="12" cy="12" rx="8" ry="5" transform="rotate(-20 12 12)" />
          <path d="M10.5 11.5h3M10.5 13h3" strokeWidth={1.25} />
          <path d="M12 8.5v7" strokeWidth={1.25} />
        </svg>
      );
    case "basketball":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="8" />
          <path d="M4 12h16" />
          <path d="M12 4c3 2.5 3 13.5 0 16" />
          <path d="M12 4c-3 2.5-3 13.5 0 16" />
        </svg>
      );
    case "soccer":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 7.5l1.9 2.7H17L14.8 12l1 3.2L12 13.4l-3.8 1.8 1-3.2L7 10.2h3.1z" />
        </svg>
      );
    case "baseball":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 4c-1 2-1 14 0 16M12 4c1 2 1 14 0 16" />
          <path d="M7.5 8c1 .5 2 .5 2.5 0M16.5 8c-1 .5-2 .5-2.5 0M7.5 16c1-.5 2-.5 2.5 0M16.5 16c-1-.5-2-.5-2.5 0" strokeWidth={1} />
        </svg>
      );
    case "hockey":
      return (
        <svg {...p}>
          <path d="M7 4v12" />
          <path d="M7 16c2 3 6 3.5 8 1.5s1.5-5.5-2-5.5" />
          <ellipse cx="16" cy="18" rx="2.5" ry="1" />
        </svg>
      );
    case "tennis":
      return (
        <svg {...p}>
          <ellipse cx="12" cy="9.5" rx="5" ry="7" />
          <path d="M12 16.5v3M10 19.5h4" />
          <path d="M7 9.5h10M12 3v13" strokeWidth={1.25} />
        </svg>
      );
    case "mma":
      return (
        <svg {...p}>
          <path d="M7 9.5V8a2 2 0 0 1 4 0v1.5" />
          <path d="M13 9.5V8a2 2 0 0 1 4 0v1.5" />
          <rect x="5" y="9.5" width="6" height="5" rx="2.5" />
          <rect x="13" y="9.5" width="6" height="5" rx="2.5" />
          <path d="M11 12h2" strokeWidth={1.25} />
        </svg>
      );
    case "olympics":
      return (
        <svg {...p}>
          <circle cx="12" cy="8" r="4" />
          <path d="M9 12l-3 7M15 12l3 7" />
          <path d="M6 19h12" />
          <path d="M10 4l-1.5-2M14 4l1.5-2" strokeWidth={1.25} />
        </svg>
      );
    case "motorsport":
      return (
        <svg {...p}>
          <path d="M2 13h3l1.5-4h11L19 13h3" />
          <path d="M5 13v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2" />
          <circle cx="8" cy="16" r="1.5" fill="currentColor" strokeWidth={0} />
          <circle cx="16" cy="16" r="1.5" fill="currentColor" strokeWidth={0} />
          <path d="M10 9h4M10.5 7h3" />
        </svg>
      );
    case "esports":
      return (
        <svg {...p}>
          <rect x="2" y="7" width="20" height="11" rx="2.5" />
          <path d="M8 13v-2M7 12h2" />
          <circle cx="14.5" cy="11.5" r="0.75" fill="currentColor" strokeWidth={0} />
          <circle cx="16.5" cy="13" r="0.75" fill="currentColor" strokeWidth={0} />
          <circle cx="14.5" cy="14.5" r="0.75" fill="currentColor" strokeWidth={0} />
          <circle cx="12.5" cy="13" r="0.75" fill="currentColor" strokeWidth={0} />
        </svg>
      );
    default:
      return (
        <svg {...p}>
          <path d="M8 21h8M12 17v4" />
          <path d="M5 3h14v8.5a7 7 0 0 1-14 0V3z" />
          <path d="M5 6H3a2 2 0 0 0 0 4h2M19 6h2a2 2 0 0 1 0 4h-2" />
        </svg>
      );
  }
}
