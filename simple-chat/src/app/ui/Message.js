class Message extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const sendingTime = this.getAttribute('time');
        const sender = this.getAttribute('sender');
        const text = this.getAttribute('text');
        const isChecked = this.getAttribute('checked'); // not, been
        const checkedIcon = (sender === window.localStorage["login"])
            ? `<img class="message__checked" src="static/icons/${isChecked}Checked.svg" alt="dots icon" />`
            : '';
        this.innerHTML = `
            <div class="message ${this._getSenderOfSms(sender)}">
                <div class="message__container">
                    <div class="message__text">
                        ${text}
                    </div>
                    <div class="message__time">${sendingTime}</div>  
                    ${checkedIcon}
                </div>
            </div>
        `;
    }

    _getSenderOfSms(senderLogin) {
        return (senderLogin === window.localStorage['login']) ? 'me' : 'companion';
    }
}
customElements.define('chat-message', Message);
