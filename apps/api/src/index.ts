import { buildServer } from './server'

const PORT = Number(process.env.PORT) || 8080

const server = buildServer()

async function main() {
  try {
    await server.listen({ port: PORT })

    console.log(`Server ready at http://localhost:${PORT}`)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

main()
