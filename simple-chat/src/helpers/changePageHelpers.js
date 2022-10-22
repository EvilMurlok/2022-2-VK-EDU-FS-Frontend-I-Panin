import { getCompanionLogin } from './commonHelpers.js';
import { createSimpleChatElement, createChatListElement } from "./createElementHelpers.js";

function changeHeaderState(state, companionLogin) {
    const headerElement = document.getElementsByTagName('simple-chat-header')[0];
    headerElement.setAttribute('state', state);
    headerElement.setAttribute('login', companionLogin || null);
}

export default function openCurrentChat(event) {
    const chatListElement = document.getElementsByTagName('chat-list');
    const mainContentElement = document.querySelector('.main-content');
    chatListElement[0].remove();
    const companionLogin = getCompanionLogin(event.currentTarget.querySelector('.chat-info__login.text-hidden').textContent);
    const simpleChatElement = createSimpleChatElement(companionLogin);
    mainContentElement.appendChild(simpleChatElement);
    changeHeaderState('default', companionLogin);
}

export function openChatList() {
    const simpleChat = document.getElementsByTagName('simple-chat')[0];
    simpleChat.remove();
    const mainContentElement = document.querySelector('.main-content');
    createChatListElement(mainContentElement);
    changeHeaderState('messenger');
}

export function openCreationChatModal() {

}

export function closeCreationChatModal() {

}
