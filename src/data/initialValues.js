export const standardBerufe = [
    "Informatik",
    "Kundendialog",
    "Kaufmann / Kauffrau"
]
export const standardRegionen = [
    "Winterthur",
    "Bern",
    "St. Gallen",
    "Zürich",
    "Ticino",
    "Suisse Romande"
]
// bei javascript .getMonth() ist Januar 0
export const zeitraum = [
    {ind: 0, label: "Januar", row: 1},
    {ind: 1, label: "Februar", row: 1},
    {ind: 2, label: "März", row: 1},
    {ind: 3, label: "April", row: 2},
    {ind: 4, label: "Mai", row: 2},
    {ind: 5, label: "Juni", row: 2},
    {ind: 6, label: "Juli", row: 3},
    {ind: 7, label: "August", row: 3},
    {ind: 8, label: "September", row: 3},
    {ind: 9, label: "Oktober", row: 4},
    {ind: 10, label: "November", row: 4},
    {ind: 11, label: "Dezember", row: 4},
]

export const noten = [
    {value: 2, label: "<3"},
    {value: 3, label: "3"},
    {value: 3.5, label: "3.5"},
    {value: 4, label: "4"},
    {value: 4.5, label: "4.5"},
    {value: 5, label: "5"},
    {value: 5.5, label: "5.5"},
    {value: 6, label: "6"},
]

export const niveaus = [
    {value: 1, label: "höchstes"},
    {value: 2, label: "mittleres"},
    {value: 3, label: "tiefstes"},
]

export const timeOptions = {
    hour: 'numeric',
    minute: 'numeric'
}

export const filtersOptions = [
    {value: "berufe", label: "Beruf", short: 'beruf', other: 'regionen', otherShort: 'region'},
    {value: "regionen", label: "Region", short: 'region', other: 'berufe', otherShort: 'beruf'}
]
