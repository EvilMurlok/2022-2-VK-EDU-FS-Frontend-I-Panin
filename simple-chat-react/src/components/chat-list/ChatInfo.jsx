import React, {useCallback, useRef, useState} from 'react';

import ProfilePhoto from "../profile/ProfilePhoto";

import getCompanionLogin from "../../utils/commonUtils";

function getStatusOfLstMessage(lastMessage) {
    if (lastMessage.sender === window.localStorage['login'] && lastMessage.checked === 'not') {
        return 'not';
    } else if (lastMessage.sender === window.localStorage['login'] && lastMessage.checked === 'been') {
        return 'been';
    } else {
        return null;
    }
}

function getNumberOfNewMessages(messages) {
    let number = 0;
    for (let message of messages.reverse()) {
        if (message.checked === 'not' && message.sender !== window.localStorage['login']) {
            ++number;
        } else {
            break;
        }
    }
    return number;
}


function ChatInfo(props) {

    const openCurrentChat = useCallback(() => {
        props.changeChatListState(false);
        const companionLogin = getCompanionLogin(loginElement.current.innerText);
        props.changeCompanion(companionLogin);
        props.changeChatState(true);
        props.changeHeaderState('chat');
    }, []);

    const [messages,] = useState(JSON.parse(window.localStorage[props.chatName]).messages);
    const loginElement = useRef(null);

    const login = getCompanionLogin(props.chatName);
    const lastMessage = messages[messages.length - 1];

    const time = lastMessage.time;
    const text = lastMessage.text;

    const statusOfLastMessage = getStatusOfLstMessage(lastMessage);
    let srcToIcon = (statusOfLastMessage) ? `/2022-2-VK-EDU-FS-Frontend-I-Panin/icons/${statusOfLastMessage}Checked.svg` : '';
    const numberOfNewMessages = getNumberOfNewMessages(messages);

    return (
        <div onClick={openCurrentChat} className="chat-info container">
            <div className="chat-info__left-block">
                <div className="chat-info__logo">
                    <ProfilePhoto size="44px" />
                </div>
                <div className="chat-info__content">
                    <div ref={loginElement} className="chat-info__login text-hidden">{login}</div>
                    <div className="chat-info__msg text-hidden">{text}</div>
                </div>
            </div>
            <div className="chat-info__right-block">
                <div className="chat-info__time">{time}</div>
                <div className="chat-info__status">
                    {
                        Boolean(statusOfLastMessage) && (
                            <img className="chat-info__icon-status"
                                 src={srcToIcon} alt="" />
                        )
                    }
                    {
                        Boolean(numberOfNewMessages) && (
                            <div className="chat-info__number-new-msg">
                                <span className="chat-info__status-number">
                                    {numberOfNewMessages}
                                </span>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default ChatInfo;
