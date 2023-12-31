export function checkEnvs() {
  if (!process.env.BOT_TOKEN) {
    throw new Error('process.env.BOT_TOKEN is missing')
  }

  if (!process.env.API_URL) {
    throw new Error('process.env.API_URL is missing')
  }
}
