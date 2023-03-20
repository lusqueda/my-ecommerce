import React, { Component } from "react";
import "./App.css";

// COMPONENTS
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";


class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <ItemListContainer
          greeting="Bienvenidos a Mi Primer e-Commerce"
        />
        <Footer />
      </div>
    );
  }
}

export default App;
