require('dotenv').config({ path: '.env.local' });
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const route = express.Router();
console.log(process.env.BACK_PORT, process.env.MAILER);
const port = process.env.BACK_PORT || 5000;
app.use('/v1', route);

const bot = new TelegramBot(process.env.BOT_KEY);
const transporter = nodemailer.createTransport({
  port: 465, // true for 465, false for other ports
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.MAILER,
    pass: process.env.PASS,
  },
  secure: true,
});

app.post('/mailer/send-email', async (req, res) => {
  const { name, contact, text } = req.body;

  const mailData = {
    from: process.env.MAILER,
    to: process.env.TO_MAIL,
    subject: 'Message from your website!',
    html: `
    <h1>Message:</h1>
    <p>Name: ${name}</p>
    <p>Contact: ${contact}</p>
    <p>Message: ${text}</p>
    `,
  };

  try {
    const result = await transporter.sendMail(mailData);
    await bot.sendMessage(
      process.env.CHAT_ID,
      `Message from your website!\nName: ${name}\nContact: ${contact}\nMessage: ${text}`,
    );
    await bot.sendSticker(
      process.env.CHAT_ID,
      'CAACAgIAAxkBAAMQY3Kc8HcD4UmestLEv30qTefeMJEAArckAAJKFJhLyw3BVbosfZwrBA',
    );

    res.send({ status: 'success', data: result.messageId });
  } catch (error) {
    console.log(error);
    res.send({ status: 'error', data: null });
  }
});

app.post('/api/send-email', async (req, res) => {
  res.send({ status: 'success', data: 'result.messageId' });
  // res.send({ status: 'error', data: null });
});

app.get('/api/hello', async (req, res) => {
  res.send('Hello world!');
});

app.use(cors({
  origin: 'https://varuddo.com'
}));
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
