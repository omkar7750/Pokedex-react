
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import 'whatwg-fetch';
import Footer from '../components/footer';

describe('Test Footer component', () => {
    test('Test snapshot', () => {
        const wrapper =mount(<MemoryRouter><Footer /></MemoryRouter>);
        expect(wrapper.find('Footer')).toMatchSnapshot();
    });

    test('renders Footer component', () => {
        const wrapper =mount(<MemoryRouter><Footer /></MemoryRouter>);
        expect(wrapper.find('Footer')).toHaveLength(1);
        
    });

    test('Test Footer has about us link pointing to proper route', () => {
        const wrapper =mount(<MemoryRouter><Footer /></MemoryRouter>);
        expect(wrapper.find("Footer").find('.footer-container').find('a.about-us').text()).toEqual('About Us');
        expect(wrapper.find("Footer").find('.footer-container').find('a.about-us').prop('href')).toEqual('/aboutus');
        
    });
})



