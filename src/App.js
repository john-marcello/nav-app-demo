// dependencies
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// components
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";

// styles
import "./App.css";
import "./assets/styles/Main.css";

// pages
import Home from "./pages/Home.js";
import Available from "./pages/Available.js";
import Boards from "./pages/Boards.js";
import Promos from "./pages/Promos.js";


// renders the app with fixed header and scrollable main and footer sections
// uses react-router-dom to manage browser routes
function App() {
    return (
        <Router>
            <div className='page-wrapper'>
                <Header />           
                <section className='main-wrapper'>
                    <main>
                        <Routes>
                            <Route path='/promos' element={<Promos />} />
                            <Route path='/boards' element={<Boards />} />
                            <Route path='/available' element={<Available />} />
                            <Route path='/' element={<Home />} />
                        </Routes>
                    </main>
                    <Footer />
                </section>
            </div>
        </Router>
    );
}

export default App;
