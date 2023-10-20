import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuthService } from './services/auth.service'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { CredentialsInterceptor } from './interceptors/credentials.interceptor'
import { NotificationService } from './services/notification.service'

@NgModule({
    declarations: [],
    imports: [CommonModule],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: CredentialsInterceptor, multi: true },
        AuthService,
        NotificationService,
    ],
})
export class CoreModule {}
