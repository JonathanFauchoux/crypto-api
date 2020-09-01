import React from "react";
import "../App.css";



export default function CryptoTable(props) {
  let data = props.data
  return (
    <div>
      <table className="table">
        <thead>
          <tr key={data.id}>
            <th>Nom</th>
            <th>Logo</th>
            <th>Now</th>
            <th>High/24</th>
            <th>Low/24</th>
          </tr>
        </thead>
        <tbody>
          
          {data.map((data, i) => (
            <tr key={data.id}>
              <td><h3>{data.id}</h3></td>
              <td><img className="logo" src={data.image} alt="logo" /></td>
              <td className="price">
                <p>{data.current_price} €</p>
              </td>
              <td className="price">
              <p>{data.high_24h} €</p>
              </td>
              <td className="price">
              <p>{data.low_24h} €</p>
              </td>
            </tr>   
          ))}
          
        </tbody>
      </table>
      
    </div>
  );
}