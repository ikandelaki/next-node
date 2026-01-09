'use client';

import { ERROR_TYPE, useNotificationStore } from "@/store/useNotificationStore";

export default function Notifications() {
    const notifications = useNotificationStore((state) => state.notifications);

    const renderNotifications = () => {
        return notifications.map(({ type, message }, key) => (
            <div key={`${key}-${type}`} className={
                `Notification_type-${type} ${ type === ERROR_TYPE ? 'bg-notification-error' : 'bg-notification-success' } px-4 py-2`
            }>
                { message }
            </div>
        ))
    }

    return (
        <div className="Notifications absolute top-12 right-4 flex flex-col gap-2">
            { renderNotifications() }
        </div>
    );
}