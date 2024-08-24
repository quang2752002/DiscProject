import { useEffect, useState } from 'react'

const useDebounce = <T>(value: T|undefined, delay = 500): T|undefined => {
  const [debouncedValue, setDebounceValue] = useState<T|undefined>(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounceValue(value), delay)
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])
  return debouncedValue
}

export default useDebounce
