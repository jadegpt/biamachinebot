import mongoose from "mongoose";
import {schema as reply} from './models/message.js';
import {schema as chat} from './models/chat.js';
import {schema as permission} from './models/permission.js';
import {schema as privateChat} from './models/private_chat.js';
import {schema as group} from './models/group.js';

mongoose.connect(process.env.DB_STRING)

const Message = mongoose.model('Reply', reply);
const Chat = mongoose.model('Chat', chat);
const Permission = mongoose.model('Permission', permission);
const Private_chat = mongoose.model('Private_Chat', privateChat);
const Group = mongoose.model('Group', group);

export {Message, Chat, Permission, Private_chat, Group };