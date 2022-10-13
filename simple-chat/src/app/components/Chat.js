import runOnKeys from '../../helpers/runOnKeys.js';

class SimpleChat extends HTMLElement {
    constructor() {
        super();
        this.companion = null;
        this.inputEl = null;
        this.messageWrapper = null;
        this.submitBtnEl = null;
    }

    connectedCallback() {
        this.companion = this.getAttribute("companion");
        this.innerHTML = `
        <div class="chat__background">
            <div class="chat__container">
                <div class="chat__message-wrapper"></div>
                <div class="chat__input">
                    <div class="chat__input__field">
                        <div class="textarea chat__input__text" contenteditable></div>
                        <button class="btn chat__input__attachment">
                            <img class="icon" src="static/icons/attachment.svg" alt="dots icon">
                        </button>
                    <!--                            <div class="textarea-placeholder">Введите сообщение</div>-->
                    </div>
                    <button class="btn chat__input__submit">
                            <img class="icon" src="static/icons/send_msg.svg" alt="dots icon">
                    </button>
                </div>
            </div>
        </div>
        `
        // получим все необходимые элементы
        this.messageWrapper = document.querySelector('.chat__message-wrapper');
        this.inputEl = document.querySelector('div[contenteditable]');
        this.submitBtnEl = document.querySelector('.chat__input__submit');

        this.submitBtnEl.addEventListener('click', this.sendMessage.bind(this));
        runOnKeys(this.sendMessage.bind(this), "ControlLeft", "Enter");
        runOnKeys(this.sendMessage.bind(this), "ControlRight", "Enter");
        if (window.localStorage[this._getChatName()]) {
            // чтобы обновлять статус прочтения сообщения, необходимо обновлять сообщения
            // и записывать их в localStorage заново
            const updatedMessages = [];
            for (let message of JSON.parse(window.localStorage[this._getChatName()]).messages) {
                if (message.checked === 'not' && message.sender !== window.localStorage['login']) {
                    message.checked = 'been';
                }
                this._createMessageElement({ message });
                updatedMessages.push(message);
            }
            window.localStorage.setItem(this._getChatName(), JSON.stringify({ messages: updatedMessages }));
        }
    }
    disconnectedCallback() {
        this.submitBtnEl.removeEventListener('click', this.sendMessage.bind(this));
    }

    sendMessage() {
        if (this.inputEl.textContent && this.inputEl.textContent.trim()) {
            if (!window.localStorage[this._getChatName()]){
                window.localStorage.setItem(this._getChatName(), JSON.stringify({ messages: [] }));
            }
            let messages = JSON.parse(window.localStorage[this._getChatName()]).messages;
            const message = {
                time: this._getCurrentTime(),
                sender: window.localStorage['login'],
                text: this.inputEl.textContent,
                checked: 'not',
            };
            messages.push(message);
            window.localStorage.setItem(this._getChatName(), JSON.stringify({ messages }));
            this._createMessageElement({ message });
        }
        this.inputEl.textContent = '';
    }

    _getCurrentTime() {
        let currentTime = new Date();
        let minutes = currentTime.getMinutes();
        minutes = minutes < 10 ? "0" + minutes : minutes
        return `${currentTime.getHours()}:${minutes}`;
    }

    // было принято решение, что при создании чата, ему будет даваться название в localStorage
    // nickname1_nickname2, где nickname1 и nickname2 упорядочены по алфавиту
    _getChatName() {
        return [this.companion, window.localStorage['login']].sort().join('_');
    }

    _createMessageElement({ message }) {
        const messageElement = document.createElement('chat-message');
        messageElement.setAttribute('time', message.time);
        messageElement.setAttribute('sender', message.sender);
        messageElement.setAttribute('text', message.text);
        messageElement.setAttribute('checked', message.checked);
        this.messageWrapper.insertBefore(messageElement, this.messageWrapper.firstChild);
    }
}

customElements.define('simple-chat', SimpleChat);