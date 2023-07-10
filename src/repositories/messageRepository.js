import { Message } from '../database/index.js';

const MessageExists = async (message) => {
    try {
        return await Message.exists({ message: message });
    }
    catch (error) {
        console.error(error.message);
    }
}
const GetMessage = async (message) => {
    try {
        return await Message.findOne({ message: message });
    }
    catch (error) {
        console.error(error.message);
    }

}
const SaveMessage = async (message, reply) => {
    try {
        var query = { message: message },
            update = { reply: reply },
            options = { upsert: true, new: true, setDefaultsOnInsert: true };

        await Message.findOneAndUpdate(query, update, options);
    } catch (error) {
        console.error(error.message);
    }
}

export { MessageExists, GetMessage, SaveMessage }