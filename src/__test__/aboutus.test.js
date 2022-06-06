
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import 'whatwg-fetch';
import AboutUs from '../components/aboutus';
import config from "../config";

describe('Test AboutUs component', () => {
    test('Test snapshot', () => {
        const wrapper =mount(<MemoryRouter><AboutUs /></MemoryRouter>);
        expect(wrapper.find('AboutUs')).toMatchSnapshot();
    });

    test('renders AboutUs component', () => {
        const wrapper =mount(<MemoryRouter><AboutUs /></MemoryRouter>);
        expect(wrapper.find('AboutUs')).toHaveLength(1);
        
    });

    test('Test AboutUs page title', () => {
        const wrapper =mount(<MemoryRouter><AboutUs /></MemoryRouter>);
        expect(wrapper.find('AboutUs').find('.aboutus-title').text()).toEqual('About Us');
    });

    test('Test AboutUs explore pokedex link', () => {
        const wrapper =mount(<MemoryRouter><AboutUs /></MemoryRouter>);
        expect(wrapper.find('AboutUs').find('.aboutus-pokdex-nav').find('a.aboutus-pokdex-link').prop('href')).toEqual('/pokdex');
    });

    test('Test AboutUs floating navbutton link', () => {
        const wrapper =mount(<MemoryRouter><AboutUs /></MemoryRouter>);
        expect(wrapper.find('AboutUs').find('.aboutus-pokdex-nav').find('a.nav-btn-link')).toHaveLength(1);
        expect(wrapper.find('AboutUs').find('.aboutus-pokdex-nav').find('a.nav-btn-link').prop('href')).toEqual('/');
    });

    test('Test AboutUs content properly', () => {
        const wrapper =mount(<MemoryRouter><AboutUs /></MemoryRouter>);
        expect(wrapper.find('AboutUs').find('.aboutus-content').find('.desc').text()).toEqual(config.aboutusContent); 
    });

    test('Test AboutUs pikachu image rendered properly', () => {
        const wrapper =mount(<MemoryRouter><AboutUs /></MemoryRouter>);
        expect(wrapper.find('AboutUs').find('.aboutus-content').find('.aboutus-pikachu-image')).toHaveLength(1); 
    });
    


})



