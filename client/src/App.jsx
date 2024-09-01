import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import "./App.css";

export const data = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7],
];

export const options = {
  pieHole: 0.4,
  backgroundColor: '#222b32',
  
  legend: {
    color: '#fff',
  }
  // is3D: true
};

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch('https://traffic-chart-back.push-ebx.ru/traffic');
      const _data = await res.json();
      setData([["Task", "Hours per Day"], ..._data]);
    })();
  }, []);

  return (
    <>
      {
        <Chart
          className="chart"
          chartType="PieChart"
          data={data}
          width={"100%"}
          height={"400px"}
          options={options}
          loader={<span class="loader" />}
        /> 
      }
    </>
  );
}
