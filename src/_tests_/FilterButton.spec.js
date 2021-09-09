import React from 'react';
import { render } from '@testing-library/react';
import FilterButton from '../components/FilterButton';
import userEvent from '@testing-library/user-event';

describe("Test Filter Button", () => {
    let setFilter,name, getByTestId;
    beforeEach(async () => {
        name = 'All'
        setFilter = jest.fn().mockName('setFilter');
        ({getByTestId} = render(<FilterButton key={name} name={name} isPressed={false} setFilter={setFilter} />));

    });

    it("triggers setFilter", () =>{
        
        userEvent.click(getByTestId("Filter-Button"));
        expect(setFilter).toHaveBeenCalledWith("All")
    });
});

