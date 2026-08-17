type BrandMarkProps = { className?: string; compact?: boolean }

export function BrandMark({ className = '', compact = false }: BrandMarkProps) {
  return (
    <div className={`brand-mark ${compact ? 'brand-mark--compact' : ''} ${className}`} aria-label="North Division Engineering Group">
      <img src={`${import.meta.env.BASE_URL}assets/logo-north-division.webp`} alt="" />
      {compact && <span><strong>NORTH DIVISION</strong><small>ENGINEERING GROUP</small></span>}
    </div>
  )
}
