import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';

import { Notes } from '../api/notes';

export class Editor extends React.Component {
    updateBody(e) {
        this.props.call('notes.update', this.props.note._id, {
            body: e.target.value
        });
    }
    updateTitle(e) {
        this.props.call('notes.update', this.props.note._id, {
            title: e.target.value
        });
    }
    render() {


        if (this.props.note) {
            return (
                <div>
                    <input value={this.props.note.title} placeholder="Note Title" onChange={this.updateTitle.bind(this)}/>
                    <textarea value={this.props.note.body} placeholder="Note Body" onChange={this.updateBody.bind(this)}/>
                    <button>Delete Note</button>
                </div>
            );
        } else {
            return (
                <p>
                    {this.props.selectedNoteId ? 'Note Not Found' : 'Select or create a note to edit'}
                </p>
            );
        }
    }
};

Editor.proptypes = {
    note: PropTypes.object,
    selectedNoteId: PropTypes.string
};

export default createContainer(() => {
    const selectedNoteId = Session.get('selectedNoteId');

    return {
        selectedNoteId,
        note: Notes.findOne(selectedNoteId),
        call: Meteor.call
    };
}, Editor);