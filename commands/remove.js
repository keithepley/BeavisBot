exports.names = ['.remove', '.rm'];
exports.hidden = true;
exports.enabled = true;
exports.matchStart = true;
exports.handler = function(data) {
    if (room.staff[data.fromID] > 1) {
        var input = data.message.split(' ');
        if (input.length == 2 && input[1].substring(0,1) == '@') {
            username = input[1].substring(1);
            db.get('SELECT * FROM USERS LEFT JOIN DISCIPLINE USING(userid) WHERE username = ?', [username], function (error, row) {
                bot.moderateRemoveDJ(row.userid);
                console.log('Removing ' + input[1] + ' from list: ' + row.userid);
            });
        }
    }
};
