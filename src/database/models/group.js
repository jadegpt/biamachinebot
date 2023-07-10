'use strict'

import mongoose from 'mongoose';

const Schema = mongoose.Schema
const schema = new Schema({
    chatId: {
        unique: true,
        required: true,
        type: String
    },
    title: {
        type: String,
        trim: true
    },
    type: {
        type: String,
        trim: true
    },
    inviteLink: {
        type: String,
        trim: true
    },
    allowed: {
        type: Boolean,
        required: true
    },
    active: {
        type: Boolean
    }
})
		
export { schema }