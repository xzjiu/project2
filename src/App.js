import React from "react";
import { useState } from "react";
import BarChartd from "./BartChart";
import MultilineChart from "./views/MultilineChart";
import Legend from "./views/Legend";
import portfolio from "./portfolio.json";
import schc from "./SCHC.json";
import vcit from "./VCIT.json";
import { Container, Row, Col } from "react-bootstrap";
import "./App.css";
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

const data = [
  { year: 1980, efficiency: 24.3, sales: 8949000 },
  { year: 1985, efficiency: 27.6, sales: 10979000 },
  { year: 1990, efficiency: 28, sales: 9303000 },
  { year: 1991, efficiency: 28.4, sales: 8185000 },
  { year: 1992, efficiency: 27.9, sales: 8213000 },
  { year: 1993, efficiency: 28.4, sales: 8518000 },
  { year: 1994, efficiency: 28.3, sales: 8991000 },
  { year: 1995, efficiency: 28.6, sales: 8620000 },
  { year: 1996, efficiency: 28.5, sales: 8479000 },
  { year: 1997, efficiency: 28.7, sales: 8217000 },
  { year: 1998, efficiency: 28.8, sales: 8085000 },
  { year: 1999, efficiency: 28.3, sales: 8638000 },
  { year: 2000, efficiency: 28.5, sales: 8778000 },
  { year: 2001, efficiency: 28.8, sales: 8352000 },
  { year: 2002, efficiency: 29, sales: 8042000 },
  { year: 2003, efficiency: 29.5, sales: 7556000 },
  { year: 2004, efficiency: 29.5, sales: 7483000 },
  { year: 2005, efficiency: 30.3, sales: 7660000 },
  { year: 2006, efficiency: 30.1, sales: 7762000 },
  { year: 2007, efficiency: 31.2, sales: 7562000 },
  { year: 2008, efficiency: 31.5, sales: 6769000 },
  { year: 2009, efficiency: 32.9, sales: 5402000 },
  { year: 2010, efficiency: 33.9, sales: 5636000 },
  { year: 2011, efficiency: 33.1, sales: 6093000 },
  { year: 2012, efficiency: 35.3, sales: 7245000 },
  { year: 2013, efficiency: 36.4, sales: 7586000 },
  { year: 2014, efficiency: 36.5, sales: 7708000 },
  { year: 2015, efficiency: 37.2, sales: 7517000 },
  { year: 2016, efficiency: 37.7, sales: 6873000 },
  { year: 2017, efficiency: 39.4, sales: 6081000 },
];
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
              <BarChartd data={data} />
              <p> place holder</p>
              <blockquote className="blockquote">
                The dreams of yesterday are the hopes of today and the reality
                of tomorrow. Science has not yet mastered prophecy. We predict
                too much for the next year and yet far too little for the next
                ten.
              </blockquote>
              <p>
                Spaceflights cannot be stopped. This is not the work of any one
                man or even a group of men. It is a historical process which
                mankind is carrying out in accordance with the natural laws of
                human development.
              </p>
            </div>
          </div>
        </div>
      </article>
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

      <Row>
        <Col md={2}></Col>
        <Col md={8}>
          <Legend
            data={legendData}
            selectedItems={selectedItems}
            onChange={onChangeSelection}
          />
          <MultilineChart data={chartData} dimensions={dimensions} />
        </Col>
        <Col md={2}></Col>
      </Row>
    </Container>
  );
}

export default App;
