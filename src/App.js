// dependencies
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// styles
import "./App.css";

//context
import { SearchProvider } from './context/SearchContext.js';

// pages
import Home from "./pages/Home.js";
import Available from "./pages/Available.js";
import Players from "./pages/Players.js";
import SearchHistory from "./pages/SearchHistory.js";
import Help from "./pages/Help.js";

// components
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";

// fixed header and scrollable main sections
// search provider for context state management
// using react-router-dom for routing

function App() {
    return (
        <Router>
            <SearchProvider>
                <div className='page-wrapper'>
                    <Header />           
                    <section className='main-wrapper'>
                        <main>
                            <Routes>
                                <Route path='/help' element={<Help />} />
                                <Route path='/search-history' element={<SearchHistory />} />
                                <Route path='/players' element={<Players />} />
                                <Route path='/available' element={<Available />} />
                                <Route path='/' element={<Home />} />
                            </Routes>
                        </main>
                        <Footer />
                    </section>
                </div>
            </SearchProvider>
        </Router>
    );
}

export default App;
