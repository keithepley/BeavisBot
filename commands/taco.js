exports.names = ['.taco'];
exports.hidden = true;
exports.enabled = true;
exports.matchStart = false;
exports.handler = function (data) {
    var strings = [
        'http://static.wixstatic.com/media/a07b92_537fd27edabf4722a7673f5c824c29f6.gif_srz_p_500_500_75_22_0.50_1.20_0.00_gif_srz',
        'http://www.thecoast.ca/images/blogimages/2011/02/16/1297864255-taco.gif'
    ];
    var randomIndex = Math.floor(Math.random() * strings.length);
    bot.chat(strings[randomIndex]);
};