CREATE VIEW user_lottery_tickets
AS
SELECT count(id) as num_tickets, user_id, lottery_id FROM lottery_tickets
GROUP BY lottery_id, user_id;