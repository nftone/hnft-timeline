const minYear = 2011
const maxYear = 2019

export const years: Year[] = [...Array(maxYear - minYear + 1).keys()].map(
  (i) => ({
    id: i + minYear,
    number: i + minYear,
  })
)

export function getMonthName(monthNumber: number) {
  var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  return monthNames[monthNumber - 1]
}

export const getCalendar = (minDate: Date, maxDate: Date): CalendarYear[] => {
  const minYear = minDate.getFullYear()
  const minMonth = minDate.getMonth() + 1
  const maxYear = maxDate.getFullYear()
  const maxMonth = maxDate.getMonth() + 1

  const calendar: CalendarYear[] = []

  for (let year = minYear; year <= maxYear; year++) {
    const months = calendar.push({
      year: {
        number: year,
      },

      months: [...Array(12).keys()].map((i) => i + 1),
    })
  }

  return calendar
}
