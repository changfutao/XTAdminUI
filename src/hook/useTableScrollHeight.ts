import { RefObject, useEffect, useRef, useState } from 'react'
const useTableScrollHeight = (): [RefObject<HTMLDivElement | null>, number] => {
  const tableRef = useRef<HTMLDivElement>(null)
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)
  const [tableHeight, setTableHeight] = useState(0)
  const getWindowHeight = () => {
    setWindowHeight(window.innerHeight)
  }
  window.addEventListener('resize', getWindowHeight)
  useEffect(() => {
    if (tableRef && tableRef.current) {
      setTableHeight(tableRef.current.offsetHeight - 169)
    }
    return () => {
      window.removeEventListener('resize', getWindowHeight)
    }
  }, [windowHeight])

  return [tableRef, tableHeight]
}

export default useTableScrollHeight
