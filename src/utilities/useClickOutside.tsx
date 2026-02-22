import { useEffect, useRef } from 'react';

export const useClickOutside = (callback: () => void) => {

    const ref = useRef<HTMLElement>(undefined);

    useEffect(() => {
        const handleClick = (event: Event) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        };

        document.addEventListener('click', handleClick, true);

        return () => {
            document.removeEventListener('click', handleClick, true);
        };
    }, [callback]);

    return ref;
};