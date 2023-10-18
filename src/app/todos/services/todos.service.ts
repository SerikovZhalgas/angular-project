import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { BehaviorSubject, catchError, EMPTY, map } from 'rxjs'
import { BeautyLoggerService } from '../../core/services/beauty-logger.service'
import { environment } from '../../../environments/environment'
import { Todo } from '../models/todos.model'
import { BaseResponse } from '../../core/models/core.model'

@Injectable({
    providedIn: 'root',
})
export class TodosService {
    todos$ = new BehaviorSubject<Todo[]>([])

    httpOptions = {
        withCredentials: true,
        headers: {
            'api-key': environment.apiKey,
        },
    }
    constructor(
        private http: HttpClient,
        private beautyLoggerService: BeautyLoggerService
    ) {}

    getTodos() {
        this.http
            .get<Todo[]>(`${environment.baseUrl}/todo-lists`, this.httpOptions)
            .pipe(catchError(this.errorHandler.bind(this)))
            .subscribe(todos => {
                this.todos$.next(todos)
            })
    }

    createTodo(title: string) {
        this.http
            .post<BaseResponse<{ item: Todo }>>(
                `${environment.baseUrl}/todo-lists`,
                { title },
                this.httpOptions
            )
            .pipe(
                catchError(this.errorHandler.bind(this)),
                map(res => {
                    const newTodo = res.data.item
                    const stateTodos = this.todos$.getValue()
                    return [newTodo, ...stateTodos]
                })
            )
            .subscribe(todos => {
                this.todos$.next(todos)
            })
    }

    deleteTodo(todoId: string) {
        this.http
            .delete<BaseResponse>(`${environment.baseUrl}/todo-lists/${todoId}`, this.httpOptions)
            .pipe(
                catchError(this.errorHandler.bind(this)),
                map(() => {
                    return this.todos$.getValue().filter(tl => tl.id !== todoId)
                })
            )
            .subscribe(todos => {
                this.todos$.next(todos)
            })
    }

    private errorHandler(err: HttpErrorResponse) {
        this.beautyLoggerService.log(err.message, 'error')
        return EMPTY
    }
}
