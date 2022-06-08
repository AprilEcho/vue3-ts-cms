import { ILoginState } from './login/type'
export interface IRootState {
  name: string
  age: number
}
export interface IRootWithModule {
  LoginModule: ILoginState
}
export type IStoreType = IRootState & IRootWithModule
