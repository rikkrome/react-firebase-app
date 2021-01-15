import React from 'react';
import './styles.css';
import Table from '../../components/Table';
import PageHeader from '../../components/PageHeader';

const Tickets = {
  header: 'Tickets',
  columnNames: ['ID', 'Building', 'Unit', 'Title', 'Priority'],
  data: [
    {
      id: '001',
      building: 'Bronson',
      unitNumber: '102',
      title: 'Fix door',
      priority: 'low',
    },
    {
      id: '002',
      building: 'Bronson',
      unitNumber: '101',
      title: 'Fix door',
      priority: 'low',
    },
  ],
};

const Dashboard = () => {
  return (
    <div className="container">
      <PageHeader title="Dashboard" description="OVERVIEW" badgeLabel="Admin" badgeType="danger" />
      <Table data={Tickets.data} header={Tickets.header} columnNames={Tickets.columnNames} />
    </div>
  );
};

export default Dashboard;
