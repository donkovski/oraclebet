do $$
begin
  if not exists (
    select 1
    from pg_enum
    where enumtypid = 'public.prediction_sport'::regtype
      and enumlabel = 'tennis'
  ) then
    alter type public.prediction_sport add value 'tennis';
  end if;
end
$$;
