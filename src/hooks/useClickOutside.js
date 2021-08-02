import { useEffect, useRef } from 'react'

export default function useClickOutside (closeModal) {
  const domRef = useRef()
  useEffect(() => {
    const handler = (event) => {
      !domRef.current?.contains(event.target) && closeModal()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  })
  return domRef
}
