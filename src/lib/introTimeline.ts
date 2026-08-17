export const INTRO_TIMELINE = {
  duration: 15,
  firstWeld: 1.5,
  logoForgeStart: 1.5,
  logoForgeEnd: 4.35,
  northImpact: 4.52,
  engineeringStart: 5.05,
  technicalStart: 7.5,
  technicalPeak: 9.86,
  finalBuild: 12,
  finalWeld: 12.86,
  heroStart: 13.5,
  audioFadeStart: 14.45,
} as const

export const clamp01 = (value: number) => Math.max(0, Math.min(1, value))
export const range = (time: number, start: number, end: number) => clamp01((time - start) / (end - start))
export const pulse = (time: number, center: number, radius: number) => clamp01(1 - Math.abs(time - center) / radius)
