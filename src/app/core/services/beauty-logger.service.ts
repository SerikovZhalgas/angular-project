import { Injectable } from '@angular/core'
import { BeautyLoggerType } from '../models/core.model'

@Injectable()
export class BeautyLoggerService {
    log(message: string, type: BeautyLoggerType) {
        console.log(`%c${message}`, this.getSeverity(type))
    }

    getSeverity(type: BeautyLoggerType) {
        switch (type) {
            case 'success':
                return 'background: green; color: white;'

            case 'info':
                return 'background: blue; color: white;'

            case 'error':
                return 'background: red; color: white;'

            case 'warning':
                return 'background: orange; color: black;'
            default:
                return ''
        }
    }
}
