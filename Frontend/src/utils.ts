export interface productOffTimerProps {
    hours: number | string
    days: number | string
    minutes: number | string
    seconds: number | string
}

const getTimer = (date?: string | null) => {

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

export {
    getTimer
}