import ReactDom from 'react-dom/client'
import Loading from './loading'
let count = 0
export function showLoading() {
  if (count === 0) {
    const divEle = document.createElement('div') as HTMLDivElement
    divEle.id = 'loading'
    document.body.appendChild(divEle)
    ReactDom.createRoot(divEle).render(<Loading />)
  }
  count++
}

export function hideLoading() {
  if (count < 0) return
  count--
  if (count === 0) document.body.removeChild(document.querySelector('#loading') as HTMLDivElement)
}
