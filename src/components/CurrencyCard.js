// CurrencyCard is a component that displays a single currency in the list of currencies.
import React, { Component } from 'react';

export default class extends Component {
  placeCommas(x) {
    if (x) {
      x = x.toString()
      const arr = x.split('.')
      arr[0] = arr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      if (arr[1]) {
        if (arr[1].length === 1) {
          arr[1] = arr[1] + '0';
        }
      }
      return arr.join('.');
    } else {
      return x;
    }
  }
  render() {
    const { name, symbol, rank, price_usd, market_cap_usd, available_supply, total_supply, percent_change_1h, percent_change_24h, percent_change_7d, last_updated} = this.props.coin;
    let hStyle;
    let dStyle;
    let wStyle;
    if (percent_change_1h) {
      hStyle = percent_change_1h[0] === '-' ? 'red' : 'green'
    }
    if (percent_change_24h) {
      dStyle = percent_change_24h[0] === '-' ? 'red' : 'green'
    }
    if (percent_change_7d) {
      wStyle = percent_change_7d[0] === '-' ? 'red' : 'green'
    }
    return <div className='currencyCard'>
      <h3 className='cardHeading'><span className='rank'>{rank}.</span> {name}: {symbol}</h3>
      <h2 className='price'>${this.placeCommas(price_usd)}</h2>
      <div className="lastUpdates">
        <h4>1h: <span className={hStyle}>{percent_change_1h}%</span></h4>
        <h4>24h: <span className={dStyle}>{percent_change_24h}%</span></h4>
        <h4>7d: <span className={wStyle}>{percent_change_7d}%</span></h4>
      </div>
      <div className="decription">
        <h4 className="decriptionHeader">Market Cap: ${this.placeCommas(market_cap_usd)}</h4>
        <h4 className="decriptionHeader">Available Supply: ${this.placeCommas(available_supply)}</h4>
      </div>
    </div>;
  }
}