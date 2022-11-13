import React from 'react';

function ChatMessage(props) {
    const messageCheckStatus = `/2022-2-VK-EDU-FS-Frontend-I-Panin/icons/${props.checked}Checked.svg`;
    const checkedIcon = (props.sender === window.localStorage['login'])
        ? <img className="message__checked" src={messageCheckStatus} alt="" />
        : <></>;

    const senderOfSms = (props.sender === window.localStorage['login'])
        ? 'me' : 'companion';

    const classes = `message ${senderOfSms} ${props.isSending ? 'sending-message' : ''}`;
    return (
        <div className={classes}>
            <div className="message__container">
                <div className="message__text">
                    {props.text}
                </div>
                <div className="message__time">{props.time}</div>
                {checkedIcon}
            </div>
        </div>
    );
}

export default ChatMessage;
