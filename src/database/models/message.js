'use strict'

import mongoose from 'mongoose';

const Schema = mongoose.Schema
const schema = new Schema({
    message: {
        unique: true,
        required: true,
        type: String
    },
    reply: {
        type: Array,
        trim: true
    }
})
		
export { schema }