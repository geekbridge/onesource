import { getServiceKeyFromUrl } from '../utils'
import { getVkSourceInfo } from './vk/get-vk-source-info'

export async function getSourceInfo(url: string) {
  if (!URL.canParse(url)) {
    throw Error('Invalid URL')
  }

  const serviceKey = getServiceKeyFromUrl(url)!

  if (serviceKey === 'vk') {
    const sourceData = await getVkSourceInfo(url)

    return { ...sourceData, serviceKey }
  }

  return { serviceKey }
}
