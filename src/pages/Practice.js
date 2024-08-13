import React, { useCallback, useEffect, useState } from "react";

function Practice() {
  const [isVisible, setIsVisible] = useState(true);
  const [data, setData] = useState(false);
  const [country, setCountry] = useState([]);

  const fetchCountries = useCallback(async () => {
    const res = await fetch("https://restcountries.com/v3.1/all", {
      method: "GET",
    });
    const data = await res.json();
    setCountry(data);
  }, []);
  fetchCountries();

  setTimeout(() => {
    setData(true);
  }, [1000]);

  const handleClick = () => {
    setIsVisible(false);
  };

  return (
    <div>
      {isVisible && <div>ExpensePage</div>}
      <button onClick={handleClick}>remove message</button>
      <button disabled>Disabled Button</button>
      {data && <div>Data Found</div>}
      <h1>List of countries</h1>
      <ul>
        {country?.map((c) => {
            return <li key={c.name.common}>{c.name.common}</li>;
          })}
      </ul>
    </div>
  );
}

export default Practice;
