import React from 'react';
import expect from 'expect';
import { Meteor } from 'meteor/meteor';
import { mount } from 'enzyme';

import { NoteList } from './noteList';
import  { notes } from '../fixtures/fixtures';

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