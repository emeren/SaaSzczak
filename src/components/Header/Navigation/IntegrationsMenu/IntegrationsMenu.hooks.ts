import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'

export const useCloseDetailsOnOutsideClick =
  (): RefObject<HTMLDetailsElement | null> => {
    const detailsRef = useRef<HTMLDetailsElement>(null)

    useEffect(() => {
      const handleClick = (event: MouseEvent) => {
        const details = detailsRef.current
        if (details?.open && !details.contains(event.target as Node)) {
          details.open = false
        }
      }

      document.addEventListener('mousedown', handleClick)
      return () => document.removeEventListener('mousedown', handleClick)
    }, [])

    return detailsRef
  }
