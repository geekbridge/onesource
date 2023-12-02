if (!process.env.DB_URL) {
  throw Error('DB_URL not declared')
}

export const DB_URL = process.env.DB_URL
