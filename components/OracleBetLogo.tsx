type Props = {
  className?: string
  size?: number
}

export default function OracleBetLogo({
  className = "",
  size = 44,
}: Props) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M32 4L55 17V45L32 60L9 45V17L32 4Z"
        className="fill-slate-950/90 stroke-slate-50/90"
        strokeWidth="2.2"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M32 10L50 20V42L32 54L14 42V20L32 10Z"
        className="stroke-orange-300"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
      <ellipse
        cx="32"
        cy="18"
        rx="11"
        ry="4.2"
        className="fill-slate-950 stroke-slate-100/80"
        strokeWidth="1.4"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M24 18.5C24 13.2 27.5 9.5 32 9.5C36.5 9.5 40 13.2 40 18.5V26H24V18.5Z"
        className="fill-slate-950 stroke-slate-100/80"
        strokeWidth="1.4"
        vectorEffect="non-scaling-stroke"
      />
      <circle
        cx="32"
        cy="33"
        r="9.5"
        className="fill-white stroke-slate-950"
        strokeWidth="1.8"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M32 27.6L35.8 30.3L34.4 34.8H29.6L28.2 30.3L32 27.6Z"
        className="fill-slate-950"
      />
      <path
        d="M32 27.6V23.8M35.8 30.3L39.8 29.4M34.4 34.8L37.2 38M29.6 34.8L26.8 38M28.2 30.3L24.2 29.4"
        className="stroke-slate-950"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M18 46.5H46"
        className="stroke-slate-50/70"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}
