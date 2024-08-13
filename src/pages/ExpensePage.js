import React, { useState } from "react";

function ExpensePage() {
  const [isVisible, setIsVisible] = useState(true);
  const [data, setData] = useState(false);

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
    </div>
  );
}

export default ExpensePage;
