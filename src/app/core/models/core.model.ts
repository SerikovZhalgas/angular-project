export interface CommonResponse<T = NonNullable<unknown>> {
    data: T
    messages: string[]
    fieldsErrors: string[]
    resultCode: number
}

export interface MeResponse {
    data: {
        id: number
        login: string
        email: string
    }
    messages: string[]
    fieldsErrors: string[]
    resultCode: number
}

export type BeautyLoggerType = 'error' | 'success' | 'info' | 'warning'
