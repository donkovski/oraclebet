type Props = {
  className?: string
}

export default function OracleBetWatermark({ className = "" }: Props) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 640 640"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M320 44L534 158V430L320 580L106 430V158L320 44Z"
        stroke="currentColor"
        strokeWidth="18"
      />
      <path
        d="M320 78L500 174V414L320 540L140 414V174L320 78Z"
        stroke="#F59E0B"
        strokeWidth="10"
      />
      <ellipse cx="320" cy="126" rx="84" ry="28" fill="currentColor" />
      <path
        d="M254 128C254 86 283 60 320 60C357 60 386 86 386 128V198H254V128Z"
        fill="currentColor"
      />
      <path
        d="M214 242C244 204 282 186 320 186C358 186 396 204 426 242L468 332H172L214 242Z"
        fill="currentColor"
      />
      <circle cx="320" cy="282" r="54" fill="white" />
      <circle cx="320" cy="282" r="18" fill="currentColor" />
      <path
        d="M302 252L338 252L352 282L338 312H302L288 282L302 252Z"
        stroke="currentColor"
        strokeWidth="8"
        fill="none"
      />
      <rect x="86" y="322" width="468" height="92" rx="20" fill="currentColor" />
      <text
        x="120"
        y="388"
        fill="white"
        fontFamily="Arial, sans-serif"
        fontSize="64"
        fontWeight="900"
        letterSpacing="1.5"
      >
        ORACLE
      </text>
      <text
        x="412"
        y="388"
        fill="#F59E0B"
        fontFamily="Arial, sans-serif"
        fontSize="64"
        fontWeight="900"
        letterSpacing="1.5"
      >
        BET
      </text>
      <rect x="242" y="386" width="156" height="58" rx="18" fill="currentColor" />
      <text
        x="281"
        y="426"
        fill="white"
        fontFamily="Arial, sans-serif"
        fontSize="34"
        fontWeight="800"
        letterSpacing="1.5"
      >
        .EU
      </text>
      <path
        d="M246 490L255 515L282 515L260 531L268 556L246 540L224 556L232 531L210 515L237 515L246 490Z"
        fill="#F59E0B"
      />
      <path
        d="M320 480L330 507L359 507L336 524L345 552L320 535L295 552L304 524L281 507L310 507L320 480Z"
        fill="#D97706"
      />
      <path
        d="M394 490L403 515L430 515L408 531L416 556L394 540L372 556L380 531L358 515L385 515L394 490Z"
        fill="#F59E0B"
      />
    </svg>
  )
}
