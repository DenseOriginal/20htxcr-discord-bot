export function addMinutes(date: Date, minutes: number): Date {
    return new Date(date.getTime() + minutes*60000);
}

export function addMinutesToNow(minutes: number): Date {
    return addMinutes(new Date(), minutes);
}