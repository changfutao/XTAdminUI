import { create } from 'zustand';
import { getUserStatus } from '@/api/user'
import { IOption } from '@/types/api';
export const useStore = create<{
    token: string,
    setToken: (token: string) => void,
    userStatus: IOption<number>[],
    getUserStatus: () => void
}>(set => ({
    token: '',
    setToken: (token) => set({token}),
    userStatus: [],
    getUserStatus: async () => {
       const data = await getUserStatus()
       set({userStatus: data})
    }
}))

