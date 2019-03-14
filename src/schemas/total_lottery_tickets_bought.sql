create view total_active_lottery_tickets_bought as
SELECT lottery_tickets.user_id,
       lottery_tickets.lottery_id,
       sum(lottery_tickets.num_tickets) AS sum
FROM (lottery_tickets
       JOIN lottery ON ((lottery_tickets.lottery_id = lottery.id)))
WHERE (lottery.is_done = false)
GROUP BY lottery_tickets.user_id, lottery_tickets.lottery_id;

alter table total_active_lottery_tickets_bought
  owner to postgres;

