export interface CommonResponse<T = NonNullable<unknown>> {
    data: T
    messages: string[]
    fieldsErrors: string[]
    resultCode: number
}

export interface MeDataType {
    id: number
    login: string
    email: string
}

export type BeautyLoggerType = 'error' | 'success' | 'info' | 'warning'
