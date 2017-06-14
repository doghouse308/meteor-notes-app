import React from 'react';
import expect from 'expect';
import { Meteor } from 'meteor/meteor';
import { mount } from 'enzyme';

import NoteListItem from './noteListItem';

if (Meteor.isClient) {
    describe('NoteListItem', function () {
        it('should render title and time stamp', function () {
            const title = 'Note Title';
            const updatedAt = 1497447144561;
            const wrapper = mount(<NoteListItem note={{title, updatedAt }} />);

            expect(wrapper.find('h5').text()).toBe(title);
            expect(wrapper.find('p').text()).toBe('6/14/17')
        });

        it('should set default title if no title set', function () {
            const title = '';
            const updatedAt = 1497447144561;
            const wrapper = mount(<NoteListItem note={{title, updatedAt }} />);

            expect(wrapper.find('h5').text()).toBe('Untitled Note');
        });
    });
}