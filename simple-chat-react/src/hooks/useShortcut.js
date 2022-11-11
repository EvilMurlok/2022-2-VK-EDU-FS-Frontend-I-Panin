import {useEffect} from "react";

export default function useShortcut(cb, ...codes) {
    useEffect(() => {
        const pressed = new Set();

        const keydownListener = function(event) {
            pressed.add(event.code);
            for (let code of codes) {
                if (!pressed.has(code)) {
                    return;
                }
            }
            pressed.clear();
            cb();
        };

        const keyupListener = function(event) {
            pressed.delete(event.code);
        };

        document.addEventListener('keydown', keydownListener);

        document.addEventListener('keyup', keyupListener);

        return () => {
            document.removeEventListener('keydown', keydownListener);
            document.removeEventListener('keyup', keyupListener);
        }
    }, [cb, codes]);
};
