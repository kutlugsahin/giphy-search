import * as React from 'react';
import { mount } from 'enzyme';
import { ImageList } from '.';
import { ImageData } from '../../api';
import { ImageLoadStatus } from '../../providers/ImageProvider/interface';

const images: ImageData[] = Array(10).fill(true).map((_, index) => ({
    id: String(index),
    height: 100,
    width: 100,
    url: `http://imgapi/${index}`
} as ImageData));

describe('ImageList Component', () => {
    const loadMoreMock = jest.fn();
 
    it('renders all images', () => {
        const wrapper = mount(<ImageList images={images} columns={1} status={ImageLoadStatus.DONE} loadMore={loadMoreMock}/>);
        expect(wrapper.find('.gridbox').length).toEqual(images.length);
    })
})