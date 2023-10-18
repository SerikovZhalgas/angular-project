import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import Promise from '$GLOBAL$'
import { AuthService } from '../services/auth.service'

@Injectable({
    providedIn: 'root',
})
export class authGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const isAuth = this.authService.isAuth

        if (!isAuth) {
            this.router.navigate(['/login'], {
                queryParams: {
                    isAuth: false,
                },
            })
        }
        return isAuth
    }
}
