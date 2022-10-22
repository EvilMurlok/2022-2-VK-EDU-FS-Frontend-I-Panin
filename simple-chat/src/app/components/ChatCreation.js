import { closeCreationChatModal } from "../../helpers/changePageHelpers.js";

class ChatCreation extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = this._getInnerHTML();
        addEventListener('click', closeCreationChatModal.bind(this));
    }

    disconnectedCallback() {
        removeEventListener('click', closeCreationChatModal.bind(this));
    }

    _getInnerHTML() {
        return `
            <div class="chat-creation__wrapper">
                <div class="chat-creation"></div>
            </div>
        `
    }
}
