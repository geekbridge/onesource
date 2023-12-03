import { buildServer } from './server'
import { parseVKChannel } from './utils/parseVKChannel'

const PORT = Number(process.env.PORT) || 8080

const server = buildServer()

async function main() {
  try {
    await server.listen({ port: PORT })

    console.log(`Server ready at http://localhost:${PORT}`)

    const videos = await parseVKChannel('https://vk.com/video/@vkvideo')

    console.log('length', videos.length)
    console.log('first', videos[0])
    console.log('last', videos[videos.length - 1])
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

main()
