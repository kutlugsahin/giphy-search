import * as React from 'react';
import { shallow } from 'enzyme';
import InfiniteScroller from '.';
import { ImageLoadStatus } from '../../providers/ImageProvider/interface';

describe('InfiniteScroller Component', () => {
    const loadMock = jest.fn();

    it('Loading status renders spinner', () => {
        const wrapper = shallow(<InfiniteScroller status={ImageLoadStatus.LOADING} />);

        expect(wrapper.find('spinnerContainer')).toBeDefined();
    })

    it('Error status renders error container', () => {
        const wrapper = shallow(<InfiniteScroller status={ImageLoadStatus.ERROR} />);

        expect(wrapper.find('errorContainer')).toBeDefined();
    })
})