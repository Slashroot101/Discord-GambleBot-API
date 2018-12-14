exports.create = (user_id) => {
    return {
        name: 'create-user-points',
        text: 'INSERT INTO points(current_balance, total_points_gained, user_id) VALUES($1, $2, $3)',
        values: [ 0, 0, user_id]
    }
};