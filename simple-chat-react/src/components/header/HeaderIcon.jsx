import React from 'react';

function HeaderIcon(props) {
    if (props.isRight) {
        const rightIcon = {
            'chat': <img className="icon" src="/2022-2-VK-EDU-FS-Frontend-I-Panin/icons/dots.svg" alt="icon" />,
            'messenger': <img className="icon" src="/2022-2-VK-EDU-FS-Frontend-I-Panin/icons/search.svg" alt="icon" />,
            // TODO будет дополняться
        }
        return rightIcon[props.state];
    } else {
        const leftIcon = {
            'chat': <img
                id="back-icon"
                onClick={props.closeChatPage}
                className="icon" src="/2022-2-VK-EDU-FS-Frontend-I-Panin/icons/back.svg"
                alt="icon"
            />,
            'messenger': <img className="icon" src="/2022-2-VK-EDU-FS-Frontend-I-Panin/icons/burger.svg" alt="icon" />
            // TODO будет дополняться
        }
        return leftIcon[props.state];
    }
}

export default HeaderIcon;
