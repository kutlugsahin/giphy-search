import * as React from 'react';
import { shallow, mount } from 'enzyme';
import SearchBox from '.';

describe('Search Box', () => {
    const searchMock = jest.fn();

    it('Calls search function', () => {
        const wrapper = mount(<SearchBox search={searchMock}/>);

        wrapper.find('form').first().simulate('submit');

        expect(searchMock).toBeCalled();

        wrapper.unmount();
    })
})