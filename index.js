const TelegramBot = require("node-telegram-bot-api");
const token = "1432514797:AAHCERfZJaaldGH1aT1csayEJ1PmZRdtrXw";

const bot = new TelegramBot(token, {
    polling: true,
});

const TOKEN = process.env.token || 'YOUR_TELEGRAM_BOT_TOKEN';
const TelegramBot = require('../..');
const options = {
    webHook: {
        // Port to which you should bind is assigned to $PORT variable
        // See: https://devcenter.heroku.com/articles/dynos#local-environment-variables
        port: process.env.PORT
            // you do NOT need to set up certificates since Heroku provides
            // the SSL certs already (https://<app-name>.herokuapp.com)
            // Also no need to pass IP because on Heroku you need to bind to 0.0.0.0
    }
};
// Heroku routes from port :443 to $PORT
// Add URL of your app to env variable or enable Dyno Metadata
// to get this automatically
// See: https://devcenter.heroku.com/articles/dyno-metadata
const url = process.env.APP_URL || 'https://telegram-bot-xenia.herokuapp.com:443';
const bot = new TelegramBot(TOKEN, options);


// This informs the Telegram servers of the new webhook.
// Note: we do not need to pass in the cert, as it already provided
bot.setWebHook(`${url}/bot${TOKEN}`);


// Just to ping!
bot.on('message', function onMessage(msg) {
    bot.sendMessage(msg.chat.id, 'I am alive on Heroku!');
});
let request = require("request");
bot.on("message", (msg) => {
    if (msg.text === "Кися") {
        request(
            "https://api.thecatapi.com/v1/images/search?size=full",
            function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    let res = JSON.parse(body);
                    bot.sendPhoto(msg.chat.id, res[0].url);
                }
            }
        );
    } else if (msg.text === "Песель") {
        request(
            "https://api.thedogapi.com/v1/images/search?size=full",
            function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    let res = JSON.parse(body);
                    bot.sendPhoto(msg.chat.id, res[0].url);
                }
            }
        );
        //12
    } else {
        bot.sendMessage(msg.chat.id, "Выбирай", {
            reply_markup: {
                keyboard: [
                    ["Кися"],
                    ["Песель"]
                ],
            },
        });
    }
});