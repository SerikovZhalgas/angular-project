import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { map, Observable } from 'rxjs'
import { User, UsersResponse } from '../models/users.model'

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    httpOptions = {
        headers: new HttpHeaders().append('api-key', environment.apiKey),
        withCredentials: true,
    }
    constructor(private http: HttpClient) {}

    getUsers(page: number): Observable<User[]> {
        return this.http
            .get<UsersResponse>(
                `${environment.baseNetworkUrl}/users?page=${page}`,
                this.httpOptions
            )
            .pipe(map(el => el.items))
    }
}
