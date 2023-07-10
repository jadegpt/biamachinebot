import { Group } from '../database/index.js';

const SaveGroup = async (group) => {
    try {
        var query = { chatId: group.chatId },
            update = { chatId: group.chatId, title: group.title, allowed: group.allowed, type: group.type, active: group.active, invite_link: group.invite_link },
            options = { upsert: true, new: true, setDefaultsOnInsert: true };

        await Group.findOneAndUpdate(query, update, options);
    } catch (error) {
        console.error(error.message);
    }
}

export { SaveGroup }