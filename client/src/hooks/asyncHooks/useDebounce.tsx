import { useEffect, useRef } from "react";

/**
 * A debounce hook to delay function execution until after a specified delay.
 * 
 * @param callback - The function to execute after the delay.
 * @param delay - The delay in milliseconds.
 * @returns A debounced version of the callback function.
 */
export const useDebounce = <T extends (...args: any[]) => void>(
    callback: T,
    delay: number
): ((...args: Parameters<T>) => void) => {
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const debounce = (...args: Parameters<T>) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            callback(...args);
        }, delay);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return debounce;
};
