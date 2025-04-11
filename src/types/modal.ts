import { RefObject } from 'react';
import { User } from './api';
export interface IModalProp<T = User.IUser> {
  mRef: RefObject<{ open: (action: IAction, data?: User.IUser) => void } | undefined>
  update: (action: IAction) => void
}
export type IAction = 'add' | 'edit' | 'delete'