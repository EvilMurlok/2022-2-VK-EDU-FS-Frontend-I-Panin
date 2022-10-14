class SimpleChatHeader extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        // состояния header:
        // default - состояние по умолчанию, есть стрелка назад, инфа о пользователе, лупа и три точки
        // messenger - состояние на странице мессенджера
        // edit - состояние на странице редактирования
        // settings - состояние на странице настроек
        // none - отсутствие хедера
        // detailed - подробная информация
        const state = this.getAttribute('state') || 'default';
        // логин пользователя
        const login = this.getAttribute('login') || 'unknown';
        // строка, обозначающая последний вход пользователя
        const lastSeen = this.getAttribute('last-seen') || 'last seen recently'

        const stateToLeftIcon = {
            'default': '<img class="icon" src="static/icons/back.svg" alt="dots icon">',
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
                    <div class="header__title">${login}</div>
                    <div class="header__last-seen">${lastSeen}</div>
                </div>
                <button class="btn header__search">
                    <img class="icon" src="static/icons/search.svg" alt="dots icon">
                </button>
            `,
            'messenger': '<div class="header__title"><span>Messenger</span></div>',
            // TODO будет дополняться
        };
        this.innerHTML = `
            <div class="header">
                <div class="container">
                    <div class="header__container">
                        <button class="btn">
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
