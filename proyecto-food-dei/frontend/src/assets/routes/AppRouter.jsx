import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeScreen from "../screens/HomeScreen.jsx";
import LuckyNumberScreen from "../screens/LuckyNumberScreen.jsx";
import MenuScreen from "../screens/MenuScreen.jsx";

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/ejercicio1" element={<LuckyNumberScreen />} />
            <Route path="/ejercicio2" element={<MenuScreen />} />
        </Routes>
    );
}

export default AppRouter;