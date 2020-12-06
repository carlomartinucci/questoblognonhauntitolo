import { useState, useEffect } from "react"

const useRandom = array => {
  const [value, setValue] = useState(null)

  useEffect(() => {
    if (value === null) {
      setValue(array[Math.floor(Math.random() * array.length)])
    }
  }, [array, value, setValue])

  return value
}

export default useRandom
