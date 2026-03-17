do $$
begin
  if not exists (
    select 1
    from pg_enum
    where enumtypid = 'public.prediction_sport'::regtype
      and enumlabel = 'basketball'
  ) then
    alter type public.prediction_sport add value 'basketball';
  end if;
end
$$;

do $$
begin
  if not exists (
    select 1
    from pg_enum
    where enumtypid = 'public.prediction_sport'::regtype
      and enumlabel = 'baseball'
  ) then
    alter type public.prediction_sport add value 'baseball';
  end if;
end
$$;
