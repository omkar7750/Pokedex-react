import React, { useState } from 'react';

export default function SearchBox(props) {
  const [name, setName] = useState(props.nameOrNum);

  let handleSearch = () => {
    props.handleMSearch(name, '', '', 'MainSearch');
  };

  return (
    <div>
      <label id="mfilterLabel">Name or Number</label>
      <input
        type="text"
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
        id="mfilter"
        name="mainfilter"
      />
      <button onClick={handleSearch} id="msearchbtn">
        Search
      </button>
    </div>
  );
}
