import { Telegraf } from 'telegraf'
import { message } from 'telegraf/filters'

if (!process.env.BOT_TOKEN) {
  throw new Error('process.env.BOT_TOKEN is missing')
}

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on(message('sticker'), (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.command('info', (ctx) => ctx.reply('Some info'))
bot.on(message('text'), (ctx) => ctx.reply('Hello'))
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
