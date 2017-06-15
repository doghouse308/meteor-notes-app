import React from 'react';

import PrivateHeader from './privateHeader';
import NoteList from './noteList';
import Editor from './editor';

export default () => {
  return (
    <div>
      <PrivateHeader title="Dashboard" />
      <div className="page-content">
        <NoteList />
        <Editor/>
      </div>
    </div>
  );
}