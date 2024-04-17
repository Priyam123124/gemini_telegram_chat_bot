const TelegramBot = require('node-telegram-bot-api');

//geminiAPI

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyA3x6lbJDBuSoiKaVbLRX5eJz3E-VskOig");

let prompt
let text
async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const result = await model.generateContent(prompt);
  const response = await result.response;
  text = response.text();
}

// Replace 'YOUR_BOT_TOKEN' with your bot's token
const token = '7127664002:AAEjDbtrGIMG0lo-rJdC7HDN279lTH4q3aI';
const bot = new TelegramBot(token, { polling: true });

// Respond to the /start command
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Hello! I am your Telegram bot.');
});

// Echo back any message
bot.on('message', async(msg) => {
  prompt = msg.text
  await run()
  if(prompt=='You are a bastard') {
    bot.sendMessage(msg.chat.id, 'nikal madarchod yaha se')
  } else {
  bot.sendMessage(msg.chat.id, text);
  }
});
