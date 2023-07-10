import { Private_chat } from '../database/index.js';

const SavePrivateChat = async (chatId, from) => {
    try {
        var query = { chatId: chatId },
            update = { from: from },
            options = { upsert: true, new: true, setDefaultsOnInsert: true };

        await Private_chat.findOneAndUpdate(query, update, options);
    } catch (error) {
        console.log(error.message);
    }
}

export { SavePrivateChat }