import createDebug from 'debug';
import { bot } from '../core/bot.js';

const debug = createDebug('bot:start_command');

const start = async (msg) => {
  debug(`Triggered "start" command`);
  
  const me = await bot.getMe();

  bot.sendMessage(
    msg.chat.id,
    `Oiii, tudo bem <b>${msg.from.first_name}</b>? \nEu sou a <em>${me.first_name}</em>, um bot de interação. 
    \nVocê pode conversar comigo por aqui ou me adicionar em algum grupo pra gente bater um papo com todo mundo 😋.
    \nMande /help para ver o que eu posso fazer.
    \nSe você tiver alguma dúvida, pode me mandar lá no @GrupoDaBiaa e marca algum @admin que a gente te ajuda ☺`,
    { parse_mode: "HTML" }
  );

};

export { start };
