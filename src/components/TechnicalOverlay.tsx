export function TechnicalOverlay() {
  return (
    <svg className="technical-overlay" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <pattern id="grid" width="44" height="44" patternUnits="userSpaceOnUse"><path d="M44 0H0V44" /></pattern>
      </defs>
      <rect width="1600" height="900" fill="url(#grid)" className="technical-overlay__grid" />
      <g className="technical-overlay__structure">
        <path d="M506 58V824M682 0V844M1020 0V900M1255 0V900M1545 0V900" />
        <path d="M450 116H1600M390 304H1600M320 496H1600M0 726H1600" />
        <path d="M680 304L1020 496M1020 304L1255 496M1255 304L1545 496" />
      </g>
      <g className="technical-overlay__dims">
        <path d="M506 845H1020M506 830v30M1020 830v30" /><text x="735" y="872">5140 mm</text>
        <path d="M1280 116V496M1265 116h30M1265 496h30" /><text x="1308" y="315" transform="rotate(90 1308 315)">EL. +08.450</text>
        <circle cx="682" cy="304" r="7" /><circle cx="1020" cy="496" r="7" /><circle cx="1255" cy="304" r="7" />
        <text x="696" y="290">N-14 / M24</text><text x="1035" y="482">C-07</text><text x="1272" y="290">AXIS 04</text>
      </g>
    </svg>
  )
}
