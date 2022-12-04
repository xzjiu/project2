import React from "react";
import { useState } from "react";
import MultilineChart from "./views/MultilineChart";
import Legend from "./views/Legend";
import portfolio from "./portfolio.json";
import schc from "./SCHC.json";
import vcit from "./VCIT.json";
import { Container, Row, Col } from "react-bootstrap";
import "./App.css";
import USAMap from "react-usa-map";
import {
  BarChart,
  CartesianGrid,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import data2 from "./data/google-news";

const mapHandler = event => {
  alert(event.target.dataset.name);
};

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
                <h1>HCI Project2</h1>
                <h2 className="subheading">Inequality in Social justice</h2>
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

              <ResponsiveContainer width={700} height={500}>
                <BarChart width={730} height={250} data={data2}>
              <CartesianGrid strokeDasharray="8 8" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
          {/* <Legend
          // data={[
          //   { name: "male", color: "red" },
          //   { name: "female", color: "blue" },
          // ]}
          /> */}
              <Bar dataKey="man" fill="#8884d8" />
              <Bar dataKey="woman" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
              <p>
                Spaceflights cannot be stopped. This is not the work of any one
                man or even a group of men. It is a historical process which
                mankind is carrying out in accordance with the natural laws of
                human development.
              </p>
              <USAMap
                customize={statesCustomConfig()}
                onClick={mapHandler}
                width="100%"
        />
            </div>
          </div>
        </div>
      </article>
      

      <Row>
        <Col md={2}></Col>
        <Col md={8}>
          {/* <Legend
            data={legendData}
            selectedItems={selectedItems}
            onChange={onChangeSelection}
          />
          <MultilineChart data={chartData} dimensions={dimensions} /> */}
        </Col>
        <Col md={2}></Col>
      </Row>
    </Container>
  );
}

export default App;
