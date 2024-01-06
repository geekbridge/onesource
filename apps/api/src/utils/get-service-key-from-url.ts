export function getServiceKeyFromUrl(url: string) {
  const { host } = new URL(url)
  return host.split('.').at(-2)
}
