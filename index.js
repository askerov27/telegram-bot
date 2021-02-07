const TelegramBot = require("node-telegram-bot-api");
const token = "1432514797:AAHCERfZJaaldGH1aT1csayEJ1PmZRdtrXw";

const bot = new TelegramBot(token, {
    polling: true,
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