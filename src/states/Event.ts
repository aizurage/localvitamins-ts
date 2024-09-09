export interface Event {
    eventID: string
    title: string
    region: string
    date: string
    period:{
        from: string
        to: string
    }
    target: string
    content: string
    belongings: string
    clothes: string
    reward: string
    site: string
    inquiry: string
    eventUniqueID: string
    eventCreaterUniqueID: string
    tags: string[]
    imageUrl: string
}