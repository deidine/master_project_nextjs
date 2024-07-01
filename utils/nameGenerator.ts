export function nameGenerator(): string {
    return Math.random().toString(36).substring(2, 15) ;

    // return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}