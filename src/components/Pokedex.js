import React, { Component } from 'react';
import Pokecard from './pokecard';
import SearchBox from './searchbox';
import AdvancedSearch from './advancedsearch';

import config from '../config.js';

export default class Pokedex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemons: [],
      filteredPoks: [],
      nameOrNum: '',
      filterWeaknessess: [],
      filtertypes: [],
      typeWeaknessList: [],
    };
  }

  handleMSearch = (nameOrNum, type = '', weaknesses = '', callFrom = '') => {
    if (callFrom == 'MainSearch') {
      type = this.state.filtertypes;
      weaknesses = this.state.filterWeaknessess;
    } else {
      nameOrNum = this.state.nameOrNum;
    }

    if (
      !nameOrNum &&
      (!type || !type.length) &&
      (!weaknesses || !weaknesses.length)
    ) {
      this.setState({ filteredPoks: this.state.pokemons, nameOrNum });
      return;
    }

    let filteredPoks = this.state.pokemons;
    if (nameOrNum) {
      filteredPoks = this.state.pokemons.filter((pok) => {
        var reg = new RegExp(nameOrNum.toLowerCase(), 'g');
        return (
          pok.num.toString().toLowerCase().match(reg) ||
          pok.name.toLowerCase().match(reg)
        );
      });
    }
    if (type && type.length) {
      filteredPoks = filteredPoks.filter((pok) => {
        return type.filter((t) => pok.type.includes(t)).length == type.length;
      });
    }
    if (weaknesses && weaknesses.length) {
      filteredPoks = filteredPoks.filter((pok) => {
        return (
          weaknesses.filter((w) => pok.weaknesses.includes(w)).length ==
          weaknesses.length
        );
      });
    }

    this.setState({
      filteredPoks,
      nameOrNum,
      filtertypes: type,
      filterWeaknessess: weaknesses,
    });
  };

  componentDidMount() {
    debugger;
    fetch(config.dataUrl)
      .then((response) => response.json())
      .then((json) => {
        let typeList = [],
          weaknessList = [];
        json.pokemon.map((item) => {
          item.type.map((t) => {
            if (typeList.indexOf(t) == -1) typeList.push(t);
          });
          item.weaknesses.map((w) => {
            if (weaknessList.indexOf(w) == -1) weaknessList.push(w);
          });
        });
        let typeWeaknessList = [...new Set([...typeList, ...weaknessList])];
        this.setState({
          pokemons: json.pokemon,
          filteredPoks: json.pokemon,
          typeWeaknessList,
        });
      });
  }

  render() {
    let advSearchProps = {
      typeWeaknessList: this.state.typeWeaknessList,
      filterWeaknessess: this.props.filterWeaknessess,
      filtertypes: this.props.filtertypes,
      handleMSearch: this.handleMSearch,
    };

    return (
      <div class="pokedex">
        <h1>Pokedex</h1>
        <SearchBox
          nameOrNum={this.state.nameOrNum}
          handleMSearch={this.handleMSearch}
        />
        <AdvancedSearch {...advSearchProps} />
        <ul>
          {this.state.filteredPoks.map((pok, i) => {
            return <Pokecard {...pok} />;
          })}
        </ul>
      </div>
    );
  }
}
