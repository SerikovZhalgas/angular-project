import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { NotifyComponent } from './components/notify/notify.component'

@NgModule({
    declarations: [NotifyComponent],
    imports: [CommonModule, RouterLink, RouterLinkActive],
    exports: [NotifyComponent],
})
export class SharedModule {}
