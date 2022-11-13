import React, {useCallback} from 'react';

import HeaderIcon from './HeaderIcon';
import HeaderContent from './HeaderContent';

function Header(props) {
    const closeChatPage = useCallback(() => {
        props.changeChatState(false);
        props.changeChatListState(true);
    }, []);
    return (
        <div className="header">
            <div className="container">
                <div className="header__container">
                    <button className="btn">
                        <HeaderIcon closeChatPage={closeChatPage} state={props.state} isRight={false} />
                    </button>
                    <div className="header__content">
                        <HeaderContent
                            state={props.state}
                            login={props.login}
                            lastSeen={props.lastSeen}
                        />
                    </div>
                    <button className="btn">
                        <HeaderIcon state={props.state} isRight={true} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Header;
