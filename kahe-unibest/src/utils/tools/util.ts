import * as CryptoJS from 'crypto-js'

const toString = Object.prototype.toString

export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const showInGroupImage = () => {
  uni.previewImage({
    current: 'https://jms.85gui7.com/kahe-202510/share-inGroup.jpg',
    urls: ['https://jms.85gui7.com/kahe-202510/share-inGroup.jpg']
  })
}

export function calculateMD5(inputNumber: number, length: number): string {
  // 将数字转换成字符串
  const inputString = inputNumber.toString()
  // 使用 CryptoJS 计算 SHA-256 哈希值
  const sha256Hash = CryptoJS.SHA256(inputString)
  // 将哈希值转换成十六进制字符串
  const hexString = sha256Hash.toString(CryptoJS.enc.Hex)
  // 截取前 8 位作为独一的字符串
  const uniqueString = hexString.substring(0, 8)
  return uniqueString.toUpperCase()
}
export const isValidURL = (url: string) => {
  const reg =
    /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

export function shuffle(arr: any[]) {
  let i = arr.length
  while (i) {
    const j = Math.floor(Math.random() * i--)
    ;[arr[j], arr[i]] = [arr[i], arr[j]]
  }
  return arr
}

export function duplicates(array: any[]) {
  const result: any[] = []
  array.forEach((item) => {
    if (result.indexOf(item) == -1) {
      result.push(item)
    }
  })
  const map: {}[] = []
  result.forEach((item) => {
    let num = 0
    array.forEach((a) => {
      if (a === item) {
        num += 1
      }
    })
    map.push({
      level: item,
      count: num
    })
  })
  return map
}

export function formatPrice(price: number) {
  if (price < 10000) {
    return price.toFixed(2) + ''
  } else if (price < 10000 * 10000) {
    return (price / 10000).toFixed(2) + '万'
  } else {
    return (price / (10000 * 10000)).toFixed(2) + '亿'
  }
}

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

export const getRandomNum = (min: number, max: number): number => {
  const range = max - min
  const rand = Math.random()
  return min + Math.round(rand * range)
}

export const parseTime = (
  time?: object | string | number | null,
  cFormat?: string
): string | null => {
  if (time === undefined || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date: Date
  if (typeof time === 'object') {
    date = time as Date
  } else {
    if (typeof time === 'string') {
      time = time.split('.')[0]
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj: { [key: string]: number } = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }

  return format.replace(/{([ymdhisa])+}/g, (_, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
}

/**
 * 实时时间转换指令，大于一个月则返回具体的年月日
 * @param { string } timeStamp - 时间 格式：年-月-日 时:分:秒 或 时间戳
 * @returns { string }
 */
export function getFormatTime(timeStamp: string) {
  timeStamp = timeStamp.replace(/-/g, '/')
  const dateTime = new Date(timeStamp)
  const no1new = dateTime.valueOf()
  const year = dateTime.getFullYear()
  const month = dateTime.getMonth() + 1
  const day = dateTime.getDate()
  const hour = dateTime.getHours()
  const minute = dateTime.getMinutes()
  const second = dateTime.getSeconds()
  const now = new Date()
  const now_new = now.valueOf()
  let milliseconds = 0
  let timeSpanStr

  milliseconds = now_new - no1new

  if (milliseconds <= 1000 * 60) {
    timeSpanStr = '刚刚'
  } else if (1000 * 60 < milliseconds && milliseconds <= 1000 * 60 * 60) {
    timeSpanStr = Math.round(milliseconds / (1000 * 60)) + '分钟前'
  } else if (1000 * 60 * 60 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
    timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前'
  } else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
    timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前'
  } else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
    // timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    timeSpanStr = year + '-' + month + '-' + day
  } else {
    // timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    timeSpanStr = year + '-' + month + '-' + day
  }

  return timeSpanStr
}

export function getPassTime(time: number): string {
  let timeSpanStr
  if (time <= 1000 * 60) {
    timeSpanStr = Math.round(time / 1000) + '秒'
  } else if (1000 * 60 < time && time <= 1000 * 60 * 60) {
    timeSpanStr = Math.round(time / (1000 * 60)) + '分钟'
  } else if (1000 * 60 * 60 < time && time <= 1000 * 60 * 60 * 24) {
    timeSpanStr = Math.round(time / (1000 * 60 * 60)) + '小时'
  } else if (1000 * 60 * 60 * 24 < time && time <= 1000 * 60 * 60 * 24 * 15) {
    timeSpanStr = Math.round(time / (1000 * 60 * 60 * 24)) + '天'
  } else {
    timeSpanStr = Math.round(time / (1000 * 60 * 60 * 24)) + '天'
  }
  return timeSpanStr + ''
}

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`
}

export function isDef<T = unknown>(val?: T): val is T {
  return typeof val !== 'undefined'
}

export function isUnDef<T = unknown>(val?: T): val is T {
  return !isDef(val)
}

export function isObject(val: any): val is Record<any, any> {
  return val !== null && is(val, 'Object')
}

export function isEmpty<T = unknown>(val: T): val is T {
  if (isArray(val) || isString(val)) {
    return val.length === 0
  }

  if (val instanceof Map || val instanceof Set) {
    return val.size === 0
  }

  if (isObject(val)) {
    return Object.keys(val).length === 0
  }

  return false
}

export function isNull(val: unknown): val is null {
  return val === null
}

// 是否是 null
export function isnull(val: unknown): val is null {
  return is(val, 'Null')
}

export function isNullAndUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) && isNull(val)
}

export function isNullOrUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) || isNull(val)
}

export function isNumber(val: unknown): val is number {
  return is(val, 'Number')
}

export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

export function isString(val: unknown): val is string {
  return is(val, 'String')
}

export function isFunction(val: unknown): val is Function {
  return typeof val === 'function'
}

export function isBoolean(val: unknown): val is boolean {
  return is(val, 'Boolean')
}

export function isRegExp(val: unknown): val is RegExp {
  return is(val, 'RegExp')
}

export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val)
}

export function isWindow(val: any): val is Window {
  return typeof window !== 'undefined' && is(val, 'Window')
}

export function isElement(val: unknown): val is Element {
  return isObject(val) && !!val.tagName
}

export function isMap(val: unknown): val is Map<any, any> {
  return is(val, 'Map')
}

export const isServer = typeof window === 'undefined'

export const isClient = !isServer

export function isUrl(path: string): boolean {
  const reg =
    /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/
  return reg.test(path)
}
/** 电话脱敏 */
export function phoneFormat(val: string) {
  return val.replace(/(\d{3})\d*(\d{4})/, '$1****$2')
}

export function removeNullFields(obj: Record<string, any>): Record<string, any> {
  for (const key in obj) {
    if (obj[key] === null) {
      delete obj[key]
    }
  }
  return obj
}
