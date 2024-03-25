import * as _ from 'lodash'

export default function getSort(sortBy) {
    const lstSorts = sortBy.split(',').map(item => item.trim())
    let sort = {}
    for (let s of lstSorts) {
        if (_.startsWith(s, '-')) {
            sort[s.slice(1)] = -1
        } else {
            sort[s] = 1
        }
    }
    return sort
}