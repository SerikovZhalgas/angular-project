import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
    selector: 'inst-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    loginForm = new FormGroup({
        email: new FormControl('', [
            Validators.required,
            Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,5}$'),
        ]),
        password: new FormControl(''),
    })

    get email() {
        return this.loginForm.get('email')
    }

    get password() {
        return this.loginForm.get('password')
    }

    onSubmit() {
        alert(JSON.stringify(this.loginForm.value))
    }
}
