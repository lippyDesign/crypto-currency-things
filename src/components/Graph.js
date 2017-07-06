// Graph
import React, { Component } from 'react';
import { Bar } from 'react-chartjs';

const chartOptions = {};

export default class extends Component{
  getData() {
    return {
      labels: this.props.labels,
      datasets: [{
        label: "My First dataset",
        fillColor: this.props.color || "rgba(0,48,143,0.5)",
        strokeColor: "rgba(220,220,220,0.8)",
        highlightFill: "rgba(220,220,220,0.75)",
        highlightStroke: "rgba(220,220,220,1)",
        data: this.props.values
      }]
    };
  }
  render() {
    console.log(this.props.data)
    return <div className='graphWrapper'>
      <h3>{this.props.title}</h3>
      <div>
        <Bar data={this.getData()} options={chartOptions}/>
      </div>
    </div>
  }
}