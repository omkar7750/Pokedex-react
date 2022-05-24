
import { mount } from "enzyme";
import 'whatwg-fetch';
import FloatingNavButton from '../components/floatingnavbtn';
import { MemoryRouter } from 'react-router-dom';

describe('Test Nav button component', () => {
    test('Test snapshot', () => {
        const wrapper =mount(<MemoryRouter><FloatingNavButton /></MemoryRouter>);
        expect(wrapper.find('FloatingNavButton')).toMatchSnapshot();
    });

    test('renders Nav button component', () => {
        const wrapper =mount(<MemoryRouter><FloatingNavButton /></MemoryRouter>);
        expect(wrapper.find('FloatingNavButton')).toHaveLength(1);
        
    });

    test('Test link in Nav button component refers to home page', () => {
        const wrapper =mount(<MemoryRouter><FloatingNavButton /></MemoryRouter>);
        expect(wrapper.find('FloatingNavButton').find('a').prop('href')).toEqual('/');
        
    });
})



