import React from 'react';

const Table = ({ header, data, columnNames }) => {
  const getKey = (index) => {
    return `${index}-${Math.random()}`;
  };
  const TableRows = data
    ? data.map((item, index) => {
        const { id, building, unitNumber, title, priority } = item || {};
        return (
          <tr key={getKey(index)}>
            <th scope="row">{id}</th>
            <td>{building}</td>
            <td>{unitNumber}</td>
            <td>{title}</td>
            <td>{priority}</td>
          </tr>
        );
      })
    : null;

  const columns = columnNames
    ? columnNames.map((item, index) => {
        return (
          <th key={getKey(index)} scope="col">
            {item}
          </th>
        );
      })
    : null;

  return (
    <div className="card mt-3">
      <div className="card-header">
        <h4 className="card-header-title">{header}</h4>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-hover table-striped">
            <thead>
              <tr>{columns}</tr>
            </thead>
            <tbody>{TableRows}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

Table.defaultProps = {
  headerTitle: '',
  data: null,
};
export default React.memo(Table);
