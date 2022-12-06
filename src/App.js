import React from "react";
import { Container, Image } from "react-bootstrap";
import "./App.css";
import worldMap from "./data/world.json";
import usaMap from "./data/usa.json";
import * as echarts from "echarts";
import ReactEcharts from "echarts-for-react";
import WageGap from "./data/WageGap.png";

import genderIncomeDisparities from "./data/gender_income_disparities";
import employment from "./data/employment";
import average_earning_data from "./data/average_earning";
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
  Label,
} from "recharts";
import usaMapOptions from "./data/usaMapOptions";

/*
memoize keys as a TF tuples with their values as sum
keep track of max tuple and val
iterate through list
 if sum is greater than max, update max tuple and val
 add this tuple into dp dict

*/

function App() {
  echarts.registerMap("WORLD", worldMap);
  echarts.registerMap("USA", usaMap, {
    Alaska: {
      left: -131,
      top: 25,
      width: 15,
    },
    Hawaii: {
      left: -110,
      top: 28,
      width: 5,
    },
    "Puerto Rico": {
      left: -76,
      top: 26,
      width: 2,
    },
  });

  const WorldmapOptions = () => {
    return {
      title: { text: "Gender pay gap over world", left: "right" },
      tooltip: {
        trigger: "item",
        showDelay: 0,
        transitionDuration: 0.2,
      },
      visualMap: {
        left: "right",
        min: 3,
        max: 35,
        inRange: {
          color: [
            "#313695",
            "#4575b4",
            "#74add1",
            "#abd9e9",
            "#e0f3f8",
            "#ffffbf",
            "#fee090",
            "#fdae61",
            "#f46d43",
            "#d73027",
            "#a50026",
          ],
        },
        text: ["High", "Low"],
        calculable: true,
      },
      toolbox: {
        show: true,
        orient: "vertical",
        left: "left",
        top: "top",
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {},
        },
      },
      series: [
        {
          name: "Gender pay gap over the USA",
          type: "map",
          roam: true,
          map: "WORLD",
          emphasis: {
            label: {
              show: true,
            },
          },
          data: [
            { name: "Argentina", value: 6.3 },
            { name: "Australia", value: 15.3 },
            { name: "Austria", value: 12.4 },
            { name: "Belgium", value: 3.8 },
            { name: "Brazil", value: 9.1 },
            { name: "Bulgaria", value: 2.6 },
            { name: "Canada", value: 16.7 },
            { name: "Chile", value: 8.6 },
            { name: "Colombia", value: 4.0 },
            { name: "Costa Rica", value: 4.7 },
            { name: "Croatia", value: 7.6 },
            { name: "Cyprus", value: 16.6 },
            { name: "Czech Republic", value: 11.5 },
            { name: "Denmark", value: 5.0 },
            { name: "Estonia", value: 19.6 },
            { name: "Finland", value: 16.0 },
            { name: "France", value: 11.8 },
            { name: "Germany", value: 14.2 },
            { name: "Greece", value: 5.9 },
            { name: "Hungary", value: 12.4 },
            { name: "Iceland", value: 13.0 },
            { name: "Ireland", value: 8.3 },
            { name: "Israel", value: 24.3 },
            { name: "Italy", value: 7.6 },
            { name: "Japan", value: 22.1 },
            { name: "South Korea", value: 31.1 },
            { name: "Latvia", value: 19.8 },
            { name: "Lithuania", value: 9.3 },
            { name: "Malta", value: 11.1 },
            { name: "Mexico", value: 12.5 },
            { name: "Netherlands", value: 13.3 },
            { name: "New Zealand", value: 6.7 },
            { name: "Norway", value: 4.6 },
            { name: "Poland", value: 8.7 },
            { name: "Portugal", value: 11.72 },
            { name: "Romania", value: 3.3 },
            { name: "Slovak Republic", value: 11.7 },
            { name: "Slovenia", value: 8.2 },
            { name: "Spain", value: 8.1 },
            { name: "Sweden", value: 7.4 },
            { name: "Switzerland", value: 13.8 },
            { name: "Türkiye", value: 10.0 },
            { name: "United Kingdom", value: 14.3 },
            { name: "United States of America", value: 16.9 },
          ],
        },
      ],
    };
  };
  return (
    <>
      <Container fluid>
        <header
          className="masthead shadow-2xl"
          style={{
            zIndex: "1",
            backgroundImage:
              "url('https://visme.co/blog/wp-content/uploads/Gender-Pay-Gap-header.gif')",
          }}
        >
          <div className="container-fluid position-relative px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
              <div className="col-md-11 col-lg-9 col-xl-8">
                <div className="post-heading" style={{ zIndex: "2" }}>
                  <h1>The Truth about</h1>
                  <h1>Gender Pay Gap</h1>
                  <span className="meta">
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
                <h2 className="section-heading mb-4">Introduction</h2>
                <ReactEcharts
                  option={WorldmapOptions()}
                  style={{
                    height: "500px",
                    width: "100%",
                  }}
                />
                <p className="mt-10">
                  The average compensation differential between working women
                  and men is known as the gender pay gap or gender wage gap. The
                  gender pay gap is an ongoing issue in the modern world.
                  Despite the progress made over the past few decades, women
                  still earn significantly less than men across all industries
                  and job positions. According to data from the United States
                  Department of Labor, women earned an average of 83.1¢ for
                  every dollar earned by men in 2021. This discrepancy in pay is
                  even more severe for women of color, with African American
                  women earning only 62¢ and Latina women earning only 54¢ for
                  each dollar earned by men.
                </p>
                <p>
                  {" "}
                  The gender pay gap is a complex issue with a multitude of
                  contributing factors. Research suggests that the key
                  components that sustain the wage gaps are:
                </p>
                <blockquote className="blockquote">
                  <p> 1.Gender discrimination </p>
                  <p> 2.Unequal access to resources </p>
                  <p> 3.Lack of institutional support</p>
                </blockquote>

                <p>
                  In addition, the effects of the gender pay gap go beyond
                  personal complaints; they result in decreased economic
                  productivity, smaller pensions for women, and fewer
                  educational chances. The causes and effects of the gender wage
                  gap will be covered in more detail later on in this article.
                  This essay will explore the causes and effects of the gender
                  pay gap and discuss potential solutions to reduce wage
                  disparities between men and women.
                </p>
                <div>
                  <h2 className="section-heading mb-8">
                    What is the gender pay gap in your state?
                  </h2>
                  <center>
                    <Image src={WageGap} rounded width="80%" />
                  </center>

                  <ReactEcharts
                    option={usaMapOptions()}
                    className="mt-4"
                    style={{
                      height: "500px",
                      width: "100%",
                    }}
                  />
                  <p>
                    This graph shows each state's male to female pay gaps based
                    on median yearly earnings for women and men in 2019 from the
                    American Community Survey. The color of the state determines
                    the range of the wage gap, with the the warmer of colors
                    indicating a wage gap of $15,000 or higher and the colder of
                    colors indicate a wage gap of $15000 or less. In 2019, the
                    median earnings for women around the United States was
                    $43,394 and the median earnings for men was $53,544. As a
                    result, the national wage gap by sex in the US in 2019 was
                    $10,150.
                  </p>
                </div>
                <h2 className="section-heading mb-4">Education Vs Sex</h2>

                <ResponsiveContainer width="100%" height={500}>
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
                    <YAxis tickFormatter={(t) => `$${t}`} />
                    <Tooltip formatter={(value) => `$${value}`} />
                    <Legend />
                    <ReferenceLine
                      x="> Bachelor's"
                      stroke="red"
                      label="Max Gap"
                    />
                    <ReferenceLine y={9928} label="Max" stroke="red" />
                    <Line type="monotone" dataKey="man" stroke="#8884d8" />
                    <Line type="monotone" dataKey="woman" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>

                <p>
                  The graph shows the gender pay gap based on the level of
                  education and sex of the person in 2020. It depicts the wage
                  gap for different levels of education such as High School,
                  College/Associate Degree, Bachelor's Degree, or advanced
                  degrees. It can be seen that women with a Bachelor's degree or
                  advanced degrees have the highest gender average pay gap, with
                  a gap of 47%. The lowest pay gap is for women with age 24 or
                  less i.e. of almost 26%. Women with a high school diploma or
                  less, a high school degree, or a college degree have a gap
                  somewhere between 34% - 37%. This keeps the average of all the
                  education levels at 36%. Overall, the gender pay gap is
                  highest for women with a Bachelor's degree and lowest for
                  women aged 24 or younger.
                </p>

                <h2 className="section-heading mb-4">NAICS Sector vs Sex</h2>

                <ResponsiveContainer width="100%" height={500}>
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
                    <YAxis tickFormatter={(t) => `$${t}`} />
                    <Tooltip formatter={(value) => `$${value}`} />
                    <Legend
                      verticalAlign="top"
                      wrapperStyle={{ lineHeight: "40px" }}
                    />
                    <ReferenceLine y={0} stroke="#000" />
                    <Brush dataKey="name" height={30} stroke="#8884d8" />
                    <Bar dataKey="man" fill="#8884d8" />
                    <Bar dataKey="woman" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>

                <p>
                  The graph depicts the gender pay gap, based on the North
                  American Industry Classification System (NAICS) Working
                  Sector, for both male and female workers. It covers 20
                  different SAICS sectors. Across all NAICS sectors, the gender
                  pay gap is significant, with female workers earning an average
                  of 35% less than their male counterparts. The % pay gap is
                  widest in the Arts, Entertainment, and Recreation sector,
                  where female workers earn 66% less than male workers according
                  to the 2020 US Census Bureau data. It is followed closely by
                  the Finance and Insurance sector where the average pay gap is
                  around 61%. These are really significant differences. The
                  smallest pay gap is in the Public Administration sector, where
                  female workers earn 12% less than male workers. Overall, this
                  data indicates that the gender pay gap is still a major issue
                  in the United States, with female workers consistently earning
                  less than male workers across all NAICS sectors.
                </p>
                <h2 className="section-heading mb-4">
                  Median earnings for women in 2021 were 83.1% of the median for
                  men
                </h2>
                <ResponsiveContainer width="100%" height={500}>
                  <LineChart
                    width={900}
                    height={300}
                    data={genderIncomeDisparities}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      label={{
                        value: "Year",
                        dy: 17.5,
                      }}
                    />
                    <YAxis
                      domain={[65, 100]}
                      label={{
                        value: "Female to Male Income Ratio (%)",
                        angle: -90,
                        dx: -10,
                      }}
                    />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="total" stroke="red" />
                    <Line type="monotone" dataKey="white" stroke="orange" />
                    <Line type="monotone" dataKey="black" stroke="green" />
                    <Line type="monotone" dataKey="asian" stroke="#8884d8" />
                    <Line type="monotone" dataKey="hispanic" stroke="purple" />
                  </LineChart>
                </ResponsiveContainer>
                <p>
                  This graph shows the ratio of women-to-men earnings by race
                  and ethnicity using averages of the years 2000 to 2021 by the
                  Bureau of Labor Statistics. The graph shows that the earnings
                  ratio varied by race and ethnicity, but ultimately, the graph
                  showed that women annually earned less than men, with the
                  median earnings for women being $912, 83.1% of that of men.
                  Specifically, for the earnings ratio, White women earned 82.2%
                  as much as their male counterparts, Black women earned 94.1%,
                  Asian women earned 78.5% and 87.6% for Hispanic women.
                </p>
                <h2 className="section-heading mb-4">Conclusion</h2>
                <p>
                  The previously shown graphs demonstrate how women have
                  historically earned less than men, with their earnings being
                  heavily impacted by their education, the state of residence,
                  and their occupational sector. In addition to these factors,
                  it is important to note that the gender pay gap is largely
                  upheld by discriminatory beliefs and practices that make their
                  way into various workplaces, ultimately affecting and biasing
                  the hiring and pay decisions made within one’s job. Though
                  discrimination and bias can happen as a result of both
                  conscious and unconscious decisions, they nevertheless happen
                  as a result of sexist cultural biases or assumptions about
                  women and their ability to perform certain tasks or handle
                  certain workloads. With this in mind, if we desire a future in
                  which the gender pay gap has significantly decreased, then it
                  is important that employers review their hiring practices and
                  address and remove any processes that may be based on biased
                  and discriminatory assumptions. Furthermore, there should also
                  be a look into the practices within the company regarding
                  their policies on pay transparency, for if an individual is to
                  request or negotiate equitable pay, they must have some
                  benchmark salary or idea of what their counterparts are
                  making. Using these proposed solutions, it may be possible to
                  look toward a future in which the wage disparities between
                  women and men are nonexistent.
                </p>
              </div>
            </div>
          </div>
        </article>
      </Container>

      <footer class="w-100 py-3 flex-shrink-0">
        <hr />
        <div class="container py-3">
          <div class="row gy-3 gx-5">
            <div class="col-lg-2 col-md-2"></div>
            <div class="col-lg-8 col-md-8">
              <h5 class="h1">Data Source</h5>
              <p class="small text-muted">
                {" "}
                <a class="text-primary" href=""></a>
              </p>
              <p class="small text-muted">
                {" "}
                <a
                  class="text-primary"
                  href="https://data.oecd.org/earnwage/gender-wage-gap.htm"
                >
                  {" "}
                  Gender-wage-gap
                </a>
              </p>
              <p class="small text-muted">
                {" "}
                <a
                  class="text-primary"
                  href="https://qwiexplorer.ces.census.gov/static/explore.html?s=127628&v=bar&t=ac0&fc=true&st=US#x%3D0%26g%3D0=&x=0&g=0"
                >
                  Cencus QWI Explorer gender earning
                </a>
              </p>
              <p class="small text-muted">
                {" "}
                <a
                  class="text-primary"
                  href="https://www.census.gov/library/visualizations/interactive/gender-pay-gap.html"
                >
                  Gender Pay Gap
                </a>
              </p>
              <p class="small text-muted">
                {" "}
                <a
                  class="text-primary"
                  href="https://www.bls.gov/opub/ted/2022/median-earnings-for-women-in-2021-were-83-1-percent-of-the-median-for-men.htm"
                >
                  Median earnings for women vs men in 2021
                </a>
              </p>
              <p class="small text-muted">
                {" "}
                <a
                  class="text-primary"
                  href="https://www.statista.com/chart/4279/the-gender-pay-gap-in-developed-nations-visualised/"
                >
                  The Gender Pay Gap In Developed Nations Visualised
                </a>
              </p>
              <p class="small text-muted mb-0">
                &copy; Copyrights. All rights reserved.
              </p>
            </div>
            <div class="col-lg-2 col-md-2"></div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
