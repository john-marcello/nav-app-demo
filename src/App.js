// dependencies
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// components
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";

// styles
import "./assets/styles/Main.css";

// pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

// renders the app with header, main, and footer
// uses react-router-dom to manage broser routes
function App() {
    return (
        <Router>
            <div class='page-wrapper'>
                <Header />           
                <section className='main-wrapper'>
                    <main>
                        <Routes>
                            <Route path='/about' element={<About />} />
                            <Route path='/contact' element={<Contact />} />
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
