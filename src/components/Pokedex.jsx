import React, { Component } from 'react';
import Pokecard from './pokecard';
import SearchBox from './searchbox';
import AdvancedSearch from './advancedsearch';
import NavButton from './floatingnavbtn';
import config from '../config.js';
import { orderBy } from 'lodash';
import { getPaginatedItems } from '../utility/pagination';
import Loader from './loader';

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
      pageSize: 12,
      currentPage: 1,
      loading: true,
      listView: false,
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

  handleSortByName = (sortType) => {
    let filteredPoks = orderBy([...this.state.pokemons], 'name', sortType);
    this.setState({
      filteredPoks,
    });
  };

  setCurrentPage = (currentPage) => {
    this.setState({ currentPage });
  };

  setPageSize = (pageSize) => {
    this.setState({ pageSize, currentPage: 1 });
  };

  componentDidMount() {
    return fetch(config.dataUrl)
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
        return this.setState({
          pokemons: json.pokemon,
          filteredPoks: json.pokemon,
          typeWeaknessList,
          loading: false,
        });
      });
  }

  render() {
    let advSearchProps = {
      typeWeaknessList: this.state.typeWeaknessList,
      filterWeaknessess: this.props.filterWeaknessess,
      filtertypes: this.props.filtertypes,
      handleMSearch: this.handleMSearch,
      handleSortByName: this.handleSortByName,
    };

    const { filteredPoks, currentPage, pageSize } = this.state;

    let paginationRecord = getPaginatedItems(
      filteredPoks,
      currentPage,
      pageSize
    );

    return (
      <div className="pokedex">
        <div className="pokedex-title">
          Pokédex
          <span data-testid="pok-animation" className="pok-icon-pokedex"></span>
        </div>

        <div className="pokdex-searchbox-backbtn-container">
          <SearchBox
            nameOrNum={this.state.nameOrNum}
            handleMSearch={this.handleMSearch}
          />
          <NavButton />
        </div>

        <AdvancedSearch {...advSearchProps} />
        <div className="poklist-mode">
          List View:
          <input
            type="checkbox"
            className="poklist-mode-checkbox"
            checked={this.state.listView}
            onChange={(e) => this.setState({ listView: e.target.checked })}
          />
        </div>
        <div data-testid="pokListContainer" className="poke-list-container">
          <ul>
            {this.state.loading ? (
              <div className="loader">
                <Loader />
              </div>
            ) : (
              paginationRecord.data.map((pok, i) => {
                return (
                  <Pokecard
                    key={`pokdetails-${i}`}
                    {...{ ...pok, listView: this.state.listView }}
                  />
                );
              })
            )}
          </ul>

          <div className="page-size">
            Page Size:{' '}
            <input
              type="text"
              className="pagesize-input"
              value={pageSize}
              onChange={(e) => this.setPageSize(e.target.value)}
            />
          </div>
          <div className="pagination">
            {[...Array(paginationRecord.total_pages).keys()].map((d) => {
              return (
                <a
                  key={`page-no-${d + 1}`}
                  className={
                    currentPage == d + 1
                      ? 'page-no pagination-active-page-no'
                      : 'page-no'
                  }
                  onClick={() => this.setCurrentPage(d + 1)}
                >
                  {d + 1}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
