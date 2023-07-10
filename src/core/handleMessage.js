import { botId, replyToMessage, addReply } from './bot.js';
import createDebug from 'debug';
import { handleChat } from './handleChat.js';

const debug = createDebug('bot:replying_text');

const handleMessage = async (message) => {

  //If message was sent more than 10s ago, do nothing
  let tenSecondsAgo = new Date();
  tenSecondsAgo.setSeconds(tenSecondsAgo.getSeconds() - 10);
  if (message.date < Math.floor(tenSecondsAgo / 1000)) return;

  //Save chat (chatId&from)
  await handleChat(message);

  //If message is a reply to another message
  if (message.reply_to_message && message.reply_to_message.from.id != botId) {

    //If the original message is a sticker or text
    if (message.reply_to_message.sticker || message.reply_to_message.text) {

      //Only save reply if chat is private
      if (message.chat.type === "private")
        addReply(message);
    }
  }

  //reply message
  await replyToMessage(message);
};

export { handleMessage };
