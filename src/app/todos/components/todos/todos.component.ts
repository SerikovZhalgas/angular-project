import { Component, OnInit } from '@angular/core'
import { TodosService } from '../../services/todos.service'
import { Observable, Subscription } from 'rxjs'
import { Todo } from '../../models/todos.model'

@Component({
    selector: 'inst-todos',
    templateUrl: './todos.component.html',
    styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
    todos$!: Observable<Todo[]>
    error = ''
    subscription: Subscription = new Subscription()

    constructor(private todosService: TodosService) {}

    ngOnInit() {
        this.todos$ = this.todosService.todos$
        this.getTodos()
    }

    _getTodos() {
        /*this.subscription.add(
            this.todosService.getTodos().subscribe({
                next: res => {
                    this.todos = res
                },
                error: (error: HttpErrorResponse) => {
                    this.error = error.message
                },
            })
        )*/
    }

    getTodos() {
        this.todosService.getTodos()
    }

    createTodo() {
        const randomNumber = Math.floor(Math.random() * 100)
        const title = 'Angular ' + randomNumber
        this.todosService.createTodo(title)
    }

    deleteTodo() {
        const todoId = 'a3d862c7-b13e-406e-93e0-b65915f1323a'
        this.todosService.deleteTodo(todoId)
    }
}
