import './loading.less'
let count = 0

export function showLoading() {
  if (count === 0) {
    const loading = document.querySelector('#loading') as HTMLDivElement
    loading.style.display = 'flex'
  }
  count++
}

export function hideLoading() {
  if (count < 0) return
  count--
  if (count === 0) {
    const loading = document.querySelector('#loading') as HTMLDivElement
    loading.style.display = 'none'
  }
}
