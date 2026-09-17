/**
 * Kumpulan ikon garis sederhana (stroke based) supaya konsisten dan ringan.
 * Dipakai lewat <Icon name="cart" />.
 */
const icons = {
  cup: (
    <>
      <path d="M4 9.5h11.5v5.2A4.3 4.3 0 0 1 11.2 19H8.3A4.3 4.3 0 0 1 4 14.7V9.5z" />
      <path d="M15.5 10.8h1.6a2.6 2.6 0 0 1 0 5.2h-1.6" />
      <path d="M7.6 6.4c.7-.8.7-1.6 0-2.4" />
      <path d="M11.6 6.4c.7-.8.7-1.6 0-2.4" />
    </>
  ),
  bean: (
    <>
      <ellipse cx="12" cy="12" rx="8.2" ry="5.4" transform="rotate(-32 12 12)" />
      <path d="M7.6 16.1c1.7-1.5 2-3.2 4.3-4.5 2.2-1.2 4.2-.5 5.3-2.3" />
    </>
  ),
  sofa: (
    <>
      <path d="M5.2 12.4V9.3A3.1 3.1 0 0 1 8.3 6.2h7.4A3.1 3.1 0 0 1 18.8 9.3v3.1" />
      <path d="M3.6 13.3a1.9 1.9 0 0 1 3.4-1l.5.9h9l.5-.9a1.9 1.9 0 0 1 3.4 1v3.4a1.5 1.5 0 0 1-1.5 1.5H5.1a1.5 1.5 0 0 1-1.5-1.5v-3.4z" />
    </>
  ),
  spoon: (
    <>
      <path d="M8.5 3.2v5.6a2.1 2.1 0 0 0 4.2 0V3.2" />
      <path d="M10.6 11v9.8" />
      <path d="M17.6 3.4c1.5.5 2.4 1.9 2.4 3.5 0 1.5-.9 2.7-2.4 3.1v10.8" />
    </>
  ),
  cart: (
    <>
      <path d="M6.2 8h11.6l.9 11a1.8 1.8 0 0 1-1.8 2H7.1a1.8 1.8 0 0 1-1.8-2l.9-11z" />
      <path d="M9.3 8V6.7a2.7 2.7 0 0 1 5.4 0V8" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.2" />
      <path d="m20 20-3.6-3.6" />
    </>
  ),
  close: <path d="M6 6l12 12M18 6 6 18" />,
  plus: <path d="M12 5.5v13M5.5 12h13" />,
  minus: <path d="M5.5 12h13" />,
  map: (
    <>
      <path d="M12 21s6.4-5.3 6.4-10.2A6.4 6.4 0 0 0 5.6 10.8C5.6 15.7 12 21 12 21z" />
      <circle cx="12" cy="10.6" r="2.3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M12 7.4V12l3.1 2" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2.6" />
      <path d="m4.5 7.6 7.5 5.2 7.5-5.2" />
    </>
  ),
  arrowRight: (
    <>
      <path d="M4.5 12h14.5" />
      <path d="m13.2 6.2 6 5.8-6 5.8" />
    </>
  ),
  arrowUp: (
    <>
      <path d="M12 19.5V4.8" />
      <path d="m6.2 10.6 5.8-6 5.8 6" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  chevronDown: <path d="m6.5 9.5 5.5 5.5 5.5-5.5" />,
  chevronRight: <path d="m9.5 6.5 5.5 5.5-5.5 5.5" />,
  trash: (
    <>
      <path d="M4.8 7.2h14.4" />
      <path d="M9.6 7.2V5.8A1.6 1.6 0 0 1 11.2 4.2h1.6a1.6 1.6 0 0 1 1.6 1.6v1.4" />
      <path d="M6.9 7.2l.9 12a1.6 1.6 0 0 0 1.6 1.5h5.2a1.6 1.6 0 0 0 1.6-1.5l.9-12" />
    </>
  ),
  check: <path d="m5 12.6 4.4 4.4L19 7.4" />,
  sparkle: (
    <>
      <path d="M12 3.6l1.7 4.7 4.7 1.7-4.7 1.7L12 16.4l-1.7-4.7L5.6 10l4.7-1.7L12 3.6z" />
      <path d="M18.6 16.2l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7.7-1.9z" />
    </>
  ),
  users: (
    <>
      <circle cx="9.2" cy="8.8" r="3.2" />
      <path d="M3.8 19.4a5.4 5.4 0 0 1 10.8 0" />
      <path d="M16.2 6.3a3.2 3.2 0 0 1 0 6.1" />
      <path d="M17.6 19.4c0-1.5-.5-2.9-1.4-4" />
    </>
  ),
  heart: (
    <path d="M12 19.8s-7-4.2-7-9.1a4.1 4.1 0 0 1 7-2.9 4.1 4.1 0 0 1 7 2.9c0 4.9-7 9.1-7 9.1z" />
  ),
  star: (
    <path
      fill="currentColor"
      stroke="none"
      d="M12 3.7l2.6 5.2 5.8.8-4.2 4.1 1 5.7-5.2-2.7-5.2 2.7 1-5.7-4.2-4.1 5.8-.8L12 3.7z"
    />
  ),
  leaf: (
    <>
      <path d="M20 4.2C10.8 4.2 5.4 7.6 5.4 13.4c0 3.7 2.6 6.3 6.2 6.3C17.4 19.7 20 12.4 20 4.2z" />
      <path d="M8.6 18.6C8 15.4 8.9 11.4 11.6 7.6" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.6" y="3.6" width="16.8" height="16.8" rx="5" />
      <circle cx="12" cy="12" r="3.9" />
      <circle cx="16.9" cy="7.1" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M12 3.4a8.6 8.6 0 0 0-7.3 13.1L3.4 20.6l4.2-1.2A8.6 8.6 0 1 0 12 3.4z" />
      <path d="M9.5 8.6c-.5.2-.8.8-.6 1.4.6 2.4 2.7 4.5 5.1 5.1.6.2 1.2-.1 1.4-.6l.3-.9c.1-.4-.1-.8-.4-1l-.9-.5c-.3-.2-.7-.1-.9.2l-.3.4a5.6 5.6 0 0 1-2.2-2.2l.4-.3c.3-.2.4-.6.2-.9l-.5-.9c-.2-.3-.6-.5-1-.4l-.6.1z" />
    </>
  ),
  filter: <path d="M4 6.5h16M7 12h10M10 17.5h4" />,
  grid: (
    <>
      <rect x="3.8" y="3.8" width="7" height="7" rx="2" />
      <rect x="13.2" y="3.8" width="7" height="7" rx="2" />
      <rect x="3.8" y="13.2" width="7" height="7" rx="2" />
      <rect x="13.2" y="13.2" width="7" height="7" rx="2" />
    </>
  ),
  wifi: (
    <>
      <path d="M4 9.4a12 12 0 0 1 16 0" />
      <path d="M7 12.8a7.6 7.6 0 0 1 10 0" />
      <path d="M10 16.2a3.2 3.2 0 0 1 4 0" />
      <circle cx="12" cy="19.4" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
};

export default function Icon({ name, className = "h-5 w-5", strokeWidth = 1.7 }) {
  const node = icons[name];
  if (!node) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {node}
    </svg>
  );
}

export const iconNames = Object.keys(icons);
