// App is the top level component.
// Responsible for all logic.
import React, { Component } from 'react';
import axios from 'axios';

import CurrencyList from './CurrencyList';
import TopFiveGraph from './TopFiveGraph';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { currency: [] }
  }
  componentDidMount() {
    this.fetchCurrency();
  }
  fetchCurrency() {
    return axios.get('https://api.coinmarketcap.com/v1/ticker/')
      .then(currency => {
        this.setState({ currency: currency.data });
      })
      .catch(e => console.log(e));
  }
  render() {
    if (!this.state.currency.length) return <div className='loading'>Loading...</div>;
    return <main>
      <TopFiveGraph data={this.state.currency.slice(0, 5)} />
      <CurrencyList currency={this.state.currency} />
    </main>;
  }
}