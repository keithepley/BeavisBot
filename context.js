module.exports = function(options) {
    var PlugAPI = require('plugapi');
    var sqlite3 = require('sqlite3').verbose();
    
    bot = new PlugAPI(options.auth, options.updateCode); 
    config = options.config;
    db = new sqlite3.Database(path.resolve(__dirname, 'sparkle.sqlite'));
    package = require(path.resolve(__dirname, 'package.json'));
    request = require('request');
    _ = require('underscore');
    S = require('string');
    commands = [];
    uptime = new Date();
    lastRpcMessage = new Date();
    
    room = {
        users: [],
        djs: [],
        media: {},
        votes: {},
        curates: {}
    };
    
    iso_languages = {
        'af': 'Afrikkans',
        'ar': 'Arabic',
        'be': 'Belarusian',
        'bg': 'Bulgarian',
        'ca': 'Catalan',
        'cs': 'Czech',
        'da': 'Danish',
        'de': 'German',
        'el': 'Greek',
        'en': 'English',
        'es': 'Spanish',
        'et': 'Estonian',
        'eu': 'Basque',
        'fa': 'Farsi',
        'fi': 'Finnish',
        'fo': 'Faeroese',
        'fr': 'French',
        'ga': 'Irish',
        'gd': 'Gaelic',
        'hi': 'Hindi',
        'hr': 'Croatian',
        'hu': 'Hungarian',
        'id': 'Indonesian',
        'is': 'Icelandic',
        'it': 'Italian',
        'ja': 'Japanese',
        'ji': 'Yiddish',
        'ko': 'Korean',
        'ku': 'Kurdish',
        'lt': 'Lithuanian',
        'lv': 'Latvian',
        'mk': 'Macedonian',
        'ml': 'Malayalam',
        'ms': 'Malasian',
        'mt': 'Maltese',
        'nl': 'Dutch',
        'nb': 'Norwegian',
        'no': 'Norwegian',
        'pa': 'Punjabi',
        'pl': 'Polish',
        'pt': 'Portuguese',
        'rm': 'Rhaeto-Romanic',
        'ro': 'Romanian',
        'ru': 'Russian',
        'sb': 'Sorbian',
        'sk': 'Slovak',
        'sl': 'Slovenian',
        'sq': 'Albanian',
        'sr': 'Serbian',
        'sv': 'Swedish',
        'th': 'Thai',
        'tn': 'Tswana',
        'tr': 'Turkish',
        'ts': 'Tsonga',
        'uk': 'Ukranian',
        'ur': 'Urdu',
        've': 'Venda',
        'vi': 'Vietnamese',
        'xh': 'Xhosa',
        'zh': 'Chinese',
        'zu': 'Zulu'
    };

    /**
     * Annoying custom functionality
     * @todo roll this into the core
     */
    timeSince = function(unixTimestamp) {

        var seconds = Math.floor((new Date() - new Date(unixTimestamp*1000)) / 1000);

        var interval = Math.floor(seconds / 31536000);

        if (interval >= 1) {
            return interval + " years";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) {
            return interval + " months";
        }
        interval = Math.floor(seconds / 86400);
        if (interval >= 1) {
            return interval + " days";
        }
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
            return interval + " hours";
        }
        interval = Math.floor(seconds / 60);
        if (interval >= 1) {
            return interval + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    }

    smartSplit = function(str, separator, limit) {
        str = str.split(separator);
        if(str.length <= limit) return str;

        var ret = str.splice(0, limit);
        ret.push(str.join(separator));

        return ret;
    }
};