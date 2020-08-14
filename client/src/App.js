import React, { useEffect, useState } from "react";
import BottomScrollListener from "react-bottom-scroll-listener";

import Row from "./Row/Row";
import "./App.css";

// const DATA_SIZE_HALF = "half"
const DATA_SIZE_FULL = "full";
const INTERVAL_TIME = 2000;

// determine how many more paragraphs we want to fetch on scroll to botton
const INFINITE_SCROLL_INCREMENTER = 5;

/** Application entry point */
function App() {
  const [data, setData] = useState([]);
  const [ids, setIds] = useState([]);

  const [value, setValue] = useState(0);
  const [searchInput, setSearchInput] = useState("");

  // we can use lower and upper limits to implement infinite scrolling - 2 items at a time
  const [lower, setLower] = useState(0);
  const [upper, setUpper] = useState(5);

  /** DO NOT CHANGE THE FUNCTION BELOW */
  useEffect(() => {
    setInterval(() => {
      // Find random bucket of words to highlight
      setValue(Math.floor(Math.random() * 10));
    }, INTERVAL_TIME);
  }, []);
  /** DO NOT CHANGE THE FUNCTION ABOVE */

  useEffect(() => {
    const fetchIds = async () => {
      let response = await fetch("/api/dataIdList?datasize=" + DATA_SIZE_FULL);
      // this will return a list of ids
      let list = await response.json();
      setIds(list);
    };

    fetchIds();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (ids.length) {
        // get range of id's from lower to upper limit
        let currentItems = [...ids].slice(lower, upper);

        // fetch each line based on id
        let dataItems = await Promise.all(
          currentItems.map(async (id) => {
            return (await fetch("/api/dataItem/" + id)).json();
          })
        );

        // need to use concat or else screen will be stuck at scroll bottom and endlessly render
        setData((data) => data.concat(dataItems));
      }
    };

    fetchData();
  }, [ids, lower]);

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };
  // callback to be used when scroll bottom is hit
  const onBottom = () => {
    let temp = upper;
    setUpper((upper) => (upper += INFINITE_SCROLL_INCREMENTER));
    setLower(temp);
  };

  return (
    <div className="App">
      <h2 className="heading">JusticeText Online Book</h2>
      <div className="searchbar">
        <input
          className="input"
          type="text"
          placeholder="Search text"
          value={searchInput}
          onChange={handleChange}
        />
      </div>
      {data.map((row, i) => {
        return (
          <Row
            key={`p${i}`}
            row={row}
            value={value}
            searchInput={searchInput}
          />
        );
      })}
      <BottomScrollListener onBottom={onBottom} />
    </div>
  );
}

export default App;
