import { Telegraf } from 'telegraf'
import { message } from 'telegraf/filters'
import { createTgUser, getTgUserById } from './api'
import { checkEnvs } from './utils'
import { subscribe } from './api/subscriptions'

checkEnvs()

const bot = new Telegraf(process.env.BOT_TOKEN!)

bot.start(async (ctx) => {
  try {
    const {
      id: tgId,
      username,
      first_name: firstName,
      last_name: lastName,
      is_bot: isBot,
      is_premium: isPremium,
      language_code: languageCode,
    } = ctx.from
    const existedUser = await getTgUserById(tgId)

    if (existedUser) {
      ctx.reply(`Welcome back ${existedUser.username}`)
      return
    }

    const newTgUser = await createTgUser({
      tgId,
      username,
      isBot,
      isPremium,
      firstName,
      lastName,
      languageCode,
    })

    ctx.reply(`Welcome ${newTgUser.username}`)
  } catch (error) {
    console.error(error)
  }
})

bot.on(message('text'), async (ctx) => {
  try {
    await subscribe({
      url: ctx.message.text,
      tgUserId: ctx.from.id,
    })

    ctx.reply('Subscription created')
  } catch (error) {
    ctx.reply('Something went wrong :(')
  }
})

bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on(message('sticker'), (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.command('info', (ctx) => ctx.reply('Some info'))
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
