# Bia (biamachinebot)

A Telegram chatbot based on Node.js and [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api) framework.

This project was inspired by [Chesterbot](https://github.com/Rev3rs1d/chesterbot).

### Requirements

- A deployed and configured MongoDB Atlas cluster, M0 or higher. [(Tutorial)](https://www.mongodb.com/developer/products/mongodb/5-different-ways-deploy-free-database-mongodb-atlas/)
- Bot API Token. [(Tutorial)](https://core.telegram.org/bots/features#creating-a-new-bot)


### Before you start

First rename `.env-sample` file to `.env` and fill in all necessary values.

```
BOT_TOKEN="<YOUR_BOT_API_TOKEN>""
DB_STRING="<YOUR_MONGODB_TOKEN>"
```

### Start your server

```bash
$ npm install
$ npm start
```

### Production

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/Qow_DE?referralCode=xZ8GAk)

### Demo

You can see a working version of the bot at [@biamachinebot](https://t.me/biamachinebot)