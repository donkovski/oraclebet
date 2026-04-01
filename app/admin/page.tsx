import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { PREDICTION_IMPORT_XML_TEMPLATE } from "@/lib/admin-xml"
import { hasAdminAccess, isAdminAuthenticated, isAdminConfigured } from "@/lib/admin-auth"
import {
  formatKickoffForInput,
  getAdminDailyVisitors,
  getAdminPredictions,
  type AdminPredictionRow,
  type DailyVisitorRow,
} from "@/lib/supabase-admin"
import {
  deletePredictionAction,
  importPredictionXmlAction,
  loginAdminAction,
  logoutAdminAction,
  savePredictionAction,
} from "./actions"

export const metadata: Metadata = {
  title: "Админ панел",
  description: "Вътрешен панел за управление на прогнозите в OracleBet.",
  robots: {
    index: false,
    follow: false,
  },
}

type AdminViewFilter = "current" | "archived"
type AdminSportFilter = "all" | AdminPredictionRow["sport"]

function getStatusClasses(status: AdminPredictionRow["status"]) {
  if (status === "won") {
    return "border-emerald-300/35 bg-emerald-950/65"
  }

  if (status === "lost") {
    return "border-rose-300/35 bg-rose-950/65"
  }

  if (status === "live") {
    return "border-sky-300/35 bg-sky-950/60"
  }

  if (status === "void") {
    return "border-white/15 bg-slate-900/60"
  }

  return "border-white/10 bg-slate-950/20"
}

function getStatusLabel(status: AdminPredictionRow["status"]) {
  switch (status) {
    case "pending":
      return "Чакаща"
    case "live":
      return "Играе се"
    case "won":
      return "Печеливша"
    case "lost":
      return "Губеща"
    case "void":
      return "Void"
    default:
      return status
  }
}

function getSportLabel(sport: AdminPredictionRow["sport"]) {
  switch (sport) {
    case "football":
      return "Футбол"
    case "hockey":
      return "Хокей"
    case "basketball":
      return "Баскетбол"
    case "baseball":
      return "Бейзбол"
    case "tennis":
      return "Тенис"
    default:
      return sport
  }
}

function sortByKickoffAscending(left: AdminPredictionRow, right: AdminPredictionRow) {
  return new Date(left.kickoff).getTime() - new Date(right.kickoff).getTime()
}

function sortByKickoffDescending(left: AdminPredictionRow, right: AdminPredictionRow) {
  return new Date(right.kickoff).getTime() - new Date(left.kickoff).getTime()
}

function buildAdminUrl(view: AdminViewFilter, sport: AdminSportFilter) {
  const params = new URLSearchParams()

  if (view !== "current") {
    params.set("view", view)
  }

  if (sport !== "all") {
    params.set("sport", sport)
  }

  const query = params.toString()

  return query ? `/admin?${query}` : "/admin"
}

function getSelectedView(value?: string): AdminViewFilter {
  return value === "archived" ? "archived" : "current"
}

function getSelectedSport(value?: string): AdminSportFilter {
  switch (value) {
    case "football":
    case "hockey":
    case "basketball":
    case "baseball":
    case "tennis":
      return value
    default:
      return "all"
  }
}

function filterPredictionsBySport(rows: AdminPredictionRow[], sport: AdminSportFilter) {
  if (sport === "all") {
    return rows
  }

  return rows.filter((row) => row.sport === sport)
}

function AdminSetupCard() {
  return (
    <section className="mx-auto max-w-3xl rounded-[28px] border border-amber-300/25 bg-slate-950/30 p-8 backdrop-blur-xl">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-200">
        Админ панел
      </p>
      <h1 className="mt-3 text-4xl font-bold text-white">
        Липсват тайните настройки за админ достъп.
      </h1>
      <div className="mt-6 space-y-4 text-white/75">
        <p>Добави тези променливи локално и във Vercel:</p>
        <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-5 font-mono text-sm text-white/85">
          <p>SUPABASE_SERVICE_ROLE_KEY=...</p>
          <p className="mt-2">ORACLEBET_ADMIN_PASSWORD=...</p>
          <p className="mt-2">ORACLEBET_ADMIN_ACCESS_KEY=...</p>
        </div>
        <p>
          `SUPABASE_SERVICE_ROLE_KEY` е от Supabase в `Project Settings - API`, а
          `ORACLEBET_ADMIN_PASSWORD` и `ORACLEBET_ADMIN_ACCESS_KEY` си ги задаваш ти.
        </p>
      </div>
    </section>
  )
}

function AdminLoginCard({ error }: { error?: string }) {
  return (
    <section className="mx-auto max-w-md rounded-[28px] border border-white/10 bg-slate-950/20 p-8 backdrop-blur-xl">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-200">
        Админ вход
      </p>
      <h1 className="mt-3 text-4xl font-bold text-white">Влез в панела</h1>
      {error && (
        <div className="mt-5 rounded-2xl border border-rose-300/25 bg-rose-950/60 px-4 py-3 text-sm text-rose-100">
          Невалидна парола или неуспешен вход.
        </div>
      )}
      <form action={loginAdminAction} className="mt-6 space-y-4">
        <label className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
            Админ парола
          </span>
          <input
            required
            autoFocus
            type="password"
            name="password"
            className="w-full rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3 text-white outline-none transition focus:border-orange-300/45 focus:bg-slate-950/45"
          />
        </label>

        <button
          type="submit"
          className="w-full rounded-full bg-orange-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-orange-300"
        >
          Вход в админ панела
        </button>
      </form>
    </section>
  )
}

function SummaryCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/18 p-4 text-center backdrop-blur-lg">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">{label}</p>
      <p className="mt-2 text-2xl font-bold text-white">{value}</p>
    </div>
  )
}

function AdminFilterPill({
  href,
  label,
  count,
  active,
}: {
  href: string
  label: string
  count: number
  active: boolean
}) {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
        active
          ? "border-orange-300/45 bg-orange-400 text-slate-950"
          : "border-white/10 bg-white/5 text-white/75 hover:bg-white/10"
      }`}
    >
      <span>{label}</span>
      <span
        className={`rounded-full px-2 py-0.5 text-xs ${
          active ? "bg-slate-950/15 text-slate-950" : "bg-slate-950/45 text-white/75"
        }`}
      >
        {count}
      </span>
    </a>
  )
}

function formatVisitorDate(day: string) {
  return new Intl.DateTimeFormat("bg-BG", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(`${day}T00:00:00`))
}

function formatAdminDateTime(timestamp: string) {
  return new Intl.DateTimeFormat("bg-BG", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Sofia",
  }).format(new Date(timestamp))
}

function getRelativeVisitorDay(offsetDays: number) {
  const date = new Date()
  date.setDate(date.getDate() + offsetDays)

  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Sofia",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date)
}

function VisitorsSection({ rows }: { rows: DailyVisitorRow[] }) {
  const todayKey = getRelativeVisitorDay(0)
  const yesterdayKey = getRelativeVisitorDay(-1)
  const todayVisitors = rows.find((row) => row.day === todayKey)?.visits ?? 0
  const yesterdayVisitors = rows.find((row) => row.day === yesterdayKey)?.visits ?? 0

  return (
    <section className="space-y-4">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/55">
          Посещения
        </p>
        <h2 className="mt-2 text-2xl font-bold text-white">Трафик по дни</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard label="Днес" value={todayVisitors} />
        <SummaryCard label="Вчера" value={yesterdayVisitors} />
        <SummaryCard
          label="Последни 7 дни"
          value={rows.reduce((total, row) => total + row.visits, 0)}
        />
        <SummaryCard label="Отчетени дни" value={rows.length} />
      </div>

      <div className="rounded-[28px] border border-white/10 bg-slate-950/18 p-6 backdrop-blur-xl">
        {rows.length === 0 ? (
          <p className="text-sm leading-7 text-white/70">
            Още няма събрани посещения. След като tracker-ът започне да отчита
            отварянията на сайта, тук ще виждаш дневния брой посетители.
          </p>
        ) : (
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:bg-white/10">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/45">
                  Архив по дни
                </p>
                <p className="mt-1 text-sm text-white/75">
                  Разгъни, за да видиш всички отчетени дни и посещения.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-full border border-white/10 bg-slate-950/45 px-3 py-1 text-sm font-semibold text-white/75">
                  {rows.length}
                </div>
                <span className="text-xl text-white/55 transition group-open:rotate-180">⌄</span>
              </div>
            </summary>

            <div className="mt-4 space-y-3">
              {rows.map((row) => (
                <div
                  key={row.day}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <p className="text-sm font-medium text-white/75">{formatVisitorDate(row.day)}</p>
                  <p className="text-lg font-bold text-white">{row.visits}</p>
                </div>
              ))}
            </div>
          </details>
        )}
      </div>
    </section>
  )
}

function FilterSection({
  currentView,
  currentSport,
  activeCount,
  archivedCount,
  sportCounts,
}: {
  currentView: AdminViewFilter
  currentSport: AdminSportFilter
  activeCount: number
  archivedCount: number
  sportCounts: Record<AdminSportFilter, number>
}) {
  return (
    <section className="rounded-[28px] border border-white/10 bg-slate-950/18 p-6 backdrop-blur-xl md:p-8">
      <div className="space-y-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/55">
            Работен изглед
          </p>
          <h2 className="mt-2 text-2xl font-bold text-white">Бързо разделение на прогнозите</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-white/70">
            Избери дали обработваш текущите или приключените прогнози, а после
            филтрирай по спорт. Така не се рендерират всички редакционни карти наведнъж
            и админът работи по-леко.
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
            Статус
          </p>
          <div className="flex flex-wrap gap-3">
            <AdminFilterPill
              href={buildAdminUrl("current", currentSport)}
              label="Текущи"
              count={activeCount}
              active={currentView === "current"}
            />
            <AdminFilterPill
              href={buildAdminUrl("archived", currentSport)}
              label="Приключени"
              count={archivedCount}
              active={currentView === "archived"}
            />
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
            Спорт
          </p>
          <div className="flex flex-wrap gap-3">
            <AdminFilterPill
              href={buildAdminUrl(currentView, "all")}
              label="Всички"
              count={sportCounts.all}
              active={currentSport === "all"}
            />
            <AdminFilterPill
              href={buildAdminUrl(currentView, "football")}
              label="Футбол"
              count={sportCounts.football}
              active={currentSport === "football"}
            />
            <AdminFilterPill
              href={buildAdminUrl(currentView, "hockey")}
              label="Хокей"
              count={sportCounts.hockey}
              active={currentSport === "hockey"}
            />
            <AdminFilterPill
              href={buildAdminUrl(currentView, "basketball")}
              label="Баскетбол"
              count={sportCounts.basketball}
              active={currentSport === "basketball"}
            />
            <AdminFilterPill
              href={buildAdminUrl(currentView, "baseball")}
              label="Бейзбол"
              count={sportCounts.baseball}
              active={currentSport === "baseball"}
            />
            <AdminFilterPill
              href={buildAdminUrl(currentView, "tennis")}
              label="Тенис"
              count={sportCounts.tennis}
              active={currentSport === "tennis"}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function PredictionImportCard({
  imported,
  currentSportFilter,
  currentView,
}: {
  imported?: string
  currentSportFilter: AdminSportFilter
  currentView: AdminViewFilter
}) {
  return (
    <section className="rounded-[28px] border border-white/10 bg-slate-950/18 p-6 backdrop-blur-xl md:p-8">
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-200">
            XML импорт
          </p>
          <h2 className="mt-3 text-2xl font-bold text-white">
            Качи прогнози директно от XML файл
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75">
            Ръчната форма си остава, но ако имаш подготвен XML файл, можеш да качиш
            всички прогнози наведнъж. Ако същият мач вече съществува със същата
            комбинация спорт, мач, час и прогноза, записът ще се обнови, а няма да се
            дублира.
          </p>

          {imported && (
            <div className="mt-5 rounded-2xl border border-emerald-300/25 bg-emerald-950/60 px-4 py-3 text-sm text-emerald-100">
              XML-ът е импортиран успешно. Качени или обновени са {imported} прогнози.
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <form action={importPredictionXmlAction} className="space-y-4">
              <input type="hidden" name="redirect_sport" value={currentSportFilter} />
              <input type="hidden" name="redirect_view" value={currentView} />

              <label className="block space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
                  XML файл
                </span>
                <input
                  required
                  type="file"
                  name="xml_file"
                  accept=".xml,text/xml,application/xml"
                  className="block w-full rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3 text-sm text-white file:mr-4 file:rounded-full file:border-0 file:bg-orange-400 file:px-4 file:py-2 file:font-semibold file:text-slate-950 hover:file:bg-orange-300"
                />
              </label>

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="rounded-full bg-orange-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-orange-300"
                >
                  Импортирай прогнози от XML
                </button>
                <a
                  href="/admin/template?v=4"
                  download="oraclebet-predictions-template-v4.xml"
                  className="rounded-full border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  Свали примерен XML (v4)
                </a>
              </div>
            </form>
          </div>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-slate-950/25 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
            Примерен шаблон
          </p>
          <p className="mt-3 text-sm leading-7 text-white/70">
            Приемат се тагове като `sport`, `match`, `country`, `league`, `kickoff`,
            `pick` или `prediction`, `odds`, `analysis`, `status`, `result_text`.
            Часът може да е например `2026-03-22T22:00` или `22.03.2026 22:00`.
            За тест винаги сваляй наново примерния файл, за да не качиш стара версия
            от Downloads.
          </p>
          <pre className="mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/45 p-4 text-xs leading-6 text-white/80">
            <code>{PREDICTION_IMPORT_XML_TEMPLATE}</code>
          </pre>
        </div>
      </div>
    </section>
  )
}

function PredictionForm({
  title,
  row,
  currentSportFilter,
  currentView,
  initialSport,
}: {
  title: string
  row?: AdminPredictionRow
  currentSportFilter: AdminSportFilter
  currentView: AdminViewFilter
  initialSport: AdminPredictionRow["sport"]
}) {
  const isEditing = Boolean(row)

  return (
    <div
      className={`rounded-[28px] border p-6 backdrop-blur-xl ${getStatusClasses(
        row?.status ?? "pending"
      )}`}
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
            {title}
          </p>
          {row && (
            <div className="mt-2 space-y-1.5">
              <p className="text-sm font-medium text-white/70">
                {row.match} • {getStatusLabel(row.status)}
              </p>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
                Добавена: {formatAdminDateTime(row.published_at)}
              </p>
            </div>
          )}
        </div>

        {row && (
          <form action={deletePredictionAction}>
            <input type="hidden" name="id" value={row.id} />
            <input type="hidden" name="redirect_sport" value={currentSportFilter} />
            <input type="hidden" name="redirect_view" value={currentView} />
            <button
              type="submit"
              className="rounded-full border border-rose-300/25 bg-rose-950/60 px-4 py-2 text-sm font-semibold text-rose-100 transition hover:border-rose-200/45 hover:bg-rose-900/70"
            >
              Изтрий
            </button>
          </form>
        )}
      </div>

      <form action={savePredictionAction} className="space-y-4">
        {row && <input type="hidden" name="id" value={row.id} />}
        <input type="hidden" name="redirect_sport" value={currentSportFilter} />
        <input type="hidden" name="redirect_view" value={currentView} />

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
              Спорт
            </span>
            <select
              name="sport"
              defaultValue={row?.sport ?? initialSport}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3 text-white outline-none transition focus:border-orange-300/45"
            >
              <option value="football">Футбол</option>
              <option value="hockey">Хокей</option>
              <option value="basketball">Баскетбол</option>
              <option value="baseball">Бейзбол</option>
              <option value="tennis">Тенис</option>
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
              Час на започване
            </span>
            <input
              required
              type="datetime-local"
              name="kickoff"
              defaultValue={row ? formatKickoffForInput(row.kickoff) : ""}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3 text-white outline-none transition focus:border-orange-300/45"
            />
          </label>
        </div>

        <label className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
            Мач
          </span>
          <input
            required
            type="text"
            name="match"
            defaultValue={row?.match ?? ""}
            className="w-full rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3 text-white outline-none transition focus:border-orange-300/45"
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
              Държава
            </span>
            <input
              required
              type="text"
              name="country"
              defaultValue={row?.country ?? ""}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3 text-white outline-none transition focus:border-orange-300/45"
            />
          </label>

          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
              Първенство
            </span>
            <input
              required
              type="text"
              name="league"
              defaultValue={row?.league ?? ""}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3 text-white outline-none transition focus:border-orange-300/45"
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-[1.4fr_0.6fr]">
          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
              Прогноза
            </span>
            <input
              required
              type="text"
              name="prediction"
              defaultValue={row?.prediction ?? ""}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3 text-white outline-none transition focus:border-orange-300/45"
            />
          </label>

          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
              Коефициент
            </span>
            <input
              required
              type="number"
              name="odds"
              min="1.01"
              step="0.01"
              defaultValue={row?.odds.toFixed(2) ?? ""}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3 text-white outline-none transition focus:border-orange-300/45"
            />
          </label>
        </div>

        <label className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
            Анализ
          </span>
          <textarea
            name="analysis"
            rows={4}
            defaultValue={row?.analysis ?? ""}
            placeholder="Кратък анализ за формата, стила на мача и логиката на прогнозата."
            className="min-h-[120px] w-full rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3 text-white outline-none transition focus:border-orange-300/45"
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
              Статус
            </span>
            <select
              name="status"
              defaultValue={row?.status ?? "pending"}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3 text-white outline-none transition focus:border-orange-300/45"
            >
              <option value="pending">Чакаща</option>
              <option value="live">Играе се</option>
              <option value="won">Печеливша</option>
              <option value="lost">Губеща</option>
              <option value="void">Void</option>
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
              Краен резултат
            </span>
            <input
              type="text"
              name="result_text"
              defaultValue={row?.result_text ?? ""}
              placeholder="например 1:0 или 6 жълти + 1 червен = 8 картона"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3 text-white outline-none transition focus:border-orange-300/45"
            />
          </label>
        </div>

        <button
          type="submit"
          className="rounded-full bg-orange-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-orange-300"
        >
          {isEditing ? "Запази промените" : "Добави прогноза"}
        </button>
      </form>
    </div>
  )
}

function PredictionSection({
  eyebrow,
  title,
  description,
  rows,
  emptyMessage,
  currentSportFilter,
  currentView,
}: {
  eyebrow: string
  title: string
  description: string
  rows: AdminPredictionRow[]
  emptyMessage: string
  currentSportFilter: AdminSportFilter
  currentView: AdminViewFilter
}) {
  return (
    <section className="space-y-4">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/55">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-2xl font-bold text-white">{title}</h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-white/65">{description}</p>
      </div>

      {rows.length === 0 ? (
        <div className="rounded-[28px] border border-white/10 bg-slate-950/18 p-6 text-white/70 backdrop-blur-xl">
          {emptyMessage}
        </div>
      ) : (
        <div className="space-y-5">
          {rows.map((row) => (
            <PredictionForm
              key={row.id}
              title={`${getSportLabel(row.sport)} • ID ${row.id}`}
              row={row}
              currentSportFilter={currentSportFilter}
              currentView={currentView}
              initialSport={row.sport}
            />
          ))}
        </div>
      )}
    </section>
  )
}

function CollapsiblePredictionSection({
  eyebrow,
  title,
  description,
  rows,
  emptyMessage,
}: {
  eyebrow: string
  title: string
  description: string
  rows: AdminPredictionRow[]
  emptyMessage: string
}) {
  void eyebrow
  void title
  void description
  void rows
  void emptyMessage

  return null
}

/*
function LegacyCollapsiblePredictionSection({
  eyebrow,
  title,
  description,
  rows,
  emptyMessage,
}: {
  eyebrow: string
  title: string
  description: string
  rows: AdminPredictionRow[]
  emptyMessage: string
}) {
  return (
    <section className="space-y-4">
      <details className="group rounded-[28px] border border-white/10 bg-slate-950/18 backdrop-blur-xl">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 [&::-webkit-details-marker]:hidden md:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/55">
              {eyebrow}
            </p>
            <h2 className="mt-2 text-2xl font-bold text-white">{title}</h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/75">
              {rows.length} {rows.length === 1 ? "мач" : "мача"}
            </span>
            <span className="inline-flex text-sm font-semibold uppercase tracking-[0.18em] text-orange-200 transition group-open:rotate-180">
              ↓
            </span>
          </div>
        </summary>

        <div className="border-t border-white/10 px-6 py-5 md:px-8">
          <p className="max-w-3xl text-sm leading-7 text-white/65">{description}</p>

          {rows.length === 0 ? (
            <div className="mt-4 rounded-[28px] border border-white/10 bg-slate-950/18 p-6 text-white/70 backdrop-blur-xl">
              {emptyMessage}
            </div>
          ) : (
            <div className="mt-5 space-y-5">
              {rows.map((row) => (
                <PredictionForm
                  key={row.id}
                  title={`${getSportLabel(row.sport)} • ID ${row.id}`}
                  row={row}
                />
              ))}
            </div>
          )}
        </div>
      </details>
    </section>
  )
}
*/

type AdminPageProps = {
  searchParams: Promise<{
    deleted?: string
    error?: string
    imported?: string
    saved?: string
    sport?: string
    view?: string
  }>
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const params = await searchParams
  const safeError =
    params.error && params.error !== "wrong-password" && params.error !== "NEXT_REDIRECT"
      ? params.error
      : undefined
  const accessGranted = await hasAdminAccess()

  if (!accessGranted) {
    notFound()
  }

  if (!isAdminConfigured()) {
    return (
      <main className="space-y-8">
        <AdminSetupCard />
      </main>
    )
  }

  const authenticated = await isAdminAuthenticated()

  if (!authenticated) {
    return (
      <main className="space-y-8">
        <AdminLoginCard error={params.error} />
      </main>
    )
  }

  const currentView = getSelectedView(params.view)
  const currentSport = getSelectedSport(params.sport)
  const predictions = await getAdminPredictions()
  const dailyVisitors = await getAdminDailyVisitors()
  const footballCount = predictions.filter((row) => row.sport === "football").length
  const hockeyCount = predictions.filter((row) => row.sport === "hockey").length
  const basketballCount = predictions.filter((row) => row.sport === "basketball").length
  const baseballCount = predictions.filter((row) => row.sport === "baseball").length
  const tennisCount = predictions.filter((row) => row.sport === "tennis").length
  const activePredictions = predictions
    .filter((row) => row.status === "pending" || row.status === "live")
    .sort(sortByKickoffAscending)
  const archivedPredictions = predictions
    .filter((row) => row.status === "won" || row.status === "lost" || row.status === "void")
    .sort(sortByKickoffDescending)
  const filteredRows = filterPredictionsBySport(
    currentView === "current" ? activePredictions : archivedPredictions,
    currentSport
  )
  const initialSport = currentSport === "all" ? "football" : currentSport
  const sectionTitle =
    currentSport === "all"
      ? currentView === "current"
        ? "Текущи прогнози"
        : "Приключени прогнози"
      : `${currentView === "current" ? "Текущи" : "Приключени"} прогнози • ${getSportLabel(
          currentSport
        )}`
  const sectionDescription =
    currentView === "current"
      ? "Показани са само чакащите и започналите мачове за избрания филтър. Така се работи по-бързо и не се зареждат излишни редакционни форми."
      : "Показани са само приключилите прогнози за избрания филтър. Оттук можеш бързо да редактираш резултата или статуса при нужда."
  const emptyMessage =
    currentSport === "all"
      ? currentView === "current"
        ? "В момента няма текущи прогнози."
        : "В момента няма приключени прогнози."
      : currentView === "current"
        ? `В момента няма текущи прогнози за ${getSportLabel(currentSport).toLowerCase()}.`
        : `В момента няма приключени прогнози за ${getSportLabel(currentSport).toLowerCase()}.`

  return (
    <main className="space-y-8">
      <section className="rounded-[28px] border border-white/10 bg-slate-950/20 p-6 backdrop-blur-xl md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-200">
              Админ панел
            </p>
            <h1 className="mt-3 text-4xl font-bold text-white">Управление на прогнозите</h1>
            <p className="mt-4 max-w-3xl leading-7 text-white/75">
              Оттук добавяш нови мачове, качваш XML импорт и местиш приключилите
              прогнози към резултати само със смяна на статуса.
            </p>
          </div>

          <form action={logoutAdminAction}>
            <button
              type="submit"
              className="rounded-full border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Изход
            </button>
          </form>
        </div>

        {params.saved && (
          <div className="mt-6 rounded-2xl border border-emerald-300/25 bg-emerald-950/60 px-4 py-3 text-sm text-emerald-100">
            Промяната е запазена успешно.
          </div>
        )}

        {params.imported && (
          <div className="mt-6 rounded-2xl border border-emerald-300/25 bg-emerald-950/60 px-4 py-3 text-sm text-emerald-100">
            XML импортът приключи успешно. Качени или обновени са {params.imported} прогнози.
          </div>
        )}

        {params.deleted && (
          <div className="mt-6 rounded-2xl border border-emerald-300/25 bg-emerald-950/60 px-4 py-3 text-sm text-emerald-100">
            Прогнозата е изтрита успешно.
          </div>
        )}

        {safeError && (
          <div className="mt-6 rounded-2xl border border-rose-300/25 bg-rose-950/60 px-4 py-3 text-sm text-rose-100">
            {safeError}
          </div>
        )}
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-8">
        <SummaryCard label="Общо" value={predictions.length} />
        <SummaryCard label="Текущи" value={activePredictions.length} />
        <SummaryCard label="Приключени" value={archivedPredictions.length} />
        <SummaryCard label="Футбол" value={footballCount} />
        <SummaryCard label="Хокей" value={hockeyCount} />
        <SummaryCard label="Баскетбол" value={basketballCount} />
        <SummaryCard label="Бейзбол" value={baseballCount} />
        <SummaryCard label="Тенис" value={tennisCount} />
      </section>

      <FilterSection
        currentView={currentView}
        currentSport={currentSport}
        activeCount={activePredictions.length}
        archivedCount={archivedPredictions.length}
        sportCounts={{
          all: predictions.length,
          football: footballCount,
          hockey: hockeyCount,
          basketball: basketballCount,
          baseball: baseballCount,
          tennis: tennisCount,
        }}
      />

      <VisitorsSection rows={dailyVisitors} />
      <PredictionImportCard
        imported={params.imported}
        currentSportFilter={currentSport}
        currentView={currentView}
      />

      <PredictionForm
        title="Нова прогноза"
        currentSportFilter={currentSport}
        currentView={currentView}
        initialSport={initialSport}
      />

      <PredictionSection
        eyebrow={currentView === "current" ? "Текущи прогнози" : "Приключени прогнози"}
        title={sectionTitle}
        description={sectionDescription}
        rows={filteredRows}
        emptyMessage={emptyMessage}
        currentSportFilter={currentSport}
        currentView={currentView}
      />

      <CollapsiblePredictionSection
        eyebrow="Приключени прогнози"
        title="Архив на завършените мачове"
        description="Тук са прогнозите със статус печеливша, губеща или void. Можеш да редактираш резултата или при нужда да върнеш мач обратно към текущите."
        rows={archivedPredictions}
        emptyMessage="В момента няма приключени прогнози."
      />
    </main>
  )
}
