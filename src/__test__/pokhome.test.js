
import { mount } from "enzyme";
import 'whatwg-fetch';
import PokHome from '../components/pokhome';
import { MemoryRouter } from 'react-router-dom';
import config from "../config";

describe('Test PokHome component', () => {
    test('Test snapshot', () => {
        const wrapper =mount(<MemoryRouter><PokHome /></MemoryRouter>);
        expect(wrapper.find('PokHome')).toMatchSnapshot();
    });

    test('renders PokHome component', () => {
        const wrapper =mount(<MemoryRouter><PokHome /></MemoryRouter>);
        expect(wrapper.find('PokHome')).toHaveLength(1);
        
    });

    test('Test PokHome title', () => {
        const wrapper =mount(<MemoryRouter><PokHome /></MemoryRouter>);
        const PokHomeComp = wrapper.find('PokHome');
        expect(PokHomeComp.find('.pokhome-title').text()).toEqual('Pokemon World');
    });

    test('Test PokHome explore link points to pokdex page', () => {
        const wrapper =mount(<MemoryRouter><PokHome /></MemoryRouter>);
        const PokHomeComp = wrapper.find('PokHome');
        expect(PokHomeComp.find('.pokhome-nav').find('a#pokdexLink').at(0).prop('href')).toEqual('/pokdex');
    });

    test('Test PokHome explore link points to gallary page', () => {
        const wrapper =mount(<MemoryRouter><PokHome /></MemoryRouter>);
        const PokHomeComp = wrapper.find('PokHome');
        expect(PokHomeComp.find('.pokhome-nav').find('a#gallaryLink').at(0).prop('href')).toEqual('/gallary');
    });

    test('Test PokHome description', () => {
        const wrapper =mount(<MemoryRouter><PokHome /></MemoryRouter>);
        const PokHomeComp = wrapper.find('PokHome');
        expect(PokHomeComp.find('.pokhome-description')).toHaveLength(1);
    });
    
    test('Test Description from config is rendered in pokhome description', () => {
        const wrapper =mount(<MemoryRouter><PokHome /></MemoryRouter>);
        const PokHomeComp = wrapper.find('PokHome');
        expect(PokHomeComp.find('.pokhome-description').text()).toEqual(config.pokHomeDescription);
    });
    
    test('Test Footer Component', () => {
        const wrapper =mount(<MemoryRouter><PokHome /></MemoryRouter>);
        const PokHomeComp = wrapper.find('PokHome');
        expect(PokHomeComp.find('Footer')).toHaveLength(1);
        
    });
})



