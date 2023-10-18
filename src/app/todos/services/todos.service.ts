import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, map } from 'rxjs'
import { environment } from '../../../environments/environment'
import { Todo } from '../models/todos.model'
import { CommonResponse } from '../../core/models/core.model'

@Injectable({
    providedIn: 'root',
})
export class TodosService {
    todos$ = new BehaviorSubject<Todo[]>([])

    constructor(private http: HttpClient) {}

    getTodos() {
        this.http.get<Todo[]>(`${environment.baseUrl}/todo-lists`).subscribe(todos => {
            this.todos$.next(todos)
        })
    }

    addTodo(title: string) {
        this.http
            .post<CommonResponse<{ item: Todo }>>(`${environment.baseUrl}/todo-lists`, { title })
            .pipe(
                map(res => {
                    const stateTodos = this.todos$.getValue()
                    const newTodo = res.data.item
                    const newTodos = [newTodo, ...stateTodos]
                    return newTodos
                })
            )
            .subscribe(todos => {
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
}
