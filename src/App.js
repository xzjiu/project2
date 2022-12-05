import React from "react";
import { useState } from "react";
import MultilineChart from "./views/MultilineChart";
import portfolio from "./portfolio.json";
import schc from "./SCHC.json";
import vcit from "./VCIT.json";
import { Container, Row, Col } from "react-bootstrap";
import "./App.css";
import USAMap from "react-usa-map";
import worldMap from './data/world.json';
import * as echarts from 'echarts';
import ReactEcharts from "echarts-for-react";

import {
  LineChart,
  Line,
  BarChart,
  Brush,
  Bar,
  ReferenceLine,
  CartesianGrid,
  Legend,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import data2 from "./data/google-news";

import employment from "./data/employment"

import average_earning_data from "./data/average_earning";


/* optional customization of filling per state and calling custom callbacks per state */
const statesCustomConfig = () => {
  return {
    NJ: {
      fill: "navy",
      clickHandler: event =>
        console.log("Custom handler for NJ", event.target.dataset)
    },
    NY: {
      fill: "#CC0000"
    },
    CA: {
      fill: "black"
    }
  };
};


const portfolioData = {
  name: "Portfolio",
  color: "#f96e4f",
  items: portfolio.map((d) => ({ ...d, date: new Date(d.date) })),
};
const schcData = {
  name: "SCHC",
  color: "#d53e4f",
  items: schc.map((d) => ({ ...d, date: new Date(d.date) })),
};
const vcitData = {
  name: "VCIT",
  color: "#5e4fa2",
  items: vcit.map((d) => ({ ...d, date: new Date(d.date) })),
};

const dimensions = {
  width: 600,
  height: 300,
  margin: {
    top: 30,
    right: 30,
    bottom: 30,
    left: 60,
  },
};

/*
memoize keys as a TF tuples with their values as sum
keep track of max tuple and val
iterate through list
 if sum is greater than max, update max tuple and val
 add this tuple into dp dict

*/



function App() {
  const mapOptions = () => { return {
    title: {text: 'Gender pay gap over world'},
    tooltip: {
      trigger: 'item',
        showDelay: 0,
        transitionDuration: 0.2
    },
    visualMap: {
      left: 'right',
        min: 3,
        max: 35,
        inRange: {
        color: [
          '#313695',
          '#4575b4',
          '#74add1',
          '#abd9e9',
          '#e0f3f8',
          '#ffffbf',
          '#fee090',
          '#fdae61',
          '#f46d43',
          '#d73027',
          '#a50026'
        ]
      },
      text: ['High', 'Low'],
        calculable: true
    },
    toolbox: {
      show: true,
        orient: 'vertical',
        left: 'left',
        top: 'top',
        feature: {
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {}
      }
    },
    series: [
      {
        name: 'Gender pay gap over world',
        type: 'map',
        roam: true,
        map: 'WORLD',
        emphasis: {
          label: {
            show: true
          }
        },
        data: [
          { name:'Argentina', value:	6.250},
          { name:'Australia', value:	15.312},
          { name:'Austria', value:	12.382},
          { name:'Belgium', value:	3.798},
          { name:'Brazil', value:	9.091},
          { name:'Bulgaria', value:	2.555},
          { name:'Canada', value:	16.667},
          { name:'Chile', value:	8.596},
          { name:'Colombia', value:	4.000},
          { name:'Costa Rica', value:	4.725},
          { name:'Croatia'	, value:7.575},
          { name:'Cyprus'	, value:16.582},
          { name:'Czech Republic'	, value:11.519},
          { name:'Denmark', value:	4.994},
          { name:'Estonia', value:	19.602},
          { name:'Finland', value:	15.979},
          { name:'France', value:	11.824},
          { name:'Germany', value:	14.203},
          { name:'Greece', value:	5.909},
          { name:'Hungary', value:	12.350},
          { name:'Iceland', value:	12.901},
          { name:'Ireland', value:	8.284},
          { name:'Israel'	, value:24.319},
          { name:'Italy'	, value:7.640},
          { name:'Japan', value:	22.114},
          { name:'South Korea', value:	31.065},
          { name:'Latvia'	, value:19.759},
          { name:'Lithuania', value:	9.328},
          { name:'Malta', value:	11.094},
          { name:'Mexico', value:	12.500},
          { name:'Netherlands', value:	13.329},
          { name:'New Zealand', value:	6.667},
          { name:'Norway', value:	4.601},
          { name:'Poland', value:	8.691},
          { name:'Portugal', value:	11.717},
          { name:'Romania', value:	3.304},
          { name:'Slovak Republic', value:	11.700},
          { name:'Slovenia', value:	8.195},
          { name:'Spain', value:	8.094},
          { name:'Sweden', value:	7.418},
          { name:'Switzerland', value:	13.803},
          { name:'Türkiye', value:	9.981},
          { name:'United Kingdom', value:	14.349},
          { name:'United States of America', value:	16.864},
        ]
      }
    ]
  }}



  echarts.registerMap('WORLD', worldMap)

  const [selectedItems, setSelectedItems] = useState([]);
  const legendData = [portfolioData, schcData, vcitData];
  const chartData = [
    portfolioData,
    ...[schcData, vcitData].filter((d) => selectedItems.includes(d.name)),
  ];
  const onChangeSelection = (name) => {
    const newSelectedItems = selectedItems.includes(name)
      ? selectedItems.filter((item) => item !== name)
      : [...selectedItems, name];
    setSelectedItems(newSelectedItems);
  };
  return (
    <Container fluid>
      <header
        className="masthead"
        style={{
          zIndex: "1",
          backgroundImage:
            "url('https://images.pexels.com/photos/1631677/pexels-photo-1631677.jpeg')",
        }}
      >
        <div className="container-fluid position-relative px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-11 col-lg-9 col-xl-8">
              <div className="post-heading" style={{ zIndex: "2" }}>
                <h1>Gender Pay Gap</h1>
                <h2 className="subheading">HCI P2 -- Inequality in Social Justice</h2>
                <span className="meta">
                  Posted by
                  <a href="#!">
                    {" "}
                    Xinrui Zou, Rishi Jain, Matt Liu, Taylor Young
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <article className="mb-4">
        <div className="container-fluid px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-11 col-lg-9 col-xl-8">
              <h2 className="section-heading">Background</h2>
              <ReactEcharts option={mapOptions()}/>
              <p>
                place holder text: Inspired by the cohesive developer experience
                provided by Ember.js and Elm, the folks at Facebook wanted to
                provide an easy, opinionated way forward. They created a new way
                to develop React apps, create-react-app. In the three weeks
                since initial public release, it has received tremendous
                community awareness (over 8,000 GitHub stargazers) and support
                (dozens of pull requests).{" "}
              </p>
              <h2 className="section-heading">Result</h2>
              <p> place holder</p>
              <blockquote className="blockquote">
                The dreams of yesterday are the hopes of today and the reality
                of tomorrow. Science has not yet mastered prophecy. We predict
                too much for the next year and yet far too little for the next
                ten.
              </blockquote>

              <ResponsiveContainer width='100%' height={500}>
                <LineChart 
                width={900} 
                height={250} 
                data={average_earning_data}
                margin={{
                  top: 20,
                  right: 10,
                  left: 30,
                  bottom: 5,
                }}
                >
              <CartesianGrid strokeDasharray="8 8" />
              <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <ReferenceLine x="> Bachelor's" stroke="red" label="Max Gap" />
              <ReferenceLine y={9928} label="Max" stroke="red" />
              <Line type="monotone" dataKey="man" stroke="#8884d8" />
              <Line type="monotone" dataKey="woman" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
              <p>
                Spaceflights cannot be stopped. This is not the work of any one
                man or even a group of men. It is a historical process which
                mankind is carrying out in accordance with the natural laws of
                human development.
              </p>

              <ResponsiveContainer width='100%' height={500}>
        <BarChart
          width={900}
          height={300}
          data={employment}
          margin={{
            top: 20,
            right: 10,
            left: 30,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
          <ReferenceLine y={0} stroke="#000" />
          <Brush dataKey="name" height={30} stroke="#8884d8" />
          <Bar dataKey="man" fill="#8884d8" />
          <Bar dataKey="woman" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
              
              {/* <USAMap
                customize={statesCustomConfig()}
                onClick={mapHandler}
                width="100%"
        /> */}
            </div>
          </div>
        </div>
      </article>
    </Container>
  );
}

export default App;
