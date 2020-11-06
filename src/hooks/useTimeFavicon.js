import useInterval from "./useInterval"

const delay = 60 * 1000

const changeFavicon = emoji => {
  const link =
    document.querySelector("link[rel*='icon']") ||
    document.createElement("link")
  link.type = "image/svg+xml"
  link.rel = "shortcut icon"
  link.href = faviconHref(emoji)

  document.getElementsByTagName("head")[0].appendChild(link)
}

const faviconHref = emoji =>
  `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22256%22 height=%22256%22 viewBox=%220 0 100 100%22><text x=%2250%%22 y=%2250%%22 dominant-baseline=%22central%22 text-anchor=%22middle%22 font-size=%2280%22>${emoji}</text></svg>`

const useTimeFavicon = () => {
  const emoji = currentEmoji()
  changeFavicon(emoji)

  useInterval(() => {
    const emoji = currentEmoji()
    changeFavicon(emoji)
  }, delay)
}

const currentEmoji = () => {
  const time = new Date(Date.now() + 15 * 60 * 1000)

  return {
    "0.0": "🕛",
    "0.30": "🕧",
    "1.0": "🕐",
    "1.30": "🕜",
    "2.0": "🕑",
    "2.30": "🕝",
    "3.0": "🕒",
    "3.30": "🕞",
    "4.0": "🕓",
    "4.30": "🕟",
    "5.0": "🕔",
    "5.30": "🕠",
    "6.0": "🕕",
    "6.30": "🕡",
    "7.0": "🕖",
    "7.30": "🕢",
    "8.0": "🕗",
    "8.30": "🕣",
    "9.0": "🕘",
    "9.30": "🕤",
    "10.0": "🕙",
    "10.30": "🕥",
    "11.0": "🕚",
    "11.30": "🕦",
  }[`${time.getHours() % 12}.${time.getMinutes() < 30 ? 0 : 30}`]
}

export default useTimeFavicon
