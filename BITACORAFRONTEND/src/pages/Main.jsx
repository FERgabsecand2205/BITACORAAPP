import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BitacoraForm from '../components/BitacoraForm';
import BitacoraSearch from '../components/BitacoraSearch';
import BitacoraCorreccion from '../components/BitacoraCorreccion';

const Main = () => {
    return (
        <Routes>
            <Route path="/" element={<BitacoraSearch />} />
            <Route path="/nueva" element={<BitacoraForm />} />
            <Route path="/correccion/:folio" element={<BitacoraCorreccion />} />
        </Routes>
    );
};

export default Main; 