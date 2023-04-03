import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// COMPONENTS
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

// PAGES
import Home from "./pages/Home/Home";
import Category from "./pages/Category/Category";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import ItemDetail from "./pages/ItemDetail/ItemDetail";
//import ErrorPage from "./pages/ErrorPage/ErrorPage";

class App extends Component {
  render() {
    return (
      <Router> 
        <div className="App">
          <NavBar />     
          <Header
            title="e-Commerce"
            subTitle="Multi Brand"
          />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/category/:category" element={<Category />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/item-detail/:id" element={<ItemDetail />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
