import React from 'react';

import PrivateHeader from './privateHeader';
import NoteList from './noteList';

export default () => {
  return (
    <div>
      <PrivateHeader title="Dashboard" />
      <div className="page-content">
        <NoteList />
      </div>
    </div>
  );
}