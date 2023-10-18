import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { MeResponse } from '../models/core.model'
import { ResultCodes } from '../enums/core.enums'

@Injectable()
export class AuthService {
    isAuth = false

    constructor(private http: HttpClient) {}

    me() {
        this.http.get<MeResponse>(`${environment.baseNetworkUrl}/auth/me`).subscribe(res => {
            if (res.resultCode === ResultCodes.success) {
                this.isAuth = true
            }
        })
    }
}
