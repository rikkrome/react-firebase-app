import React from 'react';

const TabPages = ({data}) => {
  if (!data && !Array.isArray(data)) {
    return null;
  }
  return (
    <div className="mt-4">
      <ul className="nav nav-pills" id="myTab" role="tablist">
        {data.map(({name, id}, index) => {
          const active = index === 0;
          return (
            <li key={id} className="nav-item" role="presentation">
              <a
                href={`#${id}`}
                className={`nav-link ${active ? 'active' : ''}`}
                id={`${id}-tab`}
                data-toggle="tab"
                role="tab"
                data-bs-toggle="tab"
                aria-controls={id}
                aria-selected={active}
              >
                {name}
              </a>
            </li>
          );
        })}
      </ul>
      <div className="tab-content" id="myTabContent">
        {data.map(({id, Page}, index) => {
          const active = index === 0;
          return (
            <div
              key={id}
              className={`tab-pane fade ${active ? 'show active' : ''}`}
              id={id}
              role="tabpanel"
              aria-labelledby={`${id}-tab`}
            >
              {Page ? <Page /> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TabPages;
