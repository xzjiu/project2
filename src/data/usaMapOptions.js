import state_data from "./state_data";

const mapOptions = () => {
  return {
    title: { text: "Gender pay gap over USA", left: "right" },
    tooltip: {
      trigger: "item",
      showDelay: 0,
      transitionDuration: 0.2,
      formatter: "{b} - ${c}",
    },
    visualMap: {
      left: "right",
      min: 5000,
      max: 25000,
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
        map: "USA",
        emphasis: {
          label: {
            show: true,
          },
        },
        data: state_data.map((dat) => {
          console.log(dat.State, dat["Wage Gap"]);
          return {
            name: dat.State,
            value: dat["Wage Gap"],
          };
        }),
      },
    ],
  };
};

export default mapOptions;
