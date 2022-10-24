import {openCreationChatModal} from "../../helpers/changePageHelpers";

class ChatList extends HTMLElement {
    constructor() {
        super();
        this.newChatBtn = null;
    }
    connectedCallback() {
        this.innerHTML = this._getInnerHTML();
        this.newChatBtn = document.querySelector('.chat-list__new-chat');
        this.newChatBtn.addEventListener('click', openCreationChatModal.bind(this));
    }

    disconnectedCallback() {
        this.newChatBtn.removeEventListener('click', openCreationChatModal.bind(this));
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
