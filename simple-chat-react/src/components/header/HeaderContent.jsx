import React from 'react';

import ProfilePhoto from '../profile/ProfilePhoto';

function HeaderContent(props) {
    const headerContent = {
        'chat': (
            <React.Fragment>
                <ProfilePhoto size="44px" />
                <div className="header__profile-info">
                    <div className="header__title text-hidden">{props.login}</div>
                    <div className="header__last-seen">{props.lastSeen}</div>
                </div>
                <button className="btn header__search">
                    <img className="icon" src="/2022-2-VK-EDU-FS-Frontend-I-Panin/icons/search.svg" alt="dots icon" />
                </button>
            </React.Fragment>
        ),
        'messenger': <div className="header__title"><span>Messenger</span></div>
        // TODO будет дополняться
    };
    return headerContent[props.state];
}

export default HeaderContent;
