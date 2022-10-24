import openCurrentChat, {closeCreationChatModal} from "../../helpers/changePageHelpers.js";
import {getCurrentTime, sleep} from '../../helpers/commonHelpers.js';

class ChatCreation extends HTMLElement {
    constructor() {
        super();
        this.chatCreationWrapper = null;
        this.backBtn = null;
        this.chatCreationContent = null;
    }

    connectedCallback() {
        this.innerHTML = this._getInnerHTML();
        this.chatCreationWrapper = document.querySelector('.chat-creation__wrapper');
        this.chatCreationWrapper.addEventListener('click', closeCreationChatModal.bind(this));
        this.backBtn = document.querySelector('#back-icon');
        this.backBtn.addEventListener('click', closeCreationChatModal.bind(this));
        this.chatCreationContent = document.querySelector('.chat-creation__content');
        this._createSelectionBlock();
    }

    disconnectedCallback() {
        this.chatCreationWrapper.removeEventListener('click', closeCreationChatModal.bind(this));
    }

    async _createNewChat() {
        const selectElement = document.querySelector('#select-companion');
        const inputElement = document.querySelector('.chat-creation__input');
        if (!selectElement.value) {
            alert('Выберите пользователя, с кем создать чат!');
            return;
        }
        const msg = inputElement.textContent.trim();
        if (!msg) {
            alert('Введите сообщение пользователю!');
            return;
        }
        // блок создания в localStorage
        const newChatKey = [window.localStorage['login'], selectElement.value].sort().join('#');
        const message = {
            time: getCurrentTime(),
            sender: window.localStorage['login'],
            text: msg,
            checked: 'not',
        };
        window.localStorage.setItem(newChatKey, JSON.stringify({messages: [message]}));

        this._updateChatsInLS(window.localStorage['login'], selectElement.value);
        this._updateChatsInLS(selectElement.value, window.localStorage['login']);

        // блок перехода
        await closeCreationChatModal();
        openCurrentChat(undefined, selectElement.value);
    }

    _updateChatsInLS(updatedNickname, addedNickname) {
        const updatedChats = JSON.parse(window.localStorage[updatedNickname]).chats;
        updatedChats.push(addedNickname);
        window.localStorage.setItem(updatedNickname, JSON.stringify({ chats: updatedChats}));
    }

    _createSelectionBlock() {
        const loginUser = window.localStorage['login'];
        const userChatsList = JSON.parse(window.localStorage[loginUser]).chats;
        const usersInSystem = JSON.parse(window.localStorage['users']).users;
        const availableUsers = [];
        for (let user of usersInSystem) {
            if (!userChatsList.includes(user) && user !== loginUser) {
                availableUsers.push(user);
            }
        }

        if (availableUsers.length) {
            this.chatCreationContent.innerHTML = `
                <div class="chat-creation__text">Выберите пользователя, <br>с которым создать чат</div>
                <div class="custom-select">
                    <select id="select-companion"></select>
                </div>
                <div class="chat-creation__text">Введите первое сообщение</div>
                <div class="textarea chat-creation__input" contenteditable></div>
            `;

            const selectElement = document.querySelector('#select-companion');
            for (let availableUser of availableUsers) {
                const optionElement = document.createElement('option');
                optionElement.setAttribute('value', availableUser);
                optionElement.textContent = availableUser;
                selectElement.appendChild(optionElement);
            }

            const submitBtn = document.createElement('div');
            submitBtn.classList.add('chat-creation__btn');
            submitBtn.textContent = 'Создать';
            this.chatCreationContent.appendChild(submitBtn);
            submitBtn.addEventListener('click', this._createNewChat.bind(this));
        } else {
            this.chatCreationContent.innerHTML = `
                <div class="chat-creation__text">Вы такой общительный пользователь!
                    <br><br>У Вас уже есть диалоги со всеми зарегистрированными пользователями :-)
                </div>
            `;
        }
    }


    _getInnerHTML() {
        return `
            <div class="chat-creation__wrapper">
                <div class="chat-creation" onclick="event.stopPropagation()">
                    <div class="chat-creation__header">
                        <img id="back-icon" class="icon" src="static/icons/back.svg" alt="dots icon">
                        <div class="chat-creation__header_text">Создание чата</div>
                    </div>
                    <div class="chat-creation__content"></div>
                </div>
            </div>
        `
    }
}

customElements.define('chat-creation', ChatCreation);
