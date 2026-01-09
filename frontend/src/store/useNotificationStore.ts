import { create } from 'zustand';

export const ERROR_TYPE = 'error';
export const SUCCESS_TYPE = 'success';

export type NotificationType = {
    type: typeof ERROR_TYPE | typeof SUCCESS_TYPE,
    message: string
}

export type UseNotificationStoreType = {
    notifications: NotificationType[],
    setNotifications: (notification: NotificationType) => void
}

export const useNotificationStore = create<UseNotificationStoreType>((set) => ({
    notifications: [],
    setNotifications: (notification: NotificationType) => {
        set((state) => ({ 
            notifications: [...state.notifications, notification] 
        }))
    }
}))