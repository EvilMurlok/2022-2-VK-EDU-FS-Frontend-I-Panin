import openCurrentChat from "../../helpers/openPageHelpers";
import { getCompanionLogin } from "../../helpers/commonHelpers.js";

class ChatInfo extends HTMLElement {
    constructor() {
        super();
        this.chatName = null;
        this.login = null;
        this._messages = null;
        this.lastMessage = null;
        this.time = null;
        this.text = null;
        this.statusOfLastMessage = null;
        this.numberOfNewMessages = null;
        this.chatInfoElement = null;
    }

    connectedCallback() {
        this.chatName = this.getAttribute('chat-name');
        this.login = getCompanionLogin(this.chatName);
        this._messages = this._getMessages();
        this.lastMessage = this._messages[this._messages.length - 1];
        this.time = this.lastMessage.time;
        this.text = this.lastMessage.text;
        this.statusOfLastMessage = this._getStatusOfLastMessage();
        this.numberOfNewMessages = this._getNumberOfNewMessages();
        this.innerHTML = this._getInnerHTML();
        this.chatInfoElement = document.querySelector('.chat-list').lastChild;
        this.chatInfoElement.addEventListener('click', openCurrentChat.bind(this));
    }
    disconnectedCallback() {
        this.chatInfoElement.removeEventListener('click', openCurrentChat.bind(this));
    }

    _getMessages() {
        return JSON.parse(window.localStorage[this.chatName]).messages;
    }
    _getNumberOfNewMessages() {
        let number = 0;
        for (let message of this._messages.reverse()) {
            if (message.checked === 'not' && message.sender !== window.localStorage['login']) {
                ++number;
            } else {
                break;
            }
        }
        return number;
    }
    _getStatusOfLastMessage() {
        if (this.lastMessage.sender === window.localStorage['login'] && this.lastMessage.checked === 'not') {
            return 'not';
        } else if (this.lastMessage.sender === window.localStorage['login'] && this.lastMessage.checked === 'been') {
            return 'been';
        } else {
            return null;
        }
    }

    _getInnerHTML() {
        let rightIcon = '';
        if (this.statusOfLastMessage) {
            rightIcon = `
                <img class="chat-info__icon-status" src="static/icons/${this.statusOfLastMessage}Checked.svg" alt="" />
            `;
        }
        else if (this.numberOfNewMessages) {
            rightIcon = `
                <div class="chat-info__number-new-msg">
                    <span class="chat-info__status-number">
                        ${this.numberOfNewMessages}
                    </span>
                </div>
            `;
        }
        return `
        <div class="chat-info container">
            <div class="chat-info__left-block">
                <div class="chat-info__logo">
                    <profile-photo size="44px"></profile-photo>
                </div>
                <div class="chat-info__content">
                    <div class="chat-info__login text-hidden">${this.login}</div>
                    <div class="chat-info__msg text-hidden">${this.text}</div>
                </div>
            </div>
            <div class="chat-info__right-block">
                <div class="chat-info__time">${ this.time }</div>
                <div class="chat-info__status">
                    ${rightIcon}
                </div>
            </div>
        </div>
        `
    }
}
customElements.define('chat-info', ChatInfo);
