import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ServerConnection from './routes/server/connection/server-connection';
import { NavigationBar } from './components/common/navigation-bar/navigation-bar';
import { Footer } from './components/common/footer/footer';
import ServerMessages from './routes/server/messages/server-messages';
import WizardCreate from './routes/wizard/create/wizard-create';
import WizardContinue from './routes/wizard/continue/wizard-continue';

createRoot(document.getElementById('root') as Element).render(
    <>
        <NavigationBar></NavigationBar>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='wizard/create' element={<WizardCreate />} />
                <Route path='wizard/continue' element={<WizardContinue />} />
                <Route path='server/connection' element={<ServerConnection />} />
                <Route path='server/messages' element={<ServerMessages />} />
                <Route></Route>
            </Routes>
        </BrowserRouter>
        <Footer></Footer>
    </>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
