export type AgroupRecord = { dayOfMonth: string, count: number }

export const agroupByCreationDay = (items: { createdAt?: Date }[]) => {
    const map = items.reduce((map, next) => {
        const createdAt = next.createdAt || new Date()
        const key = createdAt.getDate()  + "/" + (createdAt.getMonth()+1) + "/" + createdAt.getFullYear()
        const obj = map.get(key) || { dayOfMonth: key, count: 0 }
        obj.count = obj.count + 1
        map.set(key,obj)
        return map
    }, new Map<string, AgroupRecord>())

    return Array.from(map.values())
}
