import React from "react";
import TrackVisibility from "react-on-screen";

import TextItem from "../TextItem/TextItem";

const TextRow = ({ isVisible, row, value, searchInput }) => {
  if (isVisible) {
    return (
      <p className="row">
        {row.map((textitem, j) => {
          if (
            searchInput.length > 0 &&
            textitem.text.search(searchInput) === -1
          ) {
            return null;
          } else {
            return <TextItem key={j} value={value} data={textitem} />;
          }
        })}
      </p>
    );
  }
  return null;
};

// track whether or not the component is visible
export default function Row({ row, value, searchInput }) {
  return (
    <TrackVisibility once>
      <TextRow row={row} value={value} searchInput={searchInput} />
    </TrackVisibility>
  );
}
