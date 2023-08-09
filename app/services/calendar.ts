const minYear = 2011
const maxYear = 2019

export const years: Year[] = [...Array(maxYear - minYear + 1).keys()].map((i) => ({
    id: i + minYear,
    number: i + minYear,
}))

export function getMonthName(monthNumber: number) {
    var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"  ]

    return monthNames[monthNumber]
}

export function getCalendar(minDate : any, maxDate : any)  {
    const minYear = minDate.getFullYear();
    //const minMonth = minDate.getMonth();
    const maxYear = maxDate.getFullYear();
    //const maxMonth = maxDate.getMonth();

    const calendar = [];

    for (let id = minYear; id <= maxYear; id ++) {
        let number = id
            calendar.push({
                id,
                number
            })
    }
    return calendar;
}