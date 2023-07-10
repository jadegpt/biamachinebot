import TelegramBot from 'node-telegram-bot-api';
import { promisify } from 'util';
import { userHasPermission } from '../repositories/permissionRepository.js';
import { MessageExists, GetMessage, SaveMessage } from '../repositories/messageRepository.js';

const sleep = promisify(setTimeout);
const BOT_TOKEN = process.env.BOT_TOKEN || '';

const bot = new TelegramBot(BOT_TOKEN, {
    polling: true,
});

const botId = (await bot.getMe()).id;

const replyToMessage = async (message) => {
    try {
        const receivedMessage = message.sticker?.file_unique_id ?? message.text
        const chatId = message.chat.id;

        const sendMessageOptions = { reply_to_message_id: message.message_id };

        if (!await MessageExists(receivedMessage)) return;

        const { reply } = await GetMessage(receivedMessage)
        let replyToSend = reply[Math.floor(Math.random() * reply.length)]

        if (!replyToSend) return;

        if (/\s{0}@\s{0}w{0}/.test(replyToSend))
            replyToSend = replyToSend.replace(/\s{0}@\s{0}w{0}/, ` ${message?.from?.first_name} `);
        if (replyToSend.indexOf('{day}') > -1)
            replyToSend = replyToSend.replace('{day}', new Date().toLocaleDateString('pt-BR', { weekday: 'long' }));


        let chatAction = getChatAction(replyToSend);
        await bot.sendChatAction(chatId, chatAction);
        await sendMessage(chatAction, chatId, replyToSend, sendMessageOptions);
    }
    catch (error) {
        console.error(error.message);
    }
};

const sendMessage = async (type, chatId, replyToSend, sendMessageOptions) => {
    try {
        const typingTime = 20 * replyToSend?.length || 6000;
        await sleep(typingTime);

        switch (type) {
            case 'record_voice':
                await bot.sendVoice(chatId, replyToSend, sendMessageOptions);
                break;
            case 'choose_sticker':
                await bot.sendSticker(chatId, replyToSend, sendMessageOptions);
                break;
            case 'upload_document':
                await bot.sendAnimation(chatId, replyToSend, sendMessageOptions);
                break;
            case 'upload_photo':
                await bot.sendPhoto(chatId, replyToSend, sendMessageOptions);
                break;
            case 'upload_voice':
                await bot.sendAudio(chatId, replyToSend, sendMessageOptions);
                break;
            default:
                await bot.sendMessage(chatId, replyToSend, sendMessageOptions);
                break;
        }
    }
    catch (err) {
        console.error(err);
    }
}

const addReply = async (message) => {
    if (!await userHasPermission(message.from.id, 'add_reply'))
        return;

    let userMessage;

    if (message.reply_to_message.sticker)
        userMessage = message.reply_to_message.sticker.file_unique_id;
    else if (message.reply_to_message.text)
        userMessage = message.reply_to_message.text;

    let replies = [];

    if (message.sticker) replies.push(message.sticker.file_id);
    else if (message.audio) replies.push(message.audio.file_id);
    else if (message.voice) replies.push(message.voice.file_id);
    else if (message.animation) replies.push(message.animation.file_id);
    else if (message.photo) replies.push(message.photo[message.photo.length - 1].file_id);
    else if (message.text) {
        if (!messageIsCommand(message.text)) replies.push(message.text);
    } else throw new Error(`${message} - message type not recognized`);

    if (await MessageExists(userMessage)) {
        let savedMessage = await GetMessage(userMessage);
        savedMessage.reply.push(replies[0]);

        await SaveMessage(userMessage, savedMessage.reply);
    } else {
        if (!messageIsCommand(message.text)) {
            await SaveMessage(userMessage, replies);
        }
    }
};

function messageIsCommand(text) {
    if (!text) return false;
    text = text.trim();
    return text.substring(0, 1) == "/" || text.substring(0, 1) == ".";
}

function getChatAction(replyToSend) {
    const regVoice = new RegExp("(^AwACAgEAA).+");
    const regSticker = new RegExp("(^CAACAgEAA).+");
    const regPhoto = new RegExp("(^AgACAgEAA).+");
    const regGif = new RegExp("(^CgACAgQAA).+");
    const regGif2 = new RegExp("(^CgACAgEAA).+");
    const regAudio = new RegExp("(^CQACAgEAA).+");
    if (replyToSend.match(regVoice)) return 'record_voice';
    else if (replyToSend.match(regSticker)) return 'choose_sticker';
    else if (replyToSend.match(regPhoto)) return 'upload_photo';
    else if (replyToSend.match(regGif) || replyToSend.match(regGif2)) return 'upload_document';
    else if (replyToSend.match(regAudio)) return 'upload_document';
    else if (replyToSend.match(regAudio)) return 'upload_voice';
    else return 'typing';
}

export { bot, botId, replyToMessage, addReply };