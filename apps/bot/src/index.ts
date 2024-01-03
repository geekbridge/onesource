import { Telegraf } from 'telegraf'
import { message } from 'telegraf/filters'
import { createTgUser, createUser, getTgUserById } from './api'
import { checkEnvs } from './utils'

checkEnvs()

const bot = new Telegraf(process.env.BOT_TOKEN!)

bot.start(async (ctx) => {
  try {
    const {
      id,
      username,
      first_name: firstName,
      last_name: lastName,
      is_bot: isBot,
      is_premium: isPremium,
      language_code: languageCode,
    } = ctx.from
    const existedUser = await getTgUserById(id)

    if (existedUser) {
      ctx.reply(`Welcome back ${existedUser.username}`)
      return
    }

    await createTgUser({
      id,
      username,
      isBot,
      isPremium,
    })
    const newUser = await createUser({
      firstName,
      lastName,
      languageCode,
      tgId: id,
    })

    ctx.reply(`Welcome ${newUser.firstName}`)
  } catch (error) {
    console.error(error)
  }
})
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on(message('sticker'), (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.command('info', (ctx) => ctx.reply('Some info'))
bot.on(message('text'), (ctx) => ctx.reply('Hello'))
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
