import React from 'react';
import PageHeader from '../../components/PageHeader';
import ProfileSettings from './ProfileSettings';
import AccountSettings from './AccountSettings';
import TabPages from '../../components/TabPages';

const Tabs = [
  {
    name: 'Personal Info',
    id: 'settings-profile',
    Page: ProfileSettings,
  },
  {
    name: 'Account',
    id: 'settings-security',
    Page: AccountSettings,
  },
];
const Settings = () => {
  return (
    <div className="container">
      <PageHeader title="Account" description="OVERVIEW" badgeLabel="Admin" badgeType="danger" />
      <TabPages data={Tabs} />
    </div>
  );
};

export default Settings;
