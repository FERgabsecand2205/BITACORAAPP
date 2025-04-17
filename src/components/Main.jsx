import React from 'react';
import { NativeRouter, Route, Routes } from 'react-router-native';
import HomePage from '../pages/HomePage';
import CreateNew from '../pages/CreateNew';
import WelcomePage from '../pages/WelcomePage'; // Importar WellcomePage
import NewBitacora from '../pages/NewBitacora'; // Importar NewBitacora
import InfoFlight from '../pages/InfoFlight'; // Importar InfoFlight
import InfoFlightPt2 from '../pages/InfoFlightPt2'; // Importar InfoFlightPt2
import InfoFlightComponents from '../pages/InfoFlightComponents';
import InfoFlightOrders from '../pages/InfoFlightOrders';
import SignatureIssuing from '../pages/SignatureIssuing';
import SignatureDoer from '../pages/SignatureDoer';
import SignatureDelivery from '../pages/SignatureDelivery';
import Comments from '../pages/Comments';
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
                <Route path="/InfoFlight" element={<InfoFlight />} />
                <Route path="/InfoFlightPt2" element={<InfoFlightPt2 />} />
                <Route path="/InfoFlightComponents" element={<InfoFlightComponents />} />
                <Route path="/InfoFlightOrders" element={<InfoFlightOrders />} />
                <Route path="/signatureIssuing" element={<SignatureIssuing />} />
                <Route path="/signatureDoer" element={<SignatureDoer />} />
                <Route path="/signatureDelivery" element={<SignatureDelivery />} />
                <Route path="/comments" element={<Comments />} />
            </Routes>
        </NativeRouter>
    );
};

export default Main;