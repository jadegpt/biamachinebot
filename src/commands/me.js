import createDebug from 'debug';
import { bot } from '../core/bot.js';

const debug = createDebug('bot:me_command');

const botInfo = await bot.getMe();

const me = async (msg) => {
    debug(`Triggered "me" command`);

    let private_info = `👤 <b>Seus dados</b> 👤
🆔 <code>${msg.from.id}</code>
👱 Nome: ${msg.from.first_name}`;
    let group_info = `👥 <b>Informações do grupo</b> 👥
🆔 <code>${msg.chat.id}</code>
🏷 Nome: ${msg.chat.title}`;

    if (msg.chat.type !== 'private') {
        bot.sendMessage(msg.chat.id, `<i><a href="t.me/${botInfo.username}">Enviado no chat privado</a></i>`, {parse_mode: 'HTML'});
        private_info += '\n\n' + group_info;
    }

    bot.sendMessage(
        msg.from.id,
        private_info,
        { parse_mode: "HTML" }
    );
};

export { me };
