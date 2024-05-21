const extractIdfromUrl = (url) => {
  return url.split('/').pop()
}

const extracdIdsFromUrlList = (urls) => {
  return urls.map(extractIdfromUrl).join(',')
}

export { extracdIdsFromUrlList }
