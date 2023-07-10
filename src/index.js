import { bot, handleMessage } from './core/index.js';
import { start, help, O_meter, me } from './commands/index.js';

bot.on('message', handleMessage);

bot.onText(/^\/start/, start);
bot.onText(/^\/help/, help);
bot.onText(/^\/gayzometro/, function (msg) { O_meter(msg, "gay 🏳️‍🌈") });
bot.onText(/^\/fofometro/, function (msg) { O_meter(msg, "fofo 😊") });
bot.onText(/^\/lindometro/, function (msg) { O_meter(msg, "lindo 😍") });
bot.onText(/^\/inteligentometro/, function (msg) { O_meter(msg, "inteligente 🤓") });
bot.onText(/^\/gostosometro/, function (msg) { O_meter(msg, "gostoso 🔥") });
bot.onText(/^\/gostosometra/, function (msg) { O_meter(msg, "gostosa 🔥") });
bot.onText(/^\/me/, me);