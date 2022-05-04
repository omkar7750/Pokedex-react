import React, { useState } from 'react';

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

export default function AdvancedSearch(props) {
  const [filtertypes, setfilterTypes] = useState(props.filtertypes || []);
  const [filterweaknessess, setfilterWeaknessess] = useState(
    props.filterWeaknessess || []
  );
  const [typeWeaknessList, setTypeWeaknessList] = useState(
    props.typeWeaknessList || []
  );

  let handleSearch = () => {
    props.handleMSearch('', filtertypes, filterweaknessess);
  };

  let handleReset = () => {
    props.handleMSearch('', '', '');
    setfilterTypes([]);
    setfilterWeaknessess([]);
  };

  let handleSelect = (val, torw) => {
    if (torw == 'T') {
      let ftypes = [];
      if (filtertypes.includes(val)) {
        ftypes = filtertypes.filter((f) => f != val);
      } else ftypes = [...filtertypes, val];

      setfilterTypes(ftypes);
    } else {
      let fweak = [];
      if (filterweaknessess.includes(val)) {
        fweak = filterweaknessess.filter((f) => f != val);
      } else fweak = [...filterweaknessess, val];

      setfilterWeaknessess(fweak);
    }
  };

  return (
    <Accordion allowZeroExpanded={true}>
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton>Show Advanced Search</AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel>
          <>
            <div className="adv-title-container">
              <h5 className="adv-filter-title">Type & Weakness</h5>
              <div className="filter-help">
                <span>
                  <strong>T</strong> = Type
                </span>
                <span>
                  <strong>W</strong> = Weakness
                </span>
              </div>
            </div>
            <div className="content-block content-block-full">
              <ul class="pokedex-filter-tw-list">
                {props.typeWeaknessList.map((tw, index) => {
                  return (
                    <li key={`pok-type-weak-filter-opt-${index}`}>
                      <span class="pill background-color-dragon">{tw}</span>
                      <span
                        style={{
                          backgroundColor: filtertypes.includes(tw)
                            ? '#30a7d7'
                            : '#f2f2f2',
                        }}
                        data-type="type"
                        data-value={tw}
                        onClick={() => handleSelect(tw, 'T')}
                        className="filter type-filter type-weakness-filter-btn toggle type"
                      >
                        T
                      </span>
                      <span
                        data-type="weakness"
                        style={{
                          backgroundColor: filterweaknessess.includes(tw)
                            ? '#30a7d7'
                            : '#f2f2f2',
                        }}
                        data-value="bug"
                        onClick={() => handleSelect(tw, 'W')}
                        className="filter weakness-filter type-weakness-filter-btn toggle weakness"
                      >
                        W
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <button onClick={handleReset} id="msearchbtn">
                Reset
              </button>
              <button onClick={handleSearch} id="msearchbtn">
                Search
              </button>
            </div>
          </>
        </AccordionItemPanel>
      </AccordionItem>
    </Accordion>
  );
}
