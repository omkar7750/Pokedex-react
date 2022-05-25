
import { mount } from "enzyme";
import 'whatwg-fetch';
import Footer from '../components/footer';

describe('Test Footer component', () => {
    test('Test snapshot', () => {
        const wrapper =mount(<Footer />);
        expect(wrapper.find('Footer')).toMatchSnapshot();
    });

    test('renders Footer component', () => {
        const wrapper =mount(<Footer />);
        expect(wrapper.find('Footer')).toHaveLength(1);
        
    });

    test('Test Footer has about us', () => {
        const wrapper =mount(<Footer />);
        expect(wrapper.find("Footer").find('.footer-container').find('.about-us').text()).toEqual('About Us');
        
    });
})



