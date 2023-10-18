import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { AppRoutingRoutingModule } from './app-routing-routing.module'
import { CoreModule } from './core/core.module'
import { AuthModule } from './auth/auth.module'
import { TodosModule } from './todos/todos.module'
import { HttpClientModule } from '@angular/common/http'

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingRoutingModule,
        AuthModule,
        TodosModule,
        CoreModule,
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
