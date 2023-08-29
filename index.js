require("dotenv").config();
const TelegramApi = require("node-telegram-bot-api");

const bot = new TelegramApi(process.env.TELEGRAM_BOT_KEY, {polling: true})


const start = () => {
    bot.setMyCommands([
        {command: "/start", description: "Привет"}
    ])

    bot.on("message", async (msg) => {
        const {text, chat: {id:chatId}} = msg;
        bot.setChatMenuButton({chat_id: chatId, menu_button: {text: "Привет 👋"}})
        if (text === "/start") {
            await bot.sendMessage(chatId, "Привет! Это бот добра и позитива^^", {
                reply_markup: {
                    keyboard: [
                        [{text: "Привет 👋"}]
                    ]
                }
            });
            return bot.sendSticker(chatId, "https://tlgrm.eu/_/stickers/3d2/135/3d213551-8cac-45b4-bdf3-e24a81b50526/192/20.webp");
        }
        if (text === "/info") {
            return bot.sendMessage(chatId, "Здесь должна быть информация о боте");
        }
        bot.sendMessage(chatId, "Я тебя не понял:(");
        bot.sendSticker(chatId, "https://tlgrm.eu/_/stickers/3d2/135/3d213551-8cac-45b4-bdf3-e24a81b50526/192/93.webp")
    })
}

start();