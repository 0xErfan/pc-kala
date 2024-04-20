export interface productOffTimerProps {
    hours: number | string
    days: number | string
    minutes: number | string
    seconds: number | string
}
interface FetchOptions {
    method?: 'POST' | 'DELETE' | 'PUT'
    body?: Blob | BufferSource | FormData | URLSearchParams | ReadableStream<Uint8Array> | string
}

type FetchResponse<T> = {
    data: T | null;
    error: object | null
};

const getTimer = (date?: string) => {

    const currentDate = new Date();
    const endOfTimer = date || new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1, 0, 0, 0);

    const differenceBetweenDates = (endOfTimer instanceof Date ? endOfTimer.getTime() : new Date(endOfTimer).getTime()) - currentDate.getTime();
    const secondsRemaining = Math.floor(differenceBetweenDates / 1000);

    const hours = Math.floor(secondsRemaining / 3600).toString().padStart(2, "0");
    const minutes = Math.floor((secondsRemaining % 3600) / 60).toString().padStart(2, "0");
    const seconds = (secondsRemaining % 60).toString().padStart(2, "0");

    return {
        days: Math.floor(differenceBetweenDates / (60 * 60 * 24 * 1000)).toString().padStart(2, "0"),
        hours,
        minutes,
        seconds
    } satisfies productOffTimerProps;
}


const fetchData = async<T>(url: string, options?: FetchOptions): Promise<FetchResponse<T>> => {

    let response: FetchResponse<T> = { data: null, error: null, }

    try {
        const res = await fetch(url, options);
        if (res.ok) {
            response.data = await res.json();
        } else throw new Error(`HTTP error with ${res.status} code!`);
    } catch (error) { response.error = error! }

    return response;
};

export {
    getTimer,
    fetchData
}