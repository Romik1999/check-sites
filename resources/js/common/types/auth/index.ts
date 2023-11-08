export interface IPropsLogin {
    setPassword: (value: string) => void,
    setEmail: (value: string) => void,
    navigate: (to: string) => void,
}
export interface IPropsRegister {
    setPassword: (value: string) => void,
    setEmail: (value: string) => void,
    setRepeatPassword: (value: string) => void,
    setFirstName: (value: string) => void,
    setUserName: (value: string) => void,
    navigate: (to: string) => void,
}

export interface IAuthState {
    user: IPublicUser,
    isLogged: boolean
}

interface IPublicUser {
    id: number | null,
    firstName: string,
    userName: string,
    email: string,
    createdAt: string,
    updateAt: string,
}
