import { openChatList } from "../../helpers/openPageHelpers.js";

class SimpleChatHeader extends HTMLElement {
    constructor() {
        super();
        // состояния header:
        // default - состояние по умолчанию, есть стрелка назад, инфа о пользователе, лупа и три точки
        // messenger - состояние на странице мессенджера
        // edit - состояние на странице редактирования
        // settings - состояние на странице настроек
        // none - отсутствие хедера
        // detailed - подробная информация
        this.state = null;
        // логин пользователя
        this.login = null;
        // строка, обозначающая последний вход пользователя
        this.lastSeen = null;

        this.backBtn = null;
    }

    connectedCallback() {
        this.state = this.getAttribute('state');
        if (this.state === 'default') {
            this.login = this.getAttribute('login');
            this.lastSeen = this.getAttribute('last-seen') ?? 'last seen recently';
        }
        this.innerHTML = this._getInnerHTML(this.state);
        this.backBtn = document.querySelector('#back-icon');
        this.backBtn?.addEventListener('click', openChatList.bind(this));
    }
    disconnectedCallback() {
        this.backBtn?.removeEventListener('click', openChatList.bind(this));
    }



    static get observedAttributes() {
        return ['state', 'login', 'last-seen'];
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        if (attr === 'state') {
            this.state = newValue;
            this.innerHTML = this._getInnerHTML(this.state);
            setTimeout(() => {
                this.backBtn = document.querySelector('#back-icon');
                this.backBtn?.addEventListener('click', openChatList.bind(this));
            }, 100);
        } else if (attr === 'login') {
            this.login = newValue;
            setTimeout(() => {
                this.innerHTML = this._getInnerHTML(this.state);
            }, 50);
        } else if (attr === 'last-seen') {
            this.lastSeen = newValue;
            setTimeout(() => {
                this.innerHTML = this._getInnerHTML(this.state);
            }, 50);
        }
    }

    _getInnerHTML(state) {
        const stateToLeftIcon = {
            'default': '<img id="back-icon" class="icon" src="static/icons/back.svg" alt="dots icon">',
            'messenger': '<img class="icon" src="static/icons/burger.svg" alt="dots icon">',
            // TODO будет дополняться
        };
        const stateToRightIcon = {
            'default': '<img class="icon" src="static/icons/dots.svg" alt="dots icon">',
            'messenger': '<img class="icon" src="static/icons/search.svg" alt="dots icon">',
            // TODO будет дополняться
        };
        const stateToContent = {
            'default': `
                <profile-photo size="44px"></profile-photo>
                <div class="header__profile-info">
                    <div class="header__title text-hidden">${this.login}</div>
                    <div class="header__last-seen">${this.lastSeen}</div>
                </div>
                <button class="btn header__search">
                    <img class="icon" src="static/icons/search.svg" alt="dots icon">
                </button>
            `,
            'messenger': '<div class="header__title"><span>Messenger</span></div>',
            // TODO будет дополняться
        };
        return `
            <div class="header">
                <div class="container">
                    <div class="header__container">
                        <button class="btn" >
                            ${stateToLeftIcon[state]}
                        </button>
                        <div class="header__content">
                            ${stateToContent[state]}
                        </div>
                        <button class="btn">
                            ${stateToRightIcon[state]}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
}
customElements.define('simple-chat-header', SimpleChatHeader);
