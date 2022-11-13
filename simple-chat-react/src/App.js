import React, {useEffect, useState} from 'react';

import Header from './components/header/Header.jsx';
import Chat from './components/chat/Chat';
import ChatList from "./components/chat-list/ChatList";
import ChatCreation from "./components/chat/ChatCreation";

import {createAssociations} from './utils/commonUtils.js';

function SimpleChatApp() {

    const [headerState, setHeaderState] = useState('messenger');
    const [chatCreationState, setChatCreationState] = useState(false);
    const [chatListState, setChatListState] = useState(true);
    const [chatState, setChatState] = useState(false);
    const [companion, setCompanion] = useState(null);
    const [companionLogin, setCompanionLogin] = useState(null);

    useEffect( () => {
        window.localStorage.setItem('users', JSON.stringify({ users: ['Ilya', 'Denis', 'Anton', 'Jennifer'] }));
        createAssociations();
    }, []);

    return (
        <div className="App">
            {/* пока не будет авторизации, всегда будет last seen recently */}
            <Header
                state={headerState}
                login={companionLogin}
                lastSeen="last seen recently"
                changeChatState={setChatState}
                changeChatListState={setChatListState}
            />
            {
                Boolean(chatCreationState) && (
                    <ChatCreation
                        changeChatCreationState={setChatCreationState}
                        changeChatState={setChatState}
                        changeChatListState={setChatListState}
                        changeCompanion={setCompanion}
                        changeHeaderState={setHeaderState}
                    />
                )
            }
            <div className="main-content">
                {
                    Boolean(chatListState) && (
                        <ChatList
                            changeChatCreationState={setChatCreationState}
                            changeChatListState={setChatListState}
                            changeChatState={setChatState}
                            changeCompanion={setCompanion}
                            changeHeaderState={setHeaderState}
                        />
                    )
                }
                {
                    Boolean(chatState) && (
                        <Chat changeChatListState={setChatListState}
                              changeChatState={setChatState}
                              companion={companion}
                              changeHeaderState={setHeaderState}
                              changeCompanionLogin={setCompanionLogin}
                        />
                    )
                }
            </div>
        </div>
    );
}

export default SimpleChatApp;
