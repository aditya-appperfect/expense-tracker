import React, { useState } from "react";
import useSWR from "swr";

const fetcher = async (args) => {
  const [url, met] = args;
  const response = await fetch(url, { method: met });
  const data = await response.json();
  return data;
};

function Practice() {
  const [isVisible, setIsVisible] = useState(true);

  const { data, error } = useSWR(
    ["https://restcountries.com/v3.1/all", "GET"],
    fetcher
  );

  const handleClick = () => {
    setIsVisible(false);
  };

  return (
    <div>
      {isVisible && <div>ExpensePage</div>}
      <button onClick={handleClick}>remove message</button>
      <button disabled>Disabled Button</button>
      <h1>List of countries</h1>
      {!data && !error ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <ul>
          {data?.map((c) => (
            <li key={c.name.common}>{c.name.common}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Practice;
