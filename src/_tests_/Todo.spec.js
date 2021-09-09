
import React from 'react';
import { render } from '@testing-library/react';
import ToDo from '../components/Todo';
import userEvent from '@testing-library/user-event';

describe('Test todo', () => {
    let id = "task-0", name = "Eat", completed = true, 
    toggleTaskCompleted, deleteTask,
     editTask, getByTestId;

        beforeEach(async () => {
            toggleTaskCompleted = jest.fn().mockName('toggleTaskCompleted');
            deleteTask = jest.fn().mockName('deleteTask');
            editTask = jest.fn().mockName('editTask');
            
            ({ getByTestId } = render(
                <ToDo id={id}
                    name={name}
                    completed={completed}
                    key={id}
                    toggleTaskCompleted={toggleTaskCompleted}
                    deleteTask={deleteTask}
                    editTask={editTask} />
            ));

        });

        it('Toggles Task', () => {
            userEvent.click(getByTestId('CheckBox-Toggle'));
            expect(toggleTaskCompleted).toHaveBeenCalledWith(id);
        });

        it('Edits Task', () => {
            userEvent.click(getByTestId('Button-Edit'));
            userEvent.type(getByTestId("Input-Edit"), "Test");
            userEvent.click(getByTestId("Button-EditSave"));
            expect(editTask).toHaveBeenCalledWith(id,"Test");
        });

        it('Cancels Edit', () => {
            userEvent.click(getByTestId('Button-Edit'));
            userEvent.click(getByTestId("Button-Cancel"));
            expect(editTask).not.toHaveBeenCalled();
        });

        it('Deletes Task', () => {
            userEvent.click(getByTestId("Button-Delete"));
            expect(deleteTask).toHaveBeenCalledWith(id);
        })
    });