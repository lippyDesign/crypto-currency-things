// List of all currencies
import React, { Component } from 'react';

import CurrencyCard from './CurrencyCard';

export default class extends Component {
  render() {
    return <section className='currencyList'>
      {this.props.currency.map(coin => <CurrencyCard key={coin.id} coin={coin} />)}
    </section>;
  }
}