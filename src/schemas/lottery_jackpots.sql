create view lottery_jackpots as
SELECT  lottery.id as lottery_id, (count(lottery_tickets.id) * lottery.ticket_cost) as jackpot from lottery_tickets
       join lottery on lottery.id =  lottery_tickets.lottery_id
       group by lottery.id, lottery.ticket_cost;
