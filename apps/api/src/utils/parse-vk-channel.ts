import playwright from 'playwright'

type TVideoData = {
  videoId?: string | null
  title?: string | null
  imageUrl?: string | null
}

export const parseVKChannel = async (channelUrl: string) => {
  console.log(`start parsing: ${channelUrl}`)

  const browser = await playwright.chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()
  // channelUrl ex.: 'https://vk.com/video/@vkvideo'
  await page.goto(channelUrl)

  await page.evaluate(async () => {
    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms))
    for (let i = 0; i < document.body.scrollHeight; i += 100) {
      window.scrollTo(0, i)
      await delay(10)
    }
  })

  // TODO make universal function for channels and playlists
  const videosContainer = await page.$('.video_subtab_pane_all')
  const videos = await videosContainer?.$$eval('.VideoCard', (allVideos) => {
    const data: TVideoData[] = []

    allVideos.forEach((video) => {
      const videoId = video
        ?.querySelector('.VideoCard__thumbLink')
        ?.getAttribute('data-id')
      const title = video.querySelector('.VideoCard__title')?.innerHTML
      const imageUrl = video
        ?.querySelector('.VideoCard__thumb > img')
        ?.getAttribute('src')

      data.push({ videoId, title, imageUrl })
    })

    return data
  })

  await browser.close()

  return videos || []
}
