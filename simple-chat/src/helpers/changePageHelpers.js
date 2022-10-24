import {getCompanionLogin, sleep} from './commonHelpers.js';
import { createSimpleChatElement, createChatListElement } from "./createElementHelpers.js";

export function changeHeaderState(state, companionLogin) {
    const headerElement = document.getElementsByTagName('simple-chat-header')[0];
    headerElement.setAttribute('state', state);
    headerElement.setAttribute('login', companionLogin || null);
}

export default function openCurrentChat(event, login= '') {
    const chatListElement = document.getElementsByTagName('chat-list')[0];
    const mainContentElement = document.querySelector('.main-content');
    chatListElement.remove();
    let companionLogin = '';
    if (login) {
        companionLogin = login;
    } else {
        companionLogin = getCompanionLogin(event.currentTarget.querySelector('.chat-info__login.text-hidden').textContent);
    }
    const simpleChatElement = createSimpleChatElement(companionLogin);
    mainContentElement.appendChild(simpleChatElement);
    changeHeaderState('default', companionLogin);
}

export function closeSimpleChat() {
    const simpleChat = document.getElementsByTagName('simple-chat')[0];
    simpleChat.remove();
}

export function openChatList() {
    const mainContentElement = document.querySelector('.main-content');
    createChatListElement(mainContentElement);
    changeHeaderState('messenger');
}

export function openCreationChatModal() {
    const chatCreationElement = document.createElement('chat-creation');
    const app = document.querySelector('#app');
    const mainContentElement = document.querySelector('.main-content');
    app.insertBefore(chatCreationElement, mainContentElement);
}

export async function closeCreationChatModal() {
    const chatCreationElement = document.querySelector('.chat-creation');
    chatCreationElement.classList.add('closing-modal-animation');
    await sleep(400);
    const chatCreationTag = document.getElementsByTagName('chat-creation')[0];
    await sleep(100);
    chatCreationTag.remove();
}
