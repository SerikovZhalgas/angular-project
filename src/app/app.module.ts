import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { AppRoutingRoutingModule } from './app-routing-routing.module'
import { CoreModule } from './core/core.module'
import { HttpClientModule } from '@angular/common/http'
import { SharedModule } from './shared/shared.module'

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingRoutingModule, CoreModule, HttpClientModule, SharedModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
