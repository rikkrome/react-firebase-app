import React from 'react';

const PageHeader = ({ title, description, badgeLabel, badgeType }) => {
  return (
    <div className="header-body">
      <div>
        <small className="text-muted">{description}</small>
        {badgeLabel ? <span className={`badge badge-${badgeType} ml-2`}>{badgeLabel}</span> : null}
      </div>
      <h1>{title}</h1>
    </div>
  );
};

export default PageHeader;
