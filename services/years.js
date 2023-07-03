const minYear = 2011
const maxYear = 2019

export const years = [...Array(maxYear - minYear + 1).keys()].map((i) => ({ id: i + minYear, number: i + minYear }))
