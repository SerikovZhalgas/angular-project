export interface Todo {
    addedDate: string
    id: string
    order: number
    title: string
}

export type FilterType = 'all' | 'active' | 'completed'

export interface DomainTodo extends Todo {
    filter: FilterType
}
