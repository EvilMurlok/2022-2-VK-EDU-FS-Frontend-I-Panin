import createHeader from './createElementHelpers.js';
import { createChatListElement } from './createElementHelpers.js';
import {createAssociations} from "./commonHelpers";

export default function setUpApplication() {
    // тут можно менять пользователя и смотреть на диалог "от разных сторон"
    // такие данные приходили бы с базы данных
    // требуется обновление страницы, очевидно
    window.localStorage.setItem('users', JSON.stringify({ users: ['Ilya', 'Denis', 'Anton', 'Jennifer'] }));
    createAssociations();
    const app = document.querySelector('#app');
    const mainContentElement = document.querySelector('.main-content');
    const headerElement = createHeader('messenger');
    app.insertBefore(headerElement, mainContentElement);
    createChatListElement(mainContentElement);
}
