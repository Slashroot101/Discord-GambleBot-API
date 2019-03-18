create view lottery_jackpots as
SELECT sum(total_active_lottery_tickets_bought.sum) AS sum,
       total_active_lottery_tickets_bought.lottery_id
FROM total_active_lottery_tickets_bought
GROUP BY total_active_lottery_tickets_bought.lottery_id;

alter table lottery_jackpots
  owner to postgres;

