import React from 'react';
import expect from 'expect';
import { Meteor } from 'meteor/meteor';
import { mount } from 'enzyme';

import { Editor } from './editor';
import { notes } from '../fixtures/fixtures';

if (Meteor.isClient) {
    describe('Editor', function () {
        let browserHistory;
        let call;

        beforeEach(function () {
            call = expect.createSpy();
            browserHistory = {
                push: expect.createSpy()
            };
        });

        it('should render create note message', function () {
            const wrapper = mount(<Editor browserHistory={browserHistory} call={call} />);

            expect(wrapper.find('p').text()).toBe('Select or create a note to edit');
        });

        it('should render note not found', function () {
            const wrapper = mount(<Editor selectedNoteId={notes[0]._id} browserHistory={browserHistory} call={call} />);

            expect(wrapper.find('p').text()).toBe('Note Not Found');
        });

        it('should remove note', function () {
            const wrapper = mount(<Editor note={notes[0]} selectedNoteId={notes[0]._id} browserHistory={browserHistory} call={call} />);

            wrapper.find('button').simulate('click');

            expect(call).toHaveBeenCalledWith('notes.remove', notes[0]._id);
            expect(browserHistory.push).toHaveBeenCalledWith('/dashboard');
        });

        // it('should update the note body on textarea change', function () {
        //     const newBody = 'This is my new body text';
        //     const wrapper = mount(<Editor browserHistory={browserHistory} call={call} selectedNoteId={notes[0]._id} note={notes[0]} />);

        //     wrapper.find('textarea').simulate('change', {
        //         target: {
        //             value: newBody
        //         }
        //     });

        //     expect(wrapper.state('body')).toBe(newBody);
        //     expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, { body: newBody });
        // });

        // it('should update the note title on input change', function() {
        //     const newTitle = 'New Title';
        //     const wrapper = mount(<Editor browserHistory={browserHistory} call={call} selectedNoteId={notes[0]._id} note={notes[0]} />);

        //     wrapper.find('input').simulate('change', {
        //         target: {
        //             value: newTitle
        //         }
        //     });

        //     expect(wrapper.state('title')).toBe(newBody);
        //     expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, { title: newTitle });
        // });

        // it('should set state for new note', function () {
        //     const wrapper = mount(<Editor browserHistory={browserHistory} call={call} />);

        //     wrapper.setProps({
        //         selectedNoteId: notes[0]._id,
        //         note: notes[0]
        //     });

        //     expect(wrapper.state('title')).toBe(notes[0].title);
        //     expect(wrapper.state('body')).toBe(notes[0].body);
        // });

        // it('should not set state if no note provided', function () {
        //     const wrapper = mount(<Editor browserHistory={browserHistory} call={call} />);

        //     wrapper.setProps({
        //         selectedNoteId: notes[0]._id,
        //     });

        //     expect(wrapper.state('title')).toBe('');
        //     expect(wrapper.state('body')).toBe('');
        // });
    });
}