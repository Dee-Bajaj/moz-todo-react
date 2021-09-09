import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from '../components/Form';

describe('Test From', () => {
    let getByTestId, addTask;

    beforeEach(async () => {
        addTask = jest.fn().mockName('addTask');
        ({ getByTestId} = render(<Form addTask={addTask} />));
    });

    it('adds task', () => {
        userEvent.type((getByTestId("Input-Text")), "Test Task");
        userEvent.click((getByTestId("Submit-Button")));
        expect(addTask).toHaveBeenCalledWith("Test Task");
    });

    it('does not add empty task', () => {
        userEvent.type((getByTestId("Input-Text")), '');
        userEvent.click((getByTestId("Submit-Button")));
        expect(addTask).not.toHaveBeenCalledWith();
    });
});