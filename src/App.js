import React from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main.js";
// import Features from "./components/Features/Features";
import Footer from "./components/Footer/Footer";
// import Calendar from "./components/Calendar/Calendar";
// import Details from "./components/Details/Details";
import FetchData from "./service/FetchData";

import "./style.css";
// const app = React.createElement("div", { classNameName: "App" }, "Привет миру!!!");
class App extends React.Component {
  fetchData = new FetchData();
  state = {
    rocket: "Falcon 1",
    rocketFeatures: null,
    rockets: [],
  };

  componentDidMount() {
    // console.log(this.fetchData.getLaunches().then((data) => console.log(data)));
    this.updateRocket();
  }

  updateRocket() {
    // console.log(this.state);
    this.fetchData
      .getRocket()
      .then((data) => {
        this.setState({ rockets: data.map((item) => item.name) });
        return data;
      })
      .then((data) => data.find((item) => item.name === this.state.rocket))
      .then((rocketFeatures) => this.setState({ rocketFeatures }));
    // console.log(this.state);
  }

  chengeRocket = (rocket) => {
    this.setState(
      {
        rocket,
      },
      this.updateRocket
    );
  };

  render() {
    console.log(this.state);
    return (
      <React.Fragment>
        <Header rockets={this.state.rockets} chengeRocket={this.chengeRocket} />
        <Main rocket={this.state.rocket} />
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
