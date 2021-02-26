export const berufe = [
    "Informatik",
    "Kundendialog",
    "Kaufmann / Kauffrau"
]
export const regionen = [
    "Winterthur",
    "Bern",
    "St. Gallen",
    "Zürich",
    "Ticino",
    "Suisse Romande"
]
export const zeitraum = [
    {ind: 1, label: "Januar", row: 1},
    {ind: 2, label: "Februar", row: 1},
    {ind: 3, label: "März", row: 1},
    {ind: 4, label: "April", row: 2},
    {ind: 5, label: "Mai", row: 2},
    {ind: 6, label: "Juni", row: 2},
    {ind: 7, label: "Juli", row: 3},
    {ind: 8, label: "August", row: 3},
    {ind: 9, label: "September", row: 3},
    {ind: 10, label: "Oktober", row: 4},
    {ind: 11, label: "November", row: 4},
    {ind: 12, label: "Dezember", row: 4},
]

export const timeOptions = {
    hour: 'numeric',
    minute: 'numeric'
}

export const filtersOptions = [
    {value: "berufe", label: "Beruf", options: berufe, short: 'beruf'},
    {value: "regionen", label: "Region", options: regionen, short: 'region'}
]
