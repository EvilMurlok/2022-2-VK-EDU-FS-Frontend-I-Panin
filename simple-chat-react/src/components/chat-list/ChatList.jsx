import React, {useEffect, useState} from 'react';

import ChatInfo from './ChatInfo';

function ChatList(props) {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        props.changeHeaderState('messenger');
        // далее предполагается запрос в базку для получения всех диалогов пользователя,
        // но мы проходимся по хранилищу и отбираем только чаты пользователя!
        const tempArr = [];
        for (let key in window.localStorage) {
            if ((key.indexOf('#') >= 0)
                && (key.indexOf(window.localStorage['login']) >= 0)) {
                tempArr.push(key);
            }
        }
        setChats([...tempArr]);
    }, []);

    const openCreationChatModal = () => {
        props.changeChatCreationState(true);
    };

    return (
        <div className="chat-list">
            <div onClick={openCreationChatModal} className="chat-list__new-chat">
                <img className="chat-list__icon" src="/2022-2-VK-EDU-FS-Frontend-I-Panin/icons/new_chat.svg" alt="new chat" />
            </div>
            {
                Boolean(chats.length) && chats.map(
                    (chatName, index) => (
                        <ChatInfo
                            key={index}
                            chatName={chatName}
                            changeChatListState={props.changeChatListState}
                            changeChatState={props.changeChatState}
                            changeCompanion={props.changeCompanion}
                            changeHeaderState={props.changeHeaderState}
                        />
                    )
                )
            }
        </div>
    );
}

export default ChatList;
