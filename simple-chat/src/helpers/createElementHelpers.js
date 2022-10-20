export default function createHeader(state, login, lastSeen = 'last seen recently') {
    const headerElement = document.createElement('simple-chat-header');
    headerElement.setAttribute('state', state || 'default');
    headerElement.setAttribute('login', login || 'unknown');
    headerElement.setAttribute('last-seen', lastSeen);
    return headerElement;
}

export function createMessageElement({ message }) {
    const messageElement = document.createElement('chat-message');
    messageElement.setAttribute('time', message.time);
    messageElement.setAttribute('sender', message.sender);
    messageElement.setAttribute('text', message.text);
    messageElement.setAttribute('checked', message.checked);
    return messageElement;
}

export function createChatListElement(parentElement) {
    let chatListElement = document.createElement('chat-list');
    parentElement.appendChild(chatListElement);
    // далее предполагается запрос в базку для получения всех диалогов пользователя,
    // но мы проходимся по хранилищу и отбираем только чаты пользователя!
    for (let key in window.localStorage) {
        if ((key.indexOf('#') >= 0)
            && (key.indexOf(window.localStorage['login']) >= 0)) {
            const chatInfoElement = document.createElement('chat-info');
            chatInfoElement.setAttribute('chat-name', key);
            chatListElement = document.querySelector('.chat-list');
            chatListElement.appendChild(chatInfoElement);
        }
    }
    return chatListElement;
}

export function createSimpleChatElement(companion) {
    const simpleChatElement = document.createElement('simple-chat');
    simpleChatElement.setAttribute('companion', companion);
    return simpleChatElement;
}
