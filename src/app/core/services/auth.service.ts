import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { CommonResponse, MeDataType } from '../models/core.model'
import { ResultCodes } from '../enums/core.enums'
import { Router } from '@angular/router'
import { catchError, EMPTY } from 'rxjs'
import { NotificationService } from './notification.service'

export interface LoginRequestData {
    email: string
    password: string
    rememberMe: boolean
}

@Injectable()
export class AuthService {
    isAuth = false

    // eslint-disable-next-line @typescript-eslint/ban-types,@typescript-eslint/no-empty-function
    resolveAuthRequest: Function = () => {}
    authRequest = new Promise(resolve => {
        this.resolveAuthRequest = resolve
    })

    constructor(
        private http: HttpClient,
        private router: Router,
        private notificationService: NotificationService
    ) {}

    login(data: Partial<LoginRequestData>) {
        this.http
            .post<CommonResponse<{ userId: number }>>(`${environment.baseUrl}/auth/login`, data)
            .pipe(catchError(error => this.errorHandler(error)))
            .subscribe(res => {
                if (res.resultCode === ResultCodes.success) {
                    this.router.navigate(['/'])
                } else {
                    this.notificationService.handleError(res.messages[0])
                }
            })
    }

    logout() {
        this.http
            .delete<CommonResponse>(`${environment.baseUrl}/auth/login`)
            .pipe(catchError(error => this.errorHandler(error)))
            .subscribe(res => {
                if (res.resultCode === ResultCodes.success) {
                    this.router.navigate(['/login'])
                }
            })
    }

    me() {
        this.http
            .get<CommonResponse<MeDataType>>(`${environment.baseUrl}/auth/me`)
            .pipe(catchError(error => this.errorHandler(error)))
            .subscribe(res => {
                if (res.resultCode === ResultCodes.success) {
                    this.isAuth = true
                }
                this.resolveAuthRequest()
            })
    }

    private errorHandler(error: HttpErrorResponse) {
        this.notificationService.handleError(error.message)
        return EMPTY
    }
}
