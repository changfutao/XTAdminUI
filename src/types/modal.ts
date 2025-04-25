import { RefObject } from 'react'
export interface IModalProp<T> {
  mRef: RefObject<{ open: (action: IAction, data?: T) => void } | undefined>
  update: (action: IAction) => void
}
export type IAction = 'add' | 'edit' | 'delete'

export interface IModalNormalProp<T> {
  mRef: RefObject<{ open: (data?: T) => void } | undefined>
  update: () => void
}
