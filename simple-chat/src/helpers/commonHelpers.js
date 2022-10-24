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

export function getCurrentTime() {
    let currentTime = new Date();
    let minutes = currentTime.getMinutes();
    minutes = minutes < 10 ? "0" + minutes : minutes
    return `${currentTime.getHours()}:${minutes}`;
}

export function createAssociations() {
    for (let user of JSON.parse(window.localStorage['users']).users) {
        const userChats = [];
        for (let key in window.localStorage) {
            if (key.includes('#') && key.includes(user)) {
                const temp = key.slice(0, key.indexOf('#'));
                userChats.push((temp === user) ? key.slice(key.indexOf('#') + 1) : temp);
            }
        }
        window.localStorage.setItem(user, JSON.stringify({ chats: userChats }));
    }
}
