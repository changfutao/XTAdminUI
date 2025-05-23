/**
 * localStorage模块封装
 */
export default {
  /**
   * storage存储
   * @param key {string} 参数名称
   * @param value {any} 写入值
   */
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  /**
   * storage读取
   * @param key {string} 参数名称
   * @returns storage值
   */
  get(key: string) {
    const value = localStorage.getItem(key)
    if (!value) return ''
    try {
      return JSON.parse(value)
    } catch (error) {
      return value
    }
  },
  /**
   * storage删除
   * @param key {string} 参数名称
   */
  remove(key: string) {
    localStorage.removeItem(key)
  },
  /**
   * storage清空
   */
  clear() {
    localStorage.clear()
  }
}
