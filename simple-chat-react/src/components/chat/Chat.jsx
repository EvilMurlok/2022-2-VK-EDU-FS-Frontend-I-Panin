import React, {useEffect, useMemo, useRef, useState} from 'react';

import useShortcut from "../../hooks/useShortcut";
import {getCurrentTime, sleep} from "../../utils/commonUtils";

import ChatMessage from "./ChatMessage";

function Chat(props) {
    // было принято решение, что при создании чата, ему будет даваться название в localStorage
    // nickname1#nickname2, где nickname1 и nickname2 упорядочены по алфавиту
    const chatName = useMemo(() => {
        return [props.companion, window.localStorage['login']].sort().join('#');
    }, [props.companion]);

    const [isSending, setIsSending] = useState(false);
    const [messages, setMessages] = useState([]);

    useEffect( () => {
        const tempArr = [];
        if (window.localStorage[chatName]) {
            for (let message of JSON.parse(window.localStorage[chatName]).messages) {
                if (message.checked === 'not' && message.sender !== window.localStorage['login']) {
                    message.checked = 'been';
                }
                tempArr.push(message);
            }
            setMessages(tempArr);
            window.localStorage.setItem(chatName, JSON.stringify({messages: tempArr}));
            props.changeCompanionLogin(props.companion);

        }
    }, []);

    const textareaRef = useRef(null);

    const handleClick = async () => {
        if (textareaRef.current.innerText && textareaRef.current.innerText.trim()) {
            let newMsgId = messages[messages.length - 1].id + 1;
            const message = {
                id: newMsgId,
                time: getCurrentTime(),
                sender: window.localStorage['login'],
                text: textareaRef.current.textContent,
                checked: 'not',
            };
            messages.push(message);
            setMessages(messages);
            setIsSending(true);
            window.localStorage.setItem(chatName, JSON.stringify({messages}));
            textareaRef.current.innerText = '';
            await sleep(500);
            setIsSending(false);
        }
        textareaRef.current.innerText = '';
    };

    useShortcut(handleClick, "ControlLeft", "Enter");
    useShortcut(handleClick, "ControlRight", "Enter");

    return (
        <div className="chat__background">
            <div className="chat__container">
                <div className="chat__message-wrapper">
                    {
                        Boolean(messages.length) && messages.map(
                            (message,) => (
                                <ChatMessage
                                    key={message.id}
                                    sender={message.sender}
                                    checked={message.checked}
                                    text={message.text}
                                    time={message.time}
                                    isSending={isSending}
                                />
                            )
                        )
                    }
                </div>
                <div className="chat__input">
                    <div className="chat__input__field">
                        <div ref={textareaRef} className="textarea chat__input__text" contentEditable/>
                        <button className="btn chat__input__attachment">
                            <img className="icon" src="/2022-2-VK-EDU-FS-Frontend-I-Panin/icons/attachment.svg" alt="icon" />
                        </button>
                    </div>
                    <button onClick={handleClick} className="btn chat__input__submit">
                        <img className="icon" src="/2022-2-VK-EDU-FS-Frontend-I-Panin/icons/send_msg.svg" alt="icon" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Chat;
