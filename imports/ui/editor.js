import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router'

import { Notes } from '../api/notes';

export class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: ''
        }
    }
    updateBody(e) {
        const body = e.target.value;
        this.setState({ body });
        this.props.call('notes.update', this.props.note._id, { body });
    }
    updateTitle(e) {
        const title = e.target.value;
        this.setState({ title });
        this.props.call('notes.update', this.props.note._id, { title });
    }
    removeNote() {
        this.props.call('notes.remove', this.props.note._id);
        this.props.browserHistory.push('/dashboard');
    }
    componentDidUpdate(prevProps, prevState) {
        const currentNoteId = this.props.note ?this.props.note._id : undefined;
        const prevNoteId = prevProps.notes ? prevProps.note._id : undefined;

        if (currentNoteId && currentNoteId != prevNoteId) {
            this.setState ({
                title: this.props.note.title,
                body: this.props.note.body
            })
        }
    }

    render() {


        if (this.props.note) {
            return (
                <div>
                    <input value={this.state.title} placeholder="Note Title" onChange={this.updateTitle.bind(this)} />
                    <textarea value={this.state.body} placeholder="Note Body" onChange={this.updateBody.bind(this)} />
                    <button onClick={this.removeNote.bind(this)}>Delete Note</button>
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
    selectedNoteId: PropTypes.string,
    call: PropTypes.func.isRequired,
    browserHistory: PropTypes.object.isRequired
};

export default createContainer(() => {
    const selectedNoteId = Session.get('selectedNoteId');

    return {
        selectedNoteId,
        note: Notes.findOne(selectedNoteId),
        call: Meteor.call,
        browserHistory
    };
}, Editor);