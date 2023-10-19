import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { BehaviorSubject, map } from 'rxjs'
import { DomainTask, GetTasksResponse, Task, UpdateTaskModel } from '../models/tasks.model'
import { CommonResponse } from '../../core/models/core.model'

@Injectable({
    providedIn: 'root',
})
export class TasksService {
    tasks$ = new BehaviorSubject<DomainTask>({})

    constructor(private http: HttpClient) {}

    getTasks(todoId: string) {
        this.http
            .get<GetTasksResponse>(`${environment.baseUrl}/todo-lists/${todoId}/tasks`)
            .pipe(map(res => res.items))
            .subscribe(tasks => {
                const stateTasks = this.tasks$.getValue()
                stateTasks[todoId] = tasks
                this.tasks$.next(stateTasks)
            })
    }

    addTask(data: { todoId: string; title: string }) {
        this.http
            .post<CommonResponse<{ item: Task }>>(
                `${environment.baseUrl}/todo-lists/${data.todoId}/tasks`,
                {
                    title: data.title,
                }
            )
            .pipe(
                map(res => {
                    const stateTasks = this.tasks$.getValue()
                    const newTask = res.data.item
                    stateTasks[data.todoId] = [newTask, ...stateTasks[data.todoId]]
                    return stateTasks
                })
            )
            .subscribe(tasks => this.tasks$.next(tasks))
    }

    deleteTask(data: { taskId: string; todoId: string }) {
        this.http
            .delete<CommonResponse>(
                `${environment.baseUrl}/todo-lists/${data.todoId}/tasks/${data.taskId}`
            )
            .pipe(
                map(_ => {
                    const stateTasks = this.tasks$.getValue()
                    const tasksForTodo = stateTasks[data.todoId]
                    stateTasks[data.todoId] = tasksForTodo.filter(ts => ts.id !== data.taskId)
                    return stateTasks
                })
            )
            .subscribe((tasks: DomainTask) => this.tasks$.next(tasks))
    }

    updateTask(data: { taskId: string; todoId: string; model: UpdateTaskModel }) {
        this.http
            .put<CommonResponse>(
                `${environment.baseUrl}/todo-lists/${data.todoId}/tasks/${data.taskId}`,
                data.model
            )
            .pipe(
                map(_ => {
                    const stateTasks = this.tasks$.getValue()
                    const tasksForTodo = stateTasks[data.todoId]
                    stateTasks[data.todoId] = tasksForTodo.map(ts =>
                        ts.id === data.taskId ? { ...ts, ...data.model } : ts
                    )
                    return stateTasks
                })
            )
            .subscribe((tasks: DomainTask) => this.tasks$.next(tasks))
    }
}
