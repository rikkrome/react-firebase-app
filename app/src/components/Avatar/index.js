import React from 'react';
import defaultAvatar from '../../assets/images/default-avatar.jpg';

const Avatar = ({ uri, size }) => {
  return (
    <div className="rounded-circle" style={{ height: size, width: size }}>
      {!uri ? (
        <img src={defaultAvatar} className="rounded-circle" alt="defaultAvatar" style={{ width: size, height: size }} />
      ) : (
        <object data={uri} type="image/jpg" className="rounded-circle" style={{ width: size, height: size }}>
          <img src={defaultAvatar} className="rounded-circle" alt="defaultAvatar" style={{ width: size, height: size }} />
        </object>
      )}
    </div>
  );
};

Avatar.defaultProps = {
  uri: null,
  size: 50,
};

export default React.memo(Avatar);
