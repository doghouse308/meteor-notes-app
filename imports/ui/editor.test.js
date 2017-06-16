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

        it('should update the note body on textarea change', function () {
            const newBody = 'This is my new body text';
            const wrapper = mount(<Editor browserHistory={browserHistory} call={call} selectedNoteId={notes[0]._id} note={notes[0]} />);

            wrapper.find('textarea').simulate('change', {
                target: {
                    value: newBody
                }
            });

            expect(wrapper.state('body')).toBe(newBody);
            expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, { body: newBody });
        });
    });
}