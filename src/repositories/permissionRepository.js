import { Permission } from '../database/index.js';

const userHasPermission = async (userId, type) => {
    const data = await Permission.findOne({
        "data.chatId": userId,
        "data.permissions": {
            $elemMatch: {
                type: type,
                allowed: true,
            },
        },
    });
    if (data) return true;
    else return false;
};

const userPermissionExists = async (userId) => {
    const data = await Permission.findOne({
        "data.chatId": userId
    });

    if (data) return true;
    else return false;
};

const savePermission = async (userId, type) => {
    try {
        var query = { 'data.chatId': userId },
            update = { data: { chatId: userId, permissions: [{ type: type, allowed: true }] } },
            options = { upsert: true, new: true, setDefaultsOnInsert: true };

        await Permission.findOneAndUpdate(query, update, options);
    } catch (error) {
        console.log(error.message);
    }
};

export { userHasPermission, userPermissionExists, savePermission }