// import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { mount, shallow } from "enzyme";
// import '@testing-library/jest-dom'
import Pokedex from '../components/Pokedex';
import { MemoryRouter } from 'react-router-dom';
import 'whatwg-fetch'


describe("Test Pokedex component", () => {

  test('Test snapshot', () => {
    
    const wrapper =mount(<MemoryRouter><Pokedex /></MemoryRouter>);
    const PokedexComp = wrapper.find('Pokedex');
    expect(PokedexComp).toMatchSnapshot();
  });

  test('renders Pokedex component', () => {
    const wrapper =mount(<MemoryRouter><Pokedex /></MemoryRouter>);
    expect(wrapper.find('Pokedex').childAt(0).find(".pokedex-title").text()).toEqual("Pokédex");
    
    /** Using react testing library */
    // render(<Pokedex />);
    // const linkElement = screen.getByText(/Pokédex/i);
    // expect(linkElement).toBeInTheDocument();
  });


  test('renders Pokedex animation component', () => {
    const wrapper =mount(<MemoryRouter><Pokedex /></MemoryRouter>);
    expect(wrapper.render().find(".pok-icon-pokedex")).toHaveLength(1)

    /** Using react testing library */
    // render(<Pokedex />);
    // const pokAnimationComp = screen.getByTestId("pok-animation");
    // expect(pokAnimationComp).toBeInTheDocument();
  });
  

  test('render SearchBox child component', () => {


    const wrapper =mount(<MemoryRouter><Pokedex /></MemoryRouter>);
    expect(wrapper.find('SearchBox')).toHaveLength(1);


    /** Using react testing library */
    // const component = render(<Pokedex />);
    // const searchboxComp = component.getByLabelText('Name or Number');
    // expect(searchboxComp).toBeInTheDocument();
  })

  test('render AdvancedSearch child component', () => {
    
    const wrapper =mount(<MemoryRouter><Pokedex /></MemoryRouter>);
    expect(wrapper.find("AdvancedSearch")).toHaveLength(1);

    /** Using react testing library */
    // const component = render(<Pokedex />);
    // const AdvSearchComp = component.getByText('Show Advanced Search');
    // expect(AdvSearchComp).toBeInTheDocument();
  })

  test('render Pok list container and pokecards', async() => {
    
    const wrapper = mount(<MemoryRouter><Pokedex /></MemoryRouter>);
    await wrapper.find("Pokedex").instance().componentDidMount()
    await wrapper.find("Pokedex").update();
    const pokListContainer = wrapper.find("Pokedex").childAt(0).children().find(".poke-list-container");
    expect(pokListContainer).toBeTruthy()
    const pokCards = pokListContainer.childAt(0).children();
    expect(pokCards).toHaveLength(12);

    /** Using react testing library */
    // const component = render(<BrowserRouter><Pokedex /></BrowserRouter>);
    // await waitFor(() =>{ 
    //   expect(component.getAllByAltText('pok-image')).toHaveLength(151);
    // })
    

  })

  test('Test searchbox filtering', async() => {
    jest.setTimeout(10000);
    const wrapper = mount(<MemoryRouter><Pokedex /></MemoryRouter>);
    await wrapper.find("Pokedex").instance().componentDidMount()
    await wrapper.find("Pokedex").update();
    const inputCtrl = wrapper.find("Pokedex").childAt(0).children().find("[data-testid=\"searchbox-input\"]");
    inputCtrl.simulate('change',  {target: {value: 'char'}});

    const searchbtnCtrl = wrapper.find("Pokedex").childAt(0).children().find("[data-testid=\"searchboxSearchbtn\"]");
    searchbtnCtrl.simulate("click");

    const pokListContainer = wrapper.find("Pokedex").childAt(0).children().find(".poke-list-container");
    const pokCards = pokListContainer.childAt(0).children();
    expect(pokCards).toHaveLength(3);


    /** Using react testing library */
    // const component = render(<MemoryRouter><Pokedex /></MemoryRouter>);
    
    // await waitFor(() =>{
    //   const inputCtrl = component.getByTestId('searchbox-input');
    //   fireEvent.change(inputCtrl, {target: {value: 'char'}});
    //   const searchboxSearchbtn = component.getByTestId('searchboxSearchbtn');
    //   fireEvent.click(searchboxSearchbtn);
    //   expect(component.getAllByAltText('pok-image')).toHaveLength(3);

    // });
  })

  test('Test advanced search and reset functionality', async() => {
    jest.setTimeout(10000);
    const wrapper = mount(<MemoryRouter><Pokedex /></MemoryRouter>);
    await wrapper.find("Pokedex").instance().componentDidMount()
    await wrapper.find("Pokedex").update();

    const pokDexContainer = wrapper.find("Pokedex").childAt(0).children();
    const advSearchAccordion = pokDexContainer.find("#advancedSearch").at(1);
    

    advSearchAccordion.simulate('click');

    const typeFlyingbtn = pokDexContainer.find("[data-testid=\"type-Flying\"]");
    const typeFirebtn = pokDexContainer.find("[data-testid=\"type-Fire\"]");
    const advSearchBtn = pokDexContainer.find("[data-testid=\"advSearchBtn\"]");
    const resetBtn = pokDexContainer.find("[data-testid=\"resetBtn\"]");

    typeFlyingbtn.simulate("click");
    typeFirebtn.simulate("click");
    advSearchBtn.simulate("click");


    const pokListContainer = wrapper.find("Pokedex").childAt(0).children().find(".poke-list-container");
    const pokCards = pokListContainer.childAt(0).children();
    expect(pokCards).toHaveLength(2);


    resetBtn.simulate("click");
    const pokListContainer2 = wrapper.find("Pokedex").childAt(0).children().find(".poke-list-container");
    const pokCards2 = pokListContainer2.childAt(0).children();
    expect(pokCards2).toHaveLength(12);
    

    const weakGrassbtn = pokDexContainer.at(2).find("Accordion").find(".pokedex-filter-tw-list").find("li > span.weakness-selector-Grass");
    const weakWaterbtn = pokDexContainer.at(2).find("Accordion").find(".pokedex-filter-tw-list").find("li > span.weakness-selector-Water");
    const weakGroundbtn = pokDexContainer.at(2).find("Accordion").find(".pokedex-filter-tw-list").find("li > span.weakness-selector-Ground");
    const weakIcebtn = pokDexContainer.at(2).find("Accordion").find(".pokedex-filter-tw-list").find("li > span.weakness-selector-Ice");

  


    weakGrassbtn.simulate("click");
    weakWaterbtn.simulate("click");
    weakGroundbtn.simulate("click");
    weakIcebtn.simulate("click");
    advSearchBtn.simulate("click");

    expect(wrapper.find("Pokedex").childAt(0).children().find(".poke-list-container").childAt(0).children()).toHaveLength(6);

    resetBtn.simulate("click");
    expect(wrapper.find("Pokedex").childAt(0).children().find(".poke-list-container").childAt(0).children()).toHaveLength(12);


    /** Using react testing library */
    // const component = render(<BrowserRouter><Pokedex /></BrowserRouter>);
  
    // await waitFor(() =>{
    //   const advSearchAccordion = component.getByTestId('advancedSearch');
    //   fireEvent.click(advSearchAccordion);
    //   fireEvent.click(component.getByTestId('type-Flying'));
    //   fireEvent.click(component.getByTestId('type-Fire'));
    //   fireEvent.click(component.getByTestId('advSearchBtn'));
    //   expect(component.getAllByAltText('pok-image')).toHaveLength(2);

    //   fireEvent.click(component.getByTestId('resetBtn'));
    //   expect(component.getAllByAltText('pok-image')).toHaveLength(151);
    // });
  })

  test('Test combination of adv. search , reset and searchbox filter', async() => {
    jest.setTimeout(10000);
    const wrapper = mount(<MemoryRouter><Pokedex /></MemoryRouter>);
    await wrapper.find("Pokedex").instance().componentDidMount()
    await wrapper.find("Pokedex").update();
    const inputCtrl = wrapper.find("Pokedex").childAt(0).children().find("[data-testid=\"searchbox-input\"]");
    inputCtrl.simulate('change',  {target: {value: 'char'}});

    const searchbtnCtrl = wrapper.find("Pokedex").childAt(0).children().find("[data-testid=\"searchboxSearchbtn\"]");
    searchbtnCtrl.simulate("click");

    let pokListContainer = wrapper.find("Pokedex").childAt(0).children().find(".poke-list-container");
    let pokCards = pokListContainer.childAt(0).children();
    expect(pokCards).toHaveLength(3);

    const pokDexContainer = wrapper.find("Pokedex").childAt(0).children();
    const advSearchAccordion = pokDexContainer.find("#advancedSearch").at(1);
    

    advSearchAccordion.simulate('click');

    const typeFlyingbtn = pokDexContainer.find("[data-testid=\"type-Flying\"]");
    const typeFirebtn = pokDexContainer.find("[data-testid=\"type-Fire\"]");
    const advSearchBtn = pokDexContainer.find("[data-testid=\"advSearchBtn\"]");
    const resetBtn = pokDexContainer.find("[data-testid=\"resetBtn\"]");

    typeFlyingbtn.simulate("click");
    typeFirebtn.simulate("click");
    advSearchBtn.simulate("click");


    pokListContainer = wrapper.find("Pokedex").childAt(0).children().find(".poke-list-container");
    pokCards = pokListContainer.childAt(0).children();
    expect(pokCards).toHaveLength(1);


    inputCtrl.simulate('change',  {target: {value: ''}});
    searchbtnCtrl.simulate("click");

    pokListContainer = wrapper.find("Pokedex").childAt(0).children().find(".poke-list-container");
    pokCards = pokListContainer.childAt(0).children();
    expect(pokCards).toHaveLength(2);

    inputCtrl.simulate('change',  {target: {value: 'char'}});
    searchbtnCtrl.simulate("click");
    resetBtn.simulate("click");

    pokListContainer = wrapper.find("Pokedex").childAt(0).children().find(".poke-list-container");
    pokCards = pokListContainer.childAt(0).children();
    expect(pokCards).toHaveLength(3);

    inputCtrl.simulate('change',  {target: {value: ''}});
    searchbtnCtrl.simulate("click");

    pokListContainer = wrapper.find("Pokedex").childAt(0).children().find(".poke-list-container");
    pokCards = pokListContainer.childAt(0).children();
    expect(pokCards).toHaveLength(12);


    /** Using react testing library */
    // const component = render(<BrowserRouter><Pokedex /></BrowserRouter>);
  
    // await waitFor(() =>{

    //   const inputCtrl = component.getByTestId('searchbox-input');
    //   fireEvent.change(inputCtrl, {target: {value: 'char'}});
    //   const searchboxSearchbtn = component.getByTestId('searchboxSearchbtn');
    //   fireEvent.click(searchboxSearchbtn);
    //   expect(component.getAllByAltText('pok-image')).toHaveLength(3);

    //   const advSearchAccordion = component.getByTestId('advancedSearch');
    //   fireEvent.click(advSearchAccordion);
    //   fireEvent.click(component.getByTestId('type-Flying'));
    //   fireEvent.click(component.getByTestId('type-Fire'));
    //   fireEvent.click(component.getByTestId('advSearchBtn'));
    //   expect(component.getAllByAltText('pok-image')).toHaveLength(1);

    //   fireEvent.change(inputCtrl, {target: {value: ''}});
    //   fireEvent.click(searchboxSearchbtn);
    //   expect(component.getAllByAltText('pok-image')).toHaveLength(2);

    //   fireEvent.change(inputCtrl, {target: {value: 'char'}});
    //   fireEvent.click(searchboxSearchbtn);
    //   fireEvent.click(component.getByTestId('resetBtn'));
    //   expect(component.getAllByAltText('pok-image')).toHaveLength(3);

    //   fireEvent.change(inputCtrl, {target: {value: ''}});
    //   fireEvent.click(searchboxSearchbtn);
    //   expect(component.getAllByAltText('pok-image')).toHaveLength(151);
    // });
  })

  test('render Navbutton component', async() => {
    
    const wrapper = mount(<MemoryRouter><Pokedex /></MemoryRouter>);
    const NavButtonComp = wrapper.find("Pokedex").find("FloatingNavButton");
    expect(NavButtonComp).toHaveLength(1);
  })

  test('Test Page size component rendering', async() => {
    const wrapper = mount(<MemoryRouter><Pokedex /></MemoryRouter>);
    await wrapper.find("Pokedex").instance().componentDidMount()
    await wrapper.find("Pokedex").update();
    expect(wrapper.find("Pokedex").find('.page-size')).toHaveLength(1)
    expect(wrapper.find("Pokedex").find('.page-size').find('.pagesize-input').prop('value')).toEqual(12)
  })

  test('Test Pagination pageno component rendering', async() => {
    const wrapper = mount(<MemoryRouter><Pokedex /></MemoryRouter>);
    await wrapper.find("Pokedex").instance().componentDidMount()
    await wrapper.find("Pokedex").update();
    expect(wrapper.find("Pokedex").find('.pagination')).toHaveLength(1)
    expect(wrapper.find("Pokedex").find('.pagination').find('.page-no')).toHaveLength(13)
    expect(wrapper.find("Pokedex").find('.pagination').find('.pagination-active-page-no')).toHaveLength(1)
  })

  test('Test sorting', async() => {
    const wrapper = mount(<MemoryRouter><Pokedex /></MemoryRouter>);
    await wrapper.find("Pokedex").instance().componentDidMount()
    await wrapper.find("Pokedex").update();

    let pokListContainer = wrapper.find("Pokedex").childAt(0).children().find(".poke-list-container");
    let pokCards = pokListContainer.childAt(0).children();
    expect(pokCards).toHaveLength(12);

    expect(pokCards.at(0).find('.pok-name').text()).toEqual('Bulbasaur');
    const pokDexContainer = wrapper.find("Pokedex").childAt(0).children();
    const advSearchAccordion = pokDexContainer.find("#advancedSearch").at(1);
    
    advSearchAccordion.simulate('click');
    advSearchAccordion.find('.adv-sort-container').find('#asc').simulate('change', {target:{value: true}})
    pokListContainer = wrapper.find("Pokedex").childAt(0).children().find(".poke-list-container");
    pokCards = pokListContainer.childAt(0).children();
    expect(pokCards).toHaveLength(12);

    expect(pokCards.at(0).find('.pok-name').text()).toEqual('Abra');

    advSearchAccordion.find('.adv-sort-container').find('#desc').simulate('change', {target:{value: true}})
    pokListContainer = wrapper.find("Pokedex").childAt(0).children().find(".poke-list-container");
    pokCards = pokListContainer.childAt(0).children();
    expect(pokCards).toHaveLength(12);

    expect(pokCards.at(0).find('.pok-name').text()).toEqual('Zubat');
  }, 15000)

  test('Test working Pagesize component', async() => {
    const wrapper = mount(<MemoryRouter><Pokedex /></MemoryRouter>);
    await wrapper.find("Pokedex").instance().componentDidMount()
    await wrapper.find("Pokedex").update();

    let pokListContainer = wrapper.find("Pokedex").childAt(0).children().find(".poke-list-container");
    let pokCards = pokListContainer.childAt(0).children();
    expect(pokCards).toHaveLength(12);
    
    wrapper.find("Pokedex").find('.page-size').find('.pagesize-input').simulate('change', { target: {value: 5}})
    pokListContainer = wrapper.find("Pokedex").childAt(0).children().find(".poke-list-container");
    pokCards = pokListContainer.childAt(0).children();
    expect(pokCards).toHaveLength(5);

    wrapper.find("Pokedex").find('.page-size').find('.pagesize-input').simulate('change', { target: {value: 10}})
    pokListContainer = wrapper.find("Pokedex").childAt(0).children().find(".poke-list-container");
    pokCards = pokListContainer.childAt(0).children();
    expect(pokCards).toHaveLength(10);
  }, 15000)

  test('Test working Pagesize-pagination component', async() => {
    const wrapper = mount(<MemoryRouter><Pokedex /></MemoryRouter>);
    await wrapper.find("Pokedex").instance().componentDidMount()
    await wrapper.find("Pokedex").update();

    let pokListContainer = wrapper.find("Pokedex").childAt(0).children().find(".poke-list-container");
    let pokCards = pokListContainer.childAt(0).children();
    expect(pokCards).toHaveLength(12);
    
    wrapper.find("Pokedex").find('.page-size').find('.pagesize-input').simulate('change', { target: {value: 5}})
    expect(wrapper.find("Pokedex").find('.pagination').find('.page-no')).toHaveLength(31)
    


    wrapper.find("Pokedex").find('.page-size').find('.pagesize-input').simulate('change', { target: {value: 10}})
    expect(wrapper.find("Pokedex").find('.pagination').find('.page-no')).toHaveLength(16)
    wrapper.find("Pokedex").find('.pagination').find('.page-no').at(15).simulate('click');

    pokListContainer = wrapper.find("Pokedex").childAt(0).children().find(".poke-list-container");
    pokCards = pokListContainer.childAt(0).children();
    expect(pokCards).toHaveLength(1);

  }, 15000)


  test('Test pokemon list mode selector', async() => {
    const wrapper = mount(<MemoryRouter><Pokedex /></MemoryRouter>);
    await wrapper.find("Pokedex").instance().componentDidMount()
    await wrapper.find("Pokedex").update();
    expect(wrapper.find("Pokedex").find('.poklist-mode')).toHaveLength(1)
    expect(wrapper.find("Pokedex").find('.poklist-mode').find('input.poklist-mode-checkbox')).toHaveLength(1)
    
  })

  test('Test pokemon list mode view', async() => {
    const wrapper = mount(<MemoryRouter><Pokedex /></MemoryRouter>);
    await wrapper.find("Pokedex").instance().componentDidMount()
    await wrapper.find("Pokedex").update();
    expect(wrapper.find("Pokedex").find('.poklist-mode').find('input.poklist-mode-checkbox')).toHaveLength(1)
    wrapper.find("Pokedex").find('.poklist-mode').find('input.poklist-mode-checkbox').simulate('change', {target: {checked: true}});
    expect(wrapper.find('Pokedex').find('.poke-list-container').find('ul li.li-listView').length).toEqual(12);
    wrapper.find("Pokedex").find('.poklist-mode').find('input.poklist-mode-checkbox').simulate('change', {target: {checked: false}});
    expect(wrapper.find('Pokedex').find('.poke-list-container').find('ul li.li-listView').length).toEqual(0);
  })

})




