import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { hasAdminAccess, isAdminAuthenticated, isAdminConfigured } from "@/lib/admin-auth"
import {
  formatKickoffForInput,
  getAdminDailyVisitors,
  getAdminPredictions,
  type AdminPredictionRow,
  type DailyVisitorRow,
} from "@/lib/supabase-admin"
import { loginAdminAction, logoutAdminAction, savePredictionAction } from "./actions"

export const metadata: Metadata = {
  title: "Админ панел",
  description: "Вътрешен панел за управление на прогнозите в OracleBet.",
  robots: {
    index: false,
    follow: false,
  },
}

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

function formatVisitorDate(day: string) {
  return new Intl.DateTimeFormat("bg-BG", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(`${day}T00:00:00`))
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
        <div className="space-y-3">
          {rows.length === 0 ? (
            <p className="text-sm leading-7 text-white/70">
              Още няма събрани посещения. След като tracker-ът започне да отчита отварянията
              на сайта, тук ще виждаш дневния брой посетители.
            </p>
          ) : (
            rows.map((row) => (
              <div
                key={row.day}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
              >
                <p className="text-sm font-medium text-white/75">{formatVisitorDate(row.day)}</p>
                <p className="text-lg font-bold text-white">{row.visits}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

function PredictionForm({
  title,
  row,
}: {
  title: string
  row?: AdminPredictionRow
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
            <p className="mt-2 text-sm font-medium text-white/70">
              {row.match} • {getStatusLabel(row.status)}
            </p>
          )}
        </div>
      </div>

      <form action={savePredictionAction} className="space-y-4">
        {row && <input type="hidden" name="id" value={row.id} />}

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
              Спорт
            </span>
            <select
              name="sport"
              defaultValue={row?.sport ?? "football"}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3 text-white outline-none transition focus:border-orange-300/45"
            >
              <option value="football">Футбол</option>
              <option value="hockey">Хокей</option>
              <option value="basketball">Баскетбол</option>
              <option value="baseball">Бейзбол</option>
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
            Анализ</span>
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
}: {
  eyebrow: string
  title: string
  description: string
  rows: AdminPredictionRow[]
  emptyMessage: string
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
              ˅
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
                  title={`${getSportLabel(row.sport)} вЂў ID ${row.id}`}
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

type AdminPageProps = {
  searchParams: Promise<{
    error?: string
    saved?: string
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

  const predictions = await getAdminPredictions()
  const dailyVisitors = await getAdminDailyVisitors()
  const footballCount = predictions.filter((row) => row.sport === "football").length
  const hockeyCount = predictions.filter((row) => row.sport === "hockey").length
  const basketballCount = predictions.filter((row) => row.sport === "basketball").length
  const baseballCount = predictions.filter((row) => row.sport === "baseball").length
  const activePredictions = predictions
    .filter((row) => row.status === "pending" || row.status === "live")
    .sort(sortByKickoffAscending)
  const archivedPredictions = predictions
    .filter((row) => row.status === "won" || row.status === "lost" || row.status === "void")
    .sort(sortByKickoffDescending)

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
              Оттук добавяш нови мачове и местиш приключилите прогнози към резултати само
              със смяна на статуса.
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

        {safeError && (
          <div className="mt-6 rounded-2xl border border-rose-300/25 bg-rose-950/60 px-4 py-3 text-sm text-rose-100">
            {safeError}
          </div>
        )}
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-7">
        <SummaryCard label="Общо" value={predictions.length} />
        <SummaryCard label="Текущи" value={activePredictions.length} />
        <SummaryCard label="Приключени" value={archivedPredictions.length} />
        <SummaryCard label="Футбол" value={footballCount} />
        <SummaryCard label="Хокей" value={hockeyCount} />
        <SummaryCard label="Баскетбол" value={basketballCount} />
        <SummaryCard label="Бейзбол" value={baseballCount} />
      </section>

      <VisitorsSection rows={dailyVisitors} />

      <PredictionForm title="Нова прогноза" />

      <PredictionSection
        eyebrow="Текущи прогнози"
        title="Управление на активните мачове"
        description="Тук са само прогнозите със статус чакаща или играе се. Така по-лесно следиш мачовете, които още не са приключили."
        rows={activePredictions}
        emptyMessage="В момента няма текущи прогнози."
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
