import { useEffect, useRef } from "react"

export const useDocumentTitle = (title: string, keepOnUnmont: boolean = true) => {
  const oldTitle = useRef(document.title).current
  useEffect(() => {
    document.title = title
  }, [title])
  useEffect(() => {
    return () => {
      if (!keepOnUnmont) {
        document.title = oldTitle
      }
    }
  }, [keepOnUnmont, oldTitle])
}