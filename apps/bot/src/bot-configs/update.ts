import { Telegram } from 'telegraf'
import { checkEnvs } from '../utils'

checkEnvs()

const botApi = new Telegram(process.env.BOT_TOKEN!)

async function updateConfigs() {
  console.info('Updating bot configs...')
  await botApi.setMyDescription('Description')
  await botApi.setMyShortDescription('Short description')
  console.info('Bot updated successful!')
  process.exit()
}

updateConfigs()
