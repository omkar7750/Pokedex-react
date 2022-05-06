import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import AdvancedSearch from '../components/advancedsearch';
import 'whatwg-fetch'

const sampleProps = {
    typeWeaknessList:['Grass', 'Poison', 'Fire', 'Flying', 'Water', 'Bug', 'Normal', 'Electric', 'Ground', 'Fighting', 'Psychic', 'Rock', 'Ice', 'Ghost', 'Dragon', 'Fairy', 'Dark', 'Steel'],
    handleMSearch: jest.fn()
}

const backgroundColor = (element) => window.getComputedStyle(element).backgroundColor;

describe('Test Advanced search component', ()=>{
    test('renders PokeCard component', () => {
        let component = render(<AdvancedSearch {...sampleProps} />);
        const advSearchComp = component.getByTestId(`advancedSearch`); 
        expect(advSearchComp).toBeInTheDocument();
    })

    test('test all abilities rendered', () => {
        let component = render(<AdvancedSearch {...sampleProps} />);
        const advSearchComp = component.getByTestId(`advancedSearch`); 
        fireEvent.click(advSearchComp);
        let abilitiesComps = component.getAllByTestId('ability');
        expect(abilitiesComps.length).toEqual(sampleProps.typeWeaknessList.length);
    })

    test('render search and reset buttons', () => {
        const component = render(<AdvancedSearch {...sampleProps} />);
        const advSearchComp = component.getByTestId(`advancedSearch`); 
        fireEvent.click(advSearchComp);
        const  advSearchBtn = component.getByTestId('advSearchBtn');
        const resetBtn = component.getByTestId('resetBtn');
        expect(advSearchBtn).toBeInTheDocument();
        expect(resetBtn).toBeInTheDocument();
    })

    test('Test type and filter selectors length and are clickable', () => {
        const component = render(<AdvancedSearch {...sampleProps} />);
        const advSearchComp = component.getByTestId(`advancedSearch`); 
        fireEvent.click(advSearchComp);
        const  typeSelectorBtn = component.getAllByTestId(/type-/);
        const  weaknessSelectorBtn = component.getAllByTestId(/weakness-/);
        expect(typeSelectorBtn.length).toEqual(sampleProps.typeWeaknessList.length);
        expect(weaknessSelectorBtn.length).toEqual(sampleProps.typeWeaknessList.length);

        fireEvent.click(typeSelectorBtn[0]);
        expect(backgroundColor(typeSelectorBtn[0])).toBe("rgb(48, 167, 215)");

        fireEvent.click(typeSelectorBtn[0]);
        expect(backgroundColor(typeSelectorBtn[0])).toBe("rgb(242, 242, 242)");
        
    });


    test('Passed handleMSearch gets called on search click', () => {
        
        const component = render(<AdvancedSearch {...sampleProps} />);
        const  advSearchBtn = component.getByTestId('advSearchBtn');
        const  typeSelectorBtn = component.getAllByTestId(/type-/);
        const  weaknessSelectorBtn = component.getAllByTestId(/weakness-/);
        fireEvent.click(advSearchBtn); 
        expect(sampleProps.handleMSearch).toHaveBeenCalledWith("", [], []);


        fireEvent.click( typeSelectorBtn[0]);
        fireEvent.click( weaknessSelectorBtn[4]);
        fireEvent.click(advSearchBtn); 
        expect(sampleProps.handleMSearch).toHaveBeenCalledWith( "", [sampleProps.typeWeaknessList[0]], [sampleProps.typeWeaknessList[4]]);

    })

    
    test('Passed handleMSearch gets called on reset click', () => {
        
        const component = render(<AdvancedSearch {...sampleProps} />);
        const  resetBtn = component.getByTestId('resetBtn');
        fireEvent.click(resetBtn); 
        expect(sampleProps.handleMSearch).toHaveBeenCalledWith("", "", "");
    })

})


