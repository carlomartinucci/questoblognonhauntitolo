import { useRef, useEffect } from "react"

// Thanks to https://joshwcomeau.com/snippets/react-hooks/use-interval
// and to https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback, delay) {
  const intervalId = useRef(null)
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback
  })

  useEffect(() => {
    const tick = () => savedCallback.current()
    if (typeof delay === "number") {
      intervalId.current = global.setInterval(tick, delay)
      return () => global.clearInterval(intervalId.current)
    }
  }, [delay])

  return intervalId.current
}

export default useInterval
