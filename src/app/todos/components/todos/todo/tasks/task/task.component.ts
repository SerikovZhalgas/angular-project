import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Task, UpdateTaskModel } from '../../../../../models/tasks.model'
import { TaskStatusEnum } from '../../../../../../core/enums/taskStatus.enum'

@Component({
    selector: 'tl-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
    @Input() task!: Task
    @Output() deleteTaskEvent = new EventEmitter<{ taskId: string; todoId: string }>()
    @Output() updateTaskEvent = new EventEmitter<{
        taskId: string
        todoId: string
        model: UpdateTaskModel
    }>()

    taskStatusEnum = TaskStatusEnum
    newTitle = ''
    editMode = false

    deleteTaskHandler() {
        this.deleteTaskEvent.emit({ todoId: this.task.todoListId, taskId: this.task.id })
    }

    changeTaskStatusHandler(event: MouseEvent) {
        const newStatus = (event.currentTarget as HTMLInputElement).checked
        this.changeTask({
            status: newStatus ? this.taskStatusEnum.completed : this.taskStatusEnum.active,
        })
    }

    activateEditMode() {
        this.editMode = true
        this.newTitle = this.task.title
    }

    editTitleHandler() {
        this.changeTask({ title: this.newTitle })
        this.editMode = false
        this.newTitle = ''
    }

    changeTask(patch: Partial<UpdateTaskModel>) {
        const model: UpdateTaskModel = {
            completed: this.task.completed,
            startDate: this.task.startDate,
            priority: this.task.priority,
            description: this.task.description,
            deadline: this.task.deadline,
            title: this.task.title,
            status: this.task.status,
            ...patch,
        }
        this.updateTaskEvent.emit({ todoId: this.task.todoListId, taskId: this.task.id, model })
    }
}
