import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuthService } from './services/auth.service'
import { BeautyLoggerService } from './services/beauty-logger.service'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { CredentialsInterceptor } from './interceptors/credentials.interceptor'

@NgModule({
    declarations: [],
    imports: [CommonModule],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: CredentialsInterceptor, multi: true },
        AuthService,
        BeautyLoggerService,
    ],
})
export class CoreModule {}
