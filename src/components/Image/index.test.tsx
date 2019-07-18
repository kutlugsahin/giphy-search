import * as React from 'react';
import { shallow } from 'enzyme';
import Image from '.';

describe('Image Component', () => {
    const url = 'http://someurl';

    it('Renders img with correct src', () => {
        const wrapper = shallow(<Image url={url} aspect={1} previewUrl={url}/>);

        expect(wrapper.find('img').first().prop('src')).toEqual(url);
    })
})