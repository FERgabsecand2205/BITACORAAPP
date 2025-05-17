import React from 'react';
import { NativeRouter, Route, Routes } from 'react-router-native';
import HomePage from './HomePage';
import WelcomePage from './WelcomePage';
import NewBitacora from './NewBitacora';
import InfoFlight from './InfoFlight';
import InfoFlightPt2 from './InfoFlightPt2';
import InfoFlightComponents from './InfoFlightComponents';
import InfoFlightOrders from './InfoFlightOrders';
import SignatureIssuing from './SignatureIssuing';
import SignatureDoer from './SignatureDoer';
import SignatureDelivery from './SignatureDelivery';
import SignaturePadPage from './SignaturePadPage';
import Comments from './Comments';
import BitacoraCorreccion from '../components/BitacoraCorreccion';
// TODO: BitacoraSearch component will be used later for searching and filtering bitacoras
// import BitacoraSearch from '../components/BitacoraSearch';
import AppBar from '../components/AppBar';

const Main = () => {
  return (
    <NativeRouter>
      <AppBar />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/newBitacora" element={<NewBitacora />} />
        <Route path="/InfoFlight" element={<InfoFlight />} />
        <Route path="/InfoFlightPt2" element={<InfoFlightPt2 />} />
        <Route path="/InfoFlightComponents" element={<InfoFlightComponents />} />
        <Route path="/InfoFlightOrders" element={<InfoFlightOrders />} />
        <Route path="/signatureIssuing" element={<SignatureIssuing />} />
        <Route path="/signatureDoer" element={<SignatureDoer />} />
        <Route path="/signatureDelivery" element={<SignatureDelivery />} />
        <Route path="/signature-pad" element={<SignaturePadPage />} />
        <Route path="/comments" element={<Comments />} />
        <Route path="/correccion/:folio" element={<BitacoraCorreccion />} />
      </Routes>
    </NativeRouter>
  );
};

export default Main;