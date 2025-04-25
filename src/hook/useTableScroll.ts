import { RefObject, useEffect, useRef, useState } from 'react'
const useTableScrollHeight = (): [RefObject<HTMLDivElement | null>, number, number] => {
  const tableRef = useRef<HTMLDivElement>(null)
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [tableHeight, setTableHeight] = useState(0)
  const [tableWidth, setTableWidth] = useState(0)
  const getWindowChange = () => {
    setWindowHeight(window.innerHeight)
    setWindowWidth(window.innerWidth)
  }
  window.addEventListener('resize', getWindowChange)
  useEffect(() => {
    if (tableRef && tableRef.current) {
      setTableHeight(tableRef.current.offsetHeight - 169)
      setTableWidth(windowWidth - 240)
    }
    return () => {
      window.removeEventListener('resize', getWindowChange)
    }
  }, [windowHeight, windowWidth])

  return [tableRef, tableHeight, tableWidth]
}

export default useTableScrollHeight
