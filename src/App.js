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
import Players from "./pages/Players.js";
import Help from "./pages/Help.js";


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
                            <Route path='/help' element={<Help />} />
                            <Route path='/players' element={<Players />} />
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
