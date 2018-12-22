exports.create = (userID) => {
    return {
        name: 'create-user-points',
        text: 'INSERT INTO points(current_balance, total_points_gained, user_id) VALUES($1, $2, $3)',
        values: [ 0, 0, userID]
    }
};

exports.addPointsByDiscordID = (discordID, points) => {
    return {
        name: 'add-user-points-by-did',
        text: 'UPDATE points SET points.current_balance = points.current_balance + $2, points.total_points_gained =  total_points_gained + CASE When $2 < 0 THEN 0 ELSE $2 END JOIN USERS ON users.id = points.user_id WHERE users.discord_id = $1',
        values: [discordID, points]
    }
};

exports.addPointsByUserID = (userID, points) => {
    return {
        name: 'add-user-points-by-uid',
        text: 'UPDATE points SET current_balance = current_balance + $2, total_points_gained = total_points_gained + CASE When $2 < 0 THEN 0 ELSE $2 END WHERE user_id = $1',
        values: [userID, points]
    }
};