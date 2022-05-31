
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import 'whatwg-fetch';
import Gallary from '../components/gallary';
import { act } from "react-dom/test-utils";

const waitForComponentToRender = async (wrapper) => {
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      wrapper.update();
    });
 };

describe('Test Gallary component', () => {
    test('Test snapshot', () => {
        const wrapper =mount(<MemoryRouter><Gallary /></MemoryRouter>);
        expect(wrapper.find('Gallary')).toMatchSnapshot();
    });

    test('renders Gallary component', () => {
        const wrapper =mount(<MemoryRouter><Gallary /></MemoryRouter>);
        expect(wrapper.find('Gallary')).toHaveLength(1); 
    });

    test('Test Gallary heading', () => {
        const wrapper =mount(<MemoryRouter><Gallary /></MemoryRouter>);
        expect(wrapper.find('Gallary').find('.gallary').find('.gal-heading').text()).toEqual("Pokemon Gallary"); 
    });

    test('Test Gallary nav links to home, pokedex and aboutus pages', () => {
        const wrapper =mount(<MemoryRouter><Gallary /></MemoryRouter>);
        const navLinkArr = wrapper.find('Gallary').find('.gallary').find('a.gal-nav-link');
        expect(navLinkArr).toHaveLength(3);
        expect(navLinkArr.at(0).prop('href')).toEqual('/');
        expect(navLinkArr.at(1).prop('href')).toEqual('/pokdex');
        expect(navLinkArr.at(2).prop('href')).toEqual('/aboutus');
    });

    test('Test Gallary renders Loader', () => {
        const wrapper =mount(<MemoryRouter><Gallary /></MemoryRouter>);
        const loaderComp = wrapper.find('Gallary').find('Loader');
        expect(loaderComp).toHaveLength(1)
    });

    test('Test Gallary zoomed image, image slide icons', async() => {
        const gallayComp =mount(<MemoryRouter><Gallary /></MemoryRouter>).find('Gallary');
        await waitForComponentToRender(gallayComp);
        await gallayComp.update();
        const galSlideicon = gallayComp.find('.gal-zoomed-view').render().find('.gal-image-slide-icon');
        expect(galSlideicon).toHaveLength(2)
        expect(gallayComp.find('.gal-zoomed-view').render().find( '.zoomed-image')).toHaveLength(1)
        // expect(gallayComp.find('.gal-images-to-view').render().find('.imgview')).toHaveLength(2)
    });

    // test('Test Gallary images in imgview pannel', async() => {
    //     const gallayComp =mount(<MemoryRouter><Gallary /></MemoryRouter>).find('Gallary');
    //     await waitForComponentToRender(gallayComp);
    //     await gallayComp.update();
    //     expect(gallayComp.find('.gal-images-to-view').render().find('.imgview')).toHaveLength(2)
    // },15000);

})