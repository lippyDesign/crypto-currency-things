// App is the top level component.
// Responsible for all logic.
import React, { Component } from 'react';
import axios from 'axios';

import Header from './Header';
import CurrencyList from './CurrencyList';
import Graph from './Graph';

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
  renderPriceGraph() {
    const filtered = this.state.currency.filter(({ market_cap_usd, available_supply }) => Number(market_cap_usd > 0) && Number(available_supply > 0));
    const price = filtered.map(({ price_usd, symbol }) => ({ price_usd, symbol }));
    const sortedPrice = price.sort((a,b) => b.price_usd - a.price_usd);
    const labels = sortedPrice.slice(0, 10).map(({ symbol }) => symbol);
    const values = sortedPrice.slice(0, 10).map(({ price_usd }) => price_usd);
    return <Graph labels={labels} values={values} color='rgba(255,102,0,0.5)' title='Price $ (top 10)' />;
  }
  renderMarketCapGraph() {
    const filtered = this.state.currency.filter(({ market_cap_usd, available_supply }) => Number(market_cap_usd > 0) && Number(available_supply > 0));
    const labels = filtered.slice(0, 10).map(({ symbol }) => symbol);
    const values = this.state.currency.slice(0, 10).map(({ market_cap_usd }) => market_cap_usd / 1000000000);
    return <Graph labels={labels} values={values} color='rgba(0,48,143,0.5)' title='Market Cap (top 10) in bill $' />;
  }
  renderAvailableSupply() {
    const filtered = this.state.currency.filter(({ market_cap_usd, available_supply }) => Number(market_cap_usd > 0) && Number(available_supply > 0));
    const supply = filtered.map(({ available_supply, symbol }) => ({ available_supply, symbol }));
    const sortedSupply = supply.sort((a,b) => b.available_supply - a.available_supply);
    const labels = sortedSupply.slice(0, 10).map(({ symbol }) => symbol);
    const values = sortedSupply.slice(0, 10).map(({ available_supply }) => available_supply / 1000000000);
    return <Graph labels={labels} values={values} color='rgba(115,0,171,0.5)' title='Available Supply (top 10) in bill $' />;
  }
  renderOneHourGainGraph() {
    const oneHour = this.state.currency.map(({ percent_change_1h, symbol }) => ({ percent_change_1h, symbol }));
    const sortedOneHour = oneHour.sort((a,b) => b.percent_change_1h - a.percent_change_1h);
    const labels = sortedOneHour.slice(0, 10).map(({ symbol }) => symbol);
    const values = sortedOneHour.slice(0, 10).map(({ percent_change_1h }) => percent_change_1h);
    return <Graph labels={labels} values={values} color='rgba(33,136,17,0.5)' title='Biggest Gain Last Hour (top 10) %' />;
  }
  renderOneDayGainGraph() {
    const oneDay = this.state.currency.map(({ percent_change_24h, symbol }) => ({ percent_change_24h, symbol }));
    const sortedOneDay = oneDay.sort((a,b) => b.percent_change_24h - a.percent_change_24h);
    const labels = sortedOneDay.slice(0, 10).map(({ symbol }) => symbol);
    const values = sortedOneDay.slice(0, 10).map(({ percent_change_24h }) => percent_change_24h);
    return <Graph labels={labels} values={values} color='rgba(33,136,17,0.5)' title='Biggest Gain Last Day (top 10) %' />;
  }
  renderOneWeekGainGraph() {
    const oneWeek = this.state.currency.map(({ percent_change_7d, symbol }) => ({ percent_change_7d, symbol }));
    const sortedOneWeek = oneWeek.sort((a,b) => b.percent_change_7d - a.percent_change_7d);
    const labels = sortedOneWeek.slice(0, 10).map(({ symbol }) => symbol);
    const values = sortedOneWeek.slice(0, 10).map(({ percent_change_7d }) => percent_change_7d);
    return <Graph labels={labels} values={values} color='rgba(33,136,17,0.5)' title='Biggest Gain Last Week (top 10) %' />;
  }
  renderOneHourLossGraph() {
    const oneHour = this.state.currency.map(({ percent_change_1h, symbol }) => ({ percent_change_1h, symbol }));
    const sortedOneHour = oneHour.sort((a,b) => Number(a.percent_change_1h) - Number(b.percent_change_1h));
    const labels = sortedOneHour.slice(0, 10).map(({ symbol }) => symbol);
    const values = sortedOneHour.slice(0, 10).map(({ percent_change_1h }) => Math.abs(Number(percent_change_1h)));
    return <Graph labels={labels} values={values} color='rgba(255,71,74,0.5)' title='Biggest Loss Last Hour (top 10) %' />;
  }
  renderOneDayLossGraph() {
    const oneDay = this.state.currency.map(({ percent_change_24h, symbol }) => ({ percent_change_24h, symbol }));
    const sortedOneDay = oneDay.sort((a,b) => Number(a.percent_change_24h) - Number(b.percent_change_24h));
    const labels = sortedOneDay.slice(0, 10).map(({ symbol }) => symbol);
    const values = sortedOneDay.slice(0, 10).map(({ percent_change_24h }) => Math.abs(Number(percent_change_24h)));
    return <Graph labels={labels} values={values} color='rgba(255,71,74,0.5)' title='Biggest Loss Last Day (top 10) %' />;
  }
  renderOneWeekLossGraph(){
    const oneWeek = this.state.currency.map(({ percent_change_7d, symbol }) => ({ percent_change_7d, symbol }));
    const sortedOneWeek = oneWeek.sort((a,b) => Number(a.percent_change_7d) - Number(b.percent_change_7d));
    const labels = sortedOneWeek.slice(0, 10).map(({ symbol }) => symbol);
    const values = sortedOneWeek.slice(0, 10).map(({ percent_change_7d }) => Math.abs(Number(percent_change_7d)));
    return <Graph labels={labels} values={values} color='rgba(255,71,74,0.5)' title='Biggest Loss Last Week (top 10) %' />;
  }
  render() {
    if (!this.state.currency.length) return <div className='loading'>Loading...</div>;
    return <main>
      <Header total={this.state.currency.length} />
      <section className="graphSection">
        {this.renderPriceGraph()}
        {this.renderMarketCapGraph()}
        {this.renderAvailableSupply()}
        {this.renderOneHourGainGraph()}
        {this.renderOneDayGainGraph()}
        {this.renderOneWeekGainGraph()}
        {this.renderOneHourLossGraph()}
        {this.renderOneDayLossGraph()}
        {this.renderOneWeekLossGraph()}
      </section>
      <CurrencyList currency={this.state.currency} />
    </main>;
  }
}