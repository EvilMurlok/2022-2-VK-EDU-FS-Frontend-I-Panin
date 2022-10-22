export default function runOnKeys(cb, ...codes) {
    let pressed = new Set();

    document.addEventListener('keydown', function(event) {
        pressed.add(event.code);
        for (let code of codes) {
            if (!pressed.has(code)) {
                return;
            }
        }
        pressed.clear();
        cb();
    });

    document.addEventListener('keyup', function(event) {
        pressed.delete(event.code);
    });
};

export function getCompanionLogin(chatName) {
    const nicknames = chatName.split('#');
    return nicknames[0] === window.localStorage['login'] ? nicknames[1] : nicknames[0];
}

export async function sleep(time) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(true), time);
    });
}
