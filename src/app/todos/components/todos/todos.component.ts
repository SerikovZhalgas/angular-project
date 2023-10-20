import { Component, OnInit } from '@angular/core'
import { TodosService } from '../../services/todos.service'
import { Observable } from 'rxjs'
import { DomainTodo } from '../../models/todos.model'
import { AuthService } from '../../../core/services/auth.service'

@Component({
    selector: 'tl-todos',
    templateUrl: './todos.component.html',
    styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
    todos$?: Observable<DomainTodo[]>
    todoTitle = ''

    constructor(
        private todosService: TodosService,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.todos$ = this.todosService.todos$

        this.todosService.getTodos()
    }

    addTodoHandler() {
        this.todosService.addTodo(this.todoTitle)
        this.todoTitle = ''
    }

    deleteTodo(todoId: string) {
        this.todosService.deleteTodo(todoId)
    }

    editTodo(data: { todoId: string; title: string }) {
        this.todosService.updateTodoTitle(data)
    }

    logoutHandler() {
        this.authService.logout()
    }
}
