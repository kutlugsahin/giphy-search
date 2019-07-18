import * as React from 'react';
import { shallow } from 'enzyme';
import { AppBar } from '.';

describe('AppBar Component', () => {
    const setColumnsMock = jest.fn();
    const searchMock = jest.fn();

    it('Switch to three column layout', () => {
        const appbar = shallow(<AppBar search={searchMock} setImageGridColumns={setColumnsMock} />);
        
        appbar.find('button').at(1).simulate('click');

        expect(setColumnsMock).toBeCalledWith(3);
    })

    it('Switch to single column layout', () => {
        const appbar = shallow(<AppBar search={searchMock} setImageGridColumns={setColumnsMock} />);

        appbar.find('button').at(0).simulate('click');

        expect(setColumnsMock).toBeCalledWith(1);
    })
})