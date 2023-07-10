import createDebug from 'debug';
import { bot } from '../core/bot.js';

const debug = createDebug('bot:help_command');

const help = async (msg) => {
    debug(`Triggered "help" command`);

    const me = await bot.getMe();

    bot.sendMessage(
        msg.chat.id,
        `<b>Help</b>\n
Oie! Meu nome é ${me.first_name}. Sou um bot de interação, estou aqui para conversar com você e com as pessoas no seu grupo!
Eu aprendo com as respostas de alguns chats verificados. Posso enviar textos, stickers, gifs, fotos, vídeos e até áudio!\n
Aqui estão algumas frases para demonstrar o que posso fazer:\n
<code>Bia mostra a mão</code>
<code>Bia manda um áudio</code>
<code>Bia manda um sticker</code>
<code>Bia manda um gif</code>
<code>Bom dia, Bia</code>\n
Se você tiver algum problema ou alguma dúvida de como me utilizar, mande uma mensagem no @GrupoDaBiaa marcando @admin que alguém vai te ajudar! 😉`,
        { parse_mode: "HTML" }
    );
};

export { help };
