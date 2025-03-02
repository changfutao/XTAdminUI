import { create } from 'zustand';

export const useAuthStore = create<{
    token: string,
    setToken: (token: string) => void
}>(set => ({
    token: '',
    setToken: (token) => set({token})
}))

