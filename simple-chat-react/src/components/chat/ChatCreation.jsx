import React, {useState, useEffect, useRef, useCallback} from 'react';
import {getCurrentTime, sleep} from "../../utils/commonUtils";

function updateChatsInLS(updatedNickname, addedNickname) {
    const updatedChats = JSON.parse(window.localStorage[updatedNickname]).chats;
    updatedChats.push(addedNickname);
    window.localStorage.setItem(updatedNickname, JSON.stringify({ chats: updatedChats}));
}

function ChatCreation(props) {
    const [isClosingModal, setIsClosingModal] = useState(false);
    const [availableUsers, setAvailableUsers] = useState([]);

    const selectElement = useRef(null);
    const chatCreationInput = useRef(null);

    const openCurrentChat = useCallback(() => {
        props.changeChatListState(false);
        props.changeCompanion(selectElement.current.value);
        props.changeChatState(true);
        props.changeHeaderState('chat');
    }, []);

    useEffect(() => {
        const tempArr = [];
        const loginUser = window.localStorage['login'];
        const userChatsList = JSON.parse(window.localStorage[loginUser]).chats;
        const usersInSystem = JSON.parse(window.localStorage['users']).users;
        for (let user of usersInSystem) {
            if (!userChatsList.includes(user) && user !== loginUser) {
                tempArr.push(user);
            }
        }
        setAvailableUsers(() => [...tempArr]);
    }, []);


    const createNewChat = async () => {
        if (!selectElement.current.value) {
            alert('Выберите пользователя, с кем создать чат!');
            return;
        }
        const msg = chatCreationInput.current.innerText.trim();
        if (!msg) {
            alert('Введите сообщение пользователю!');
            return;
        }
        const newChatKey = [window.localStorage['login'], selectElement.current.value]
            .sort()
            .join('#');

        const message = {
            id: 1,
            time: getCurrentTime(),
            sender: window.localStorage['login'],
            text: msg,
            checked: 'not',
        };

        window.localStorage.setItem(newChatKey, JSON.stringify({messages: [message]}));

        updateChatsInLS(window.localStorage['login'], selectElement.current.value);
        updateChatsInLS(selectElement.current.value, window.localStorage['login']);

        await closeCreationChatModal();

        openCurrentChat();
    }

    const closeCreationChatModal = async () => {
        setIsClosingModal(true);
        await sleep(500);
        setIsClosingModal(false);
        props.changeChatCreationState(false);
    }

    const chatCreationClasses = `chat-creation ${isClosingModal ? 'closing-modal-animation' : ''}`;

    return (
        <div onClick={closeCreationChatModal} className="chat-creation__wrapper">
            <div className={chatCreationClasses} onClick={(event) => {event.stopPropagation()}}>
                <div className="chat-creation__header">
                    <img
                        onClick={closeCreationChatModal}
                        id="back-icon"
                        className="icon"
                        src="/2022-2-VK-EDU-FS-Frontend-I-Panin/icons/back.svg"
                        alt="icon"
                    />
                        <div className="chat-creation__header_text">Создание чата</div>
                </div>
                <div className="chat-creation__content">
                    {
                        Boolean(availableUsers.length) && (
                            <React.Fragment>
                                <div className="chat-creation__text">Выберите пользователя, <br />с которым создать чат</div>
                                <div className="custom-select">
                                    <select ref={selectElement}>
                                        {
                                            availableUsers.map(
                                                (availableUser) => (
                                                    <option
                                                        key={availableUser}
                                                        value={availableUser}>{availableUser}
                                                    </option>
                                                )
                                            )
                                        }
                                    </select>
                                </div>
                                <div className="chat-creation__text">Введите первое сообщение</div>
                                <div ref={chatCreationInput} className="textarea chat-creation__input" contentEditable/>
                                <div onClick={createNewChat} className="chat-creation__btn">Создать</div>
                            </React.Fragment>
                        )
                    }
                    {
                        Boolean(!availableUsers.length) && (
                            <div className="chat-creation__text">Вы такой общительный пользователь!
                                <br /><br />У Вас уже есть диалоги со всеми зарегистрированными пользователями :-)
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default ChatCreation;
