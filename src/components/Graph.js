import React from "react";
import "../App.css";
export default function Graph ({data}) {
  
  

    //const datas = this.props.currencies.datas;
    //console.log(datas);
    const colwidthpc = 100 / data.length;
  const max = Math.max(...data.map((d) => d.current_price));

  return (
    <svg width="500" height="300"className="graph">
      {data.map((d, i) => {
        const color = `hsla(${Math.random() * 360}, 100%, 50%, 1)`;
        return (
          <g key={d.id}>
            <rect
              x={i * colwidthpc + "%"}
              y={90 - (100 / max) * d.current_price + "%"}
              width={colwidthpc + "%"}
              height={(100 / max) * d.current_price + "%"}
              style={{ fill: color }}
            >
              <text x={0} y="0" fill={"white"}>
                {d.name}
              </text>
            </rect>
            <text className="text" x={i * colwidthpc + "%"} y="97%" fill={color}>
              {d.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
  }
