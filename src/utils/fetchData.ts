import { ERROR_TYPE } from "@/store/useNotificationStore";

export const fetchNext = async (api?: string, body?: BodyInit) => {
    try {
        const res = await fetch(`http://localhost:3000/api/${api}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body
        });

        return await res.json();
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Something went wrong...';
        return { type: ERROR_TYPE, message }
    }
}