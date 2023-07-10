"use strict";

import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const schema = new Schema({
  data: {
    chatId: {
      unique: true,
      required: true,
      type: String,
    },
    permissions: [
      {
        type: {
          type: String,
          trim: true,
        },
        allowed: {
          type: Boolean,
          required: true,
        },
      },
    ],
  },
});

export { schema }
