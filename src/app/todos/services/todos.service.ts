import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, map } from 'rxjs'
import { environment } from '../../../environments/environment'
import { DomainTodo, FilterType, Todo } from '../models/todos.model'
import { CommonResponse } from '../../core/models/core.model'

@Injectable({
    providedIn: 'root',
})
export class TodosService {
    todos$ = new BehaviorSubject<DomainTodo[]>([])

    constructor(private http: HttpClient) {}

    getTodos() {
        this.http
            .get<Todo[]>(`${environment.baseUrl}/todo-lists`)
            .pipe(
                map(todos => {
                    const newTodos: DomainTodo[] = todos.map(tl => ({ ...tl, filter: 'all' }))
                    return newTodos
                })
            )
            .subscribe((todos: DomainTodo[]) => {
                this.todos$.next(todos)
            })
    }

    addTodo(title: string) {
        this.http
            .post<CommonResponse<{ item: Todo }>>(`${environment.baseUrl}/todo-lists`, { title })
            .pipe(
                map(res => {
                    const stateTodos = this.todos$.getValue()
                    const newTodo: DomainTodo = { ...res.data.item, filter: 'all' }
                    return [newTodo, ...stateTodos]
                })
            )
            .subscribe((todos: DomainTodo[]) => {
                this.todos$.next(todos)
            })
    }

    deleteTodo(todoId: string) {
        this.http
            .delete(`${environment.baseUrl}/todo-lists/${todoId}`)
            .pipe(
                map(_ => {
                    const stateTodos = this.todos$.getValue()
                    return stateTodos.filter(tl => tl.id !== todoId)
                })
            )
            .subscribe(todos => {
                this.todos$.next(todos)
            })
    }

    updateTodoTitle(data: { todoId: string; title: string }) {
        this.http
            .put<CommonResponse>(`${environment.baseUrl}/todo-lists/${data.todoId}`, {
                title: data.title,
            })
            .pipe(
                map(_ => {
                    const stateTodos = this.todos$.getValue()
                    return stateTodos.map(tl =>
                        tl.id === data.todoId ? { ...tl, title: data.title } : tl
                    )
                })
            )
            .subscribe(todos => {
                this.todos$.next(todos)
            })
    }

    changeFilter(data: { filter: FilterType; todoId: string }) {
        const stateTodos = this.todos$.getValue()
        const newTodos = stateTodos.map(tl =>
            tl.id === data.todoId ? { ...tl, filter: data.filter } : tl
        )
        this.todos$.next(newTodos)
    }
}
