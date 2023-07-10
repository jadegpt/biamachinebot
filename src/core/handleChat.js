import { SavePrivateChat, SaveGroup } from "../repositories/index.js";


const handleChat = async (message) => {
    if (message.chat) {
        if (message.chat.type === "private") SavePrivateChat(message.chat.id, message.from)
        else await handleGroup(message);
    }
}

const handleGroup = async (message) => {
    let group = {
        chatId: Number(message.chat.id),
        title: message.chat.title,
        allowed: true,
        type: message.chat.type,
        active: true,
        inviteLink: message.chat.invite_link
    }

    SaveGroup(group);
}

export { handleChat }