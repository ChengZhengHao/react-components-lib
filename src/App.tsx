import * as React from 'react';
import { TimeRotate } from "./components";
import "./App.css";

class App extends React.Component {
  handleTimeLineChange = (e: any) => {
    console.log(e);
  }

  render() {
    return (
      <div className="container">
        <TimeRotate
          data={
            ["2018-01", "2018-02", "2018-03", "2018-04"]
          }
          forever={true}
          interval={1000}
          onChange={this.handleTimeLineChange}
        />
      </div>
    );
  }
}

export default App;
