class ChatList extends HTMLElement {
    connectedCallback() {
        this.innerHTML = this._getInnerHTML();
    }

    _getInnerHTML() {
        return `
            <div class="chat-list">
                <div class="chat-list__new-chat">
                    <img class="chat-list__icon" src="static/icons/new_chat.svg" alt="dots icon">
                </div>
            </div>
        `;
    }
}

customElements.define('chat-list', ChatList);
