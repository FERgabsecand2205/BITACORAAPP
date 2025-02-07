import React from 'react';
import { NativeRouter, Route, Routes } from 'react-router-native';
import HomePage from '../pages/HomePage';
import CreateNew from '../pages/CreateNew';
import WelcomePage from '../pages/WelcomePage'; // Importar WellcomePage
import NewBitacora from '../pages/NewBitacora'; // Importar NewBitacora
import AppBar from './AppBar';

const Main = () => {        
    return (
        <NativeRouter>
            <AppBar />
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/createnewbitacora" element={<CreateNew />} />
                <Route path="/newBitacora" element={<NewBitacora />} />
            </Routes>
        </NativeRouter>
    );
};

export default Main;