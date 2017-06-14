import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Notes } from '../api/notes';
import NoteListHeader from './noteListHeader';
import NoteListItem from './noteListItem';

export const NoteList = (props) => {
    return (
        <div>
            <NoteListHeader />
            {props.notes.map((note) => {
                return <NoteListItem key={note._id} note={note}/>
            })}
            NoteList { props.notes.length }
        </div>
    )
};

NoteList.proptypes = {
    notes: PropTypes.array.isRequired
};

export default createContainer (() => {
    Meteor.subscribe('notes');

    return {
        notes: Notes.find().fetch()
    }
}, NoteList);