import createDebug from 'debug';
import { bot } from '../core/bot.js';

const debug = createDebug('bot:meter_command');

const O_meter = async (msg, word) => {
    debug(`Triggered "metro" command`);

    const percentage = Math.floor(Math.random() * 100);
    bot.sendMessage(
        msg.chat.id,
        `vc é <b>${percentage}%</b> ${word}`,
        { parse_mode: "HTML", reply_to_message_id: msg.message_id }
    );
};

export { O_meter };
