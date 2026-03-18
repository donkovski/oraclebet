type Props = {
  country: string
}

function normalizeCountry(country: string) {
  return country
    .trim()
    .toLowerCase()
    .replace(/[.'’]/g, "")
    .replace(/\s+/g, " ")
}

function flagBase(className = "") {
  return `inline-flex h-4 w-6 overflow-hidden rounded-[3px] border border-white/15 shadow-[0_0_10px_rgba(15,23,42,0.18)] ${className}`.trim()
}

function registerAliases(map: Map<string, string>, code: string, aliases: string[]) {
  for (const alias of aliases) {
    map.set(normalizeCountry(alias), code)
  }
}

const COUNTRY_CODE_MAP = new Map<string, string>()

registerAliases(COUNTRY_CODE_MAP, "al", ["Албания", "Albania"])
registerAliases(COUNTRY_CODE_MAP, "ad", ["Андора", "Andorra"])
registerAliases(COUNTRY_CODE_MAP, "am", ["Армения", "Armenia"])
registerAliases(COUNTRY_CODE_MAP, "at", ["Австрия", "Austria"])
registerAliases(COUNTRY_CODE_MAP, "az", ["Азербайджан", "Azerbaijan"])
registerAliases(COUNTRY_CODE_MAP, "by", ["Беларус", "Belarus"])
registerAliases(COUNTRY_CODE_MAP, "be", ["Белгия", "Belgium"])
registerAliases(COUNTRY_CODE_MAP, "ba", ["Босна и Херцеговина", "Bosnia and Herzegovina"])
registerAliases(COUNTRY_CODE_MAP, "bg", ["България", "Bulgaria"])
registerAliases(COUNTRY_CODE_MAP, "hr", ["Хърватия", "Croatia"])
registerAliases(COUNTRY_CODE_MAP, "cy", ["Кипър", "Cyprus"])
registerAliases(COUNTRY_CODE_MAP, "cz", ["Чехия", "Czechia", "Czech Republic"])
registerAliases(COUNTRY_CODE_MAP, "dk", ["Дания", "Denmark"])
registerAliases(COUNTRY_CODE_MAP, "ee", ["Естония", "Estonia"])
registerAliases(COUNTRY_CODE_MAP, "fi", ["Финландия", "Finland"])
registerAliases(COUNTRY_CODE_MAP, "fr", ["Франция", "France"])
registerAliases(COUNTRY_CODE_MAP, "ge", ["Грузия", "Georgia"])
registerAliases(COUNTRY_CODE_MAP, "de", ["Германия", "Germany"])
registerAliases(COUNTRY_CODE_MAP, "gr", ["Гърция", "Greece"])
registerAliases(COUNTRY_CODE_MAP, "hu", ["Унгария", "Hungary"])
registerAliases(COUNTRY_CODE_MAP, "is", ["Исландия", "Iceland"])
registerAliases(COUNTRY_CODE_MAP, "ie", ["Ирландия", "Ireland"])
registerAliases(COUNTRY_CODE_MAP, "it", ["Италия", "Italy"])
registerAliases(COUNTRY_CODE_MAP, "xk", ["Косово", "Kosovo"])
registerAliases(COUNTRY_CODE_MAP, "lv", ["Латвия", "Latvia"])
registerAliases(COUNTRY_CODE_MAP, "li", ["Лихтенщайн", "Liechtenstein"])
registerAliases(COUNTRY_CODE_MAP, "lt", ["Литва", "Lithuania"])
registerAliases(COUNTRY_CODE_MAP, "lu", ["Люксембург", "Luxembourg"])
registerAliases(COUNTRY_CODE_MAP, "mt", ["Малта", "Malta"])
registerAliases(COUNTRY_CODE_MAP, "md", ["Молдова", "Moldova"])
registerAliases(COUNTRY_CODE_MAP, "mc", ["Монако", "Monaco"])
registerAliases(COUNTRY_CODE_MAP, "me", ["Черна гора", "Montenegro"])
registerAliases(COUNTRY_CODE_MAP, "nl", ["Нидерландия", "Нидерланды", "Холандия", "Netherlands", "Holland"])
registerAliases(COUNTRY_CODE_MAP, "mk", ["Северна Македония", "North Macedonia", "Macedonia"])
registerAliases(COUNTRY_CODE_MAP, "no", ["Норвегия", "Norway"])
registerAliases(COUNTRY_CODE_MAP, "pl", ["Полша", "Poland"])
registerAliases(COUNTRY_CODE_MAP, "pt", ["Португалия", "Portugal"])
registerAliases(COUNTRY_CODE_MAP, "ro", ["Румъния", "Romania"])
registerAliases(COUNTRY_CODE_MAP, "ru", ["Русия", "Russia"])
registerAliases(COUNTRY_CODE_MAP, "sm", ["Сан Марино", "San Marino"])
registerAliases(COUNTRY_CODE_MAP, "rs", ["Сърбия", "Serbia"])
registerAliases(COUNTRY_CODE_MAP, "sk", ["Словакия", "Slovakia"])
registerAliases(COUNTRY_CODE_MAP, "si", ["Словения", "Slovenia"])
registerAliases(COUNTRY_CODE_MAP, "es", ["Испания", "Spain"])
registerAliases(COUNTRY_CODE_MAP, "se", ["Швеция", "Sweden"])
registerAliases(COUNTRY_CODE_MAP, "ch", ["Швейцария", "Switzerland", "Swiss"])
registerAliases(COUNTRY_CODE_MAP, "tr", ["Турция", "Turkey"])
registerAliases(COUNTRY_CODE_MAP, "ua", ["Украйна", "Ukraine"])
registerAliases(COUNTRY_CODE_MAP, "va", ["Ватикан", "Vatican", "Vatican City"])

registerAliases(COUNTRY_CODE_MAP, "ag", ["Антигуа и Барбуда", "Antigua and Barbuda"])
registerAliases(COUNTRY_CODE_MAP, "bs", ["Бахами", "Bahamas"])
registerAliases(COUNTRY_CODE_MAP, "bb", ["Барбадос", "Barbados"])
registerAliases(COUNTRY_CODE_MAP, "bz", ["Белиз", "Belize"])
registerAliases(COUNTRY_CODE_MAP, "ca", ["Канада", "Canada"])
registerAliases(COUNTRY_CODE_MAP, "cr", ["Коста Рика", "Costa Rica"])
registerAliases(COUNTRY_CODE_MAP, "cu", ["Куба", "Cuba"])
registerAliases(COUNTRY_CODE_MAP, "dm", ["Доминика", "Dominica"])
registerAliases(COUNTRY_CODE_MAP, "do", ["Доминиканска република", "Dominican Republic"])
registerAliases(COUNTRY_CODE_MAP, "sv", ["Салвадор", "Ел Салвадор", "El Salvador"])
registerAliases(COUNTRY_CODE_MAP, "gd", ["Гренада", "Grenada"])
registerAliases(COUNTRY_CODE_MAP, "gt", ["Гватемала", "Guatemala"])
registerAliases(COUNTRY_CODE_MAP, "ht", ["Хаити", "Haiti"])
registerAliases(COUNTRY_CODE_MAP, "hn", ["Хондурас", "Honduras"])
registerAliases(COUNTRY_CODE_MAP, "jm", ["Ямайка", "Jamaica"])
registerAliases(COUNTRY_CODE_MAP, "mx", ["Мексико", "Mexico"])
registerAliases(COUNTRY_CODE_MAP, "ni", ["Никарагуа", "Nicaragua"])
registerAliases(COUNTRY_CODE_MAP, "pa", ["Панама", "Panama"])
registerAliases(COUNTRY_CODE_MAP, "kn", ["Сейнт Китс и Невис", "Saint Kitts and Nevis"])
registerAliases(COUNTRY_CODE_MAP, "lc", ["Сейнт Лусия", "Saint Lucia"])
registerAliases(COUNTRY_CODE_MAP, "vc", ["Сейнт Винсент и Гренадини", "Saint Vincent and the Grenadines"])
registerAliases(COUNTRY_CODE_MAP, "tt", ["Тринидад и Тобаго", "Trinidad and Tobago"])
registerAliases(COUNTRY_CODE_MAP, "us", ["САЩ", "Съединени американски щати", "USA", "United States", "United States of America"])

registerAliases(COUNTRY_CODE_MAP, "ar", ["Аржентина", "Argentina"])
registerAliases(COUNTRY_CODE_MAP, "bo", ["Боливия", "Bolivia"])
registerAliases(COUNTRY_CODE_MAP, "br", ["Бразилия", "Brazil"])
registerAliases(COUNTRY_CODE_MAP, "cl", ["Чили", "Chile"])
registerAliases(COUNTRY_CODE_MAP, "co", ["Колумбия", "Colombia"])
registerAliases(COUNTRY_CODE_MAP, "ec", ["Еквадор", "Ecuador"])
registerAliases(COUNTRY_CODE_MAP, "gy", ["Гвиана", "Guyana"])
registerAliases(COUNTRY_CODE_MAP, "py", ["Парагвай", "Paraguay"])
registerAliases(COUNTRY_CODE_MAP, "pe", ["Перу", "Peru"])
registerAliases(COUNTRY_CODE_MAP, "sr", ["Суринам", "Suriname"])
registerAliases(COUNTRY_CODE_MAP, "uy", ["Уругвай", "Uruguay"])
registerAliases(COUNTRY_CODE_MAP, "ve", ["Венецуела", "Venezuela"])

function EnglandFlag() {
  return (
    <span className={flagBase("relative bg-white")}>
      <span className="absolute left-1/2 top-0 h-full w-[4px] -translate-x-1/2 bg-red-600" />
      <span className="absolute left-0 top-1/2 h-[4px] w-full -translate-y-1/2 bg-red-600" />
    </span>
  )
}

function EuropeFlag() {
  const stars = Array.from({ length: 12 }, (_, index) => {
    const angle = ((index * 30 - 90) * Math.PI) / 180
    const x = 30 + Math.cos(angle) * 11
    const y = 20 + Math.sin(angle) * 11

    return { x, y }
  })

  return (
    <span className={flagBase("bg-sky-800")}>
      <svg
        aria-hidden="true"
        className="h-full w-full"
        viewBox="0 0 60 40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="60" height="40" fill="#1d4ed8" />
        {stars.map((star, index) => (
          <g key={index} transform={`translate(${star.x} ${star.y}) scale(0.62)`}>
            <path
              d="M0 -4 L1.18 -1.45 L3.95 -1.22 L1.88 0.72 L2.52 3.5 L0 2.08 L-2.52 3.5 L-1.88 0.72 L-3.95 -1.22 L-1.18 -1.45 Z"
              fill="#facc15"
            />
          </g>
        ))}
      </svg>
    </span>
  )
}

function CountryImageFlag({ code, country }: { code: string; country: string }) {
  return (
    <span
      aria-label={`Флаг на ${country}`}
      className={flagBase("bg-cover bg-center bg-no-repeat")}
      role="img"
      style={{ backgroundImage: `url(https://flagcdn.com/${code}.svg)` }}
      title={country}
    />
  )
}

function FallbackFlag({ country }: Props) {
  const label = country
    .split(/[\s-/]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")

  return (
    <span
      className={flagBase("items-center justify-center bg-white/10 text-[9px] font-bold uppercase tracking-[0.08em] text-white/80")}
      title={country}
    >
      {label || "?"}
    </span>
  )
}

export default function CountryFlag({ country }: Props) {
  const normalizedCountry = normalizeCountry(country)

  if (
    normalizedCountry === "англия" ||
    normalizedCountry === "england" ||
    normalizedCountry === "великобритания" ||
    normalizedCountry === "united kingdom"
  ) {
    return <EnglandFlag />
  }

  if (
    normalizedCountry === "европа" ||
    normalizedCountry === "europe" ||
    normalizedCountry === "european union" ||
    normalizedCountry === "eu"
  ) {
    return <EuropeFlag />
  }

  const code = COUNTRY_CODE_MAP.get(normalizedCountry)

  if (code) {
    return <CountryImageFlag code={code} country={country} />
  }

  return <FallbackFlag country={country} />
}
