/**
 * @param {string|number} timestamp
 * @returns {string}
 */
export const getTimestampFromSqlTimestamp = (timestamp) => {
  const date = new Date(timestamp)
  const dateAsString = getDateStringFromDate(date)
  return `${dateAsString}`
}

/**
 * @param {Date} date
 * @returns {string}
 */
export const getDateStringFromDate = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const paddedMonth = String(month).padStart(2, '0')
  const paddedDay = String(day).padStart(2, '0')

  return `${year}-${paddedMonth}-${paddedDay}`
}

/**
 * @param {Date} date
 * @returns {string}
 */
export const getTimeStringFromDate = (date) => {
  const hour = date.getHours()
  const minutes = date.getMinutes()

  const paddedHour = String(hour).padStart(2, '0')
  const paddedMinutes = String(minutes).padStart(2, '0')

  return `${paddedHour}:${paddedMinutes}`
}
