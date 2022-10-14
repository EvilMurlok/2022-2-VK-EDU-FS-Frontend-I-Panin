class ProfilePhoto extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        const photoSrc = this.getAttribute('src-img') || 'static/icons/default_user.svg';
        // size - размер картинки (нужен один, так как картинка всегда есть круг, вписанный в квадрат)
        // размер надо указывать с единицами измерения
        const size = this.getAttribute('size') || '24px';
        this.innerHTML = `
        <div class="profile-img" style="height: ${size}; width: ${size}">
            <img 
                class="${photoSrc === 'static/icons/default_user.svg' ? 'default' : ''}" 
                src="${photoSrc}" 
                alt="profile photo"
            />
        </div>`
    }

}
customElements.define('profile-photo', ProfilePhoto);
