import "./style.scss";

import React from "react";
import ReactDOM from "react-dom";

import useStories from "./use-stories";

function App() {
  const stories = useStories();

  if (stories.length === 0) {
    return <div>No stories found</div>;
  } else {
    return (
      <React.Fragment>
        {stories.map(([key, Story]) => (
          <Story key={key} />
        ))}
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
