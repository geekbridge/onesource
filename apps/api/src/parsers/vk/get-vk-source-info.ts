import playwright from 'playwright'

const CHANNEL_NAME_SELECTOR = 'h2.vkuiTitle--level-2'
const CHANNEL_ID_ATTRIBUTE = 'data-owner-id'
const CHANNEL_IMAGE_TAG_SELECTOR = '.vkuiAvatar > .vkuiImageBase__img'

const PLAYLIST_TITLE_SELECTOR = '.VideoInfoPanel__title'
const PLAYLIST_ID_ATTRIBUTE = 'data-playlist-raw-id'
const PLAYLIST_IMAGE_TAG_SELECTOR =
  '.VideoInfoPanel__cover > .VideoInfoPanel__coverImage'

export const getVkSourceInfo = async (sourceUrl: string) => {
  console.log(`getVkSourceInfo: ${sourceUrl}`)

  const browser = await playwright.chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()
  await page.goto(sourceUrl)

  const channelName = await (await page.$(CHANNEL_NAME_SELECTOR))?.innerText()

  if (channelName) {
    const channelId = await (
      await page.$(`*[${CHANNEL_ID_ATTRIBUTE}]`)
    )?.getAttribute(CHANNEL_ID_ATTRIBUTE)
    const channelImageUrl = await (
      await page.$(CHANNEL_IMAGE_TAG_SELECTOR)
    )?.getAttribute('src')

    const { origin, pathname } = new URL(sourceUrl)

    await browser.close()

    return {
      key: channelId,
      name: channelName,
      imageUrl: channelImageUrl,
      sourceUrl: origin + pathname,
      type: 'channel',
    }
  }

  const playlistName = await (
    await page.$(PLAYLIST_TITLE_SELECTOR)
  )?.innerText()

  if (playlistName) {
    const playlistId = await (
      await page.$(`*[${PLAYLIST_ID_ATTRIBUTE}]`)
    )?.getAttribute(PLAYLIST_ID_ATTRIBUTE)
    const playlistImageUrl = await (
      await page.$(PLAYLIST_IMAGE_TAG_SELECTOR)
    )?.getAttribute('src')
    const { origin, pathname } = new URL(sourceUrl)

    return {
      key: playlistId,
      name: playlistName,
      imageUrl: playlistImageUrl,
      sourceUrl: origin + pathname,
      type: 'playlist',
    }
  }
}
