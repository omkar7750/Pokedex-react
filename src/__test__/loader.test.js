import { mount } from "enzyme";
import 'whatwg-fetch';
import Loader from "../components/loader";

describe('Test Loader component', () => {
    test('Test snapshot', () => {
        const wrapper =mount(<Loader />);
        expect(wrapper.find('Loader')).toMatchSnapshot();
    });

    test('renders Loader component', () => {
        const wrapper =mount(<Loader />);
        expect(wrapper.find('Loader')).toHaveLength(1);
        
    });

    test('renders Loader image', () => {
        const wrapper =mount(<Loader />);
        expect(wrapper.find('Loader').find('.loader-comp')).toHaveLength(1);
        
    });

})