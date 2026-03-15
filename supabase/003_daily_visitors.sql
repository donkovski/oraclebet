create table if not exists public.daily_visitors (
  day date primary key,
  visits integer not null default 0 check (visits >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists daily_visitors_set_updated_at on public.daily_visitors;

create trigger daily_visitors_set_updated_at
before update on public.daily_visitors
for each row
execute function public.set_updated_at();

create or replace function public.increment_daily_visitors(visit_day date)
returns public.daily_visitors
language plpgsql
security definer
as $$
declare
  current_row public.daily_visitors;
begin
  insert into public.daily_visitors (day, visits)
  values (visit_day, 1)
  on conflict (day)
  do update set
    visits = public.daily_visitors.visits + 1,
    updated_at = now()
  returning * into current_row;

  return current_row;
end;
$$;

grant select on public.daily_visitors to authenticated;
