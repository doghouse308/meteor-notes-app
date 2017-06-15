import React from 'react';
import expect from 'expect';
import { Meteor } from 'meteor/meteor';
import { mount } from 'enzyme';

import { NoteList } from './noteList';

const notes = [
    {
        _id:  'testnote1',
        title: 'Title 1',
        body: '',
        updatedAt: 0,
        userId: 'user1'
    }, {
        _id:  'testnote2',
        title: 'Title 2',
        body: '',
        updatedAt: 0,
        userId: 'user2'
    }
]

if (Meteor.isClient){
    describe('NoteList', function() {

        it('should render note list item for each note', function () {
            const wrapper = mount(<NoteList notes={notes}/>);

            expect(wrapper.find('NoteListItem').length).toBe(2);
            expect(wrapper.find('NoteListEmptyItem').length).toBe(0);            
        });

        it('should render NotelistEmptyItem when no notes', function(){
            const emptyNotes = [];
            const wrapper = mount(<NoteList notes={emptyNotes} />);
            
            expect(wrapper.find('NoteListItem').length).toBe(0);
            expect(wrapper.find('NoteListEmptyItem').length).toBe(1);
        })
    });
}