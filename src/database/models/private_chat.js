'use strict'

import mongoose from 'mongoose';

const Schema = mongoose.Schema
const schema = new Schema({
    chatId: {
        unique: true,
        required: true,
        type: Number
    },
    from: {
      type: Object  
    },
    messages: {
        type: Array,
        required: true
    },
    allowed: {
        type: Boolean
    }
})
		
export { schema }