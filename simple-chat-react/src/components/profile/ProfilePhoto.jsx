import React from 'react';

function ProfilePhoto(props) {
    const size = props.size || '24px';
    const src = props.src || '/2022-2-VK-EDU-FS-Frontend-I-Panin/icons/default_user.svg';
    const style = {height: size, width: size};
    return (
        <div
            className="profile-img"
            style={style}
        >
            <img
                className={src === '/2022-2-VK-EDU-FS-Frontend-I-Panin/icons/default_user.svg' ? 'default' : ''}
                src={src}
                alt="profile"
            />
        </div>
    );
}

export default ProfilePhoto;
