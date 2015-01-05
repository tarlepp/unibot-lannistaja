/**
 * Plugin dependencies.
 *
 * @type {exports}
 */
var cheerio = require('cheerio');
var helpers = require('unibot-helpers');

/**
 * Weather plugin for UniBot.
 *
 * This plugin fetches weather data from http://api.openweathermap.org API.
 *
 * @param  {Object} options Plugin options object, description below.
 *   db: {mongoose} the mongodb connection
 *   bot: {irc} the irc bot
 *   web: {connect} a connect + connect-rest webserver
 *   config: {object} UniBot configuration
 *
 * @return  {Function}  Init function to access shared resources
 */
module.exports = function init(options) {
    // Actual plugin implementation.
    return function plugin(channel) {
        return {
            "^!lannistus$": function lannistus(from, matches) {
                helpers.download('http://lannistajakuha.com/', function callback(data) {
                    if (data == null) {
                        channel.say(from, 'Oh noes did not get any data from http://lannistajakuha.com/ - Site down?');
                    } else {
                        var $ = cheerio.load(data);
                        var lannistus = $('div.lannistus p').text().trim();

                        if (lannistus) {
                            channel.say(lannistus);
                        } else {
                            channel.say('Tälle päivälle ei lannistusta - höh.');
                        }
                    }
                });
            }
        };
    };
};
