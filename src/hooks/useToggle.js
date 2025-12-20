import { useState, useCallback } from 'react'

export default function useToggle(initial = false) {
  const [state, setState] = useState(initial)
  const toggle = useCallback(() => setState((s) => !s), [])
  return [state, toggle, setState]
}
