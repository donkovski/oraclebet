create type public.prediction_sport as enum ('football', 'hockey', 'basketball', 'baseball');

create type public.prediction_status as enum ('pending', 'live', 'won', 'lost', 'void');

create table if not exists public.predictions (
  id bigint generated always as identity primary key,
  sport public.prediction_sport not null,
  match text not null,
  kickoff timestamptz not null,
  country text not null,
  league text not null,
  prediction text not null,
  odds numeric(6, 2) not null check (odds > 1),
  status public.prediction_status not null default 'pending',
  result_text text,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint predictions_unique unique (sport, match, kickoff, prediction)
);

create index if not exists predictions_sport_status_kickoff_idx
  on public.predictions (sport, status, kickoff);

create index if not exists predictions_published_at_idx
  on public.predictions (published_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists predictions_set_updated_at on public.predictions;

create trigger predictions_set_updated_at
before update on public.predictions
for each row
execute function public.set_updated_at();

grant usage on schema public to anon, authenticated;
grant select on public.predictions to anon, authenticated;
