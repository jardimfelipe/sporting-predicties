import { useEffect } from "react"

type HandlerEvent = MouseEvent | TouchEvent

export const useOnClickOutside = (
  ref: any,
  handler: (event: HandlerEvent) => void
) => {
  useEffect(() => {
    const listener = (event: HandlerEvent) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return
      }

      handler(event)
    }

    document.addEventListener("mousedown", listener)
    document.addEventListener("touchstart", listener)

    return () => {
      document.removeEventListener("mousedown", listener)
      document.removeEventListener("touchstart", listener)
    }
  }, [ref, handler])
}
