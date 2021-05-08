import { IonApp, IonRouterOutlet, isPlatform } from '@ionic/react';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import React from "react";
import { Redirect, Route } from 'react-router';
import { IonReactHashRouter, IonReactMemoryRouter, IonReactRouter } from '@ionic/react-router';

const Router = IonReactRouter;

const App: React.FC = () => (
  <IonApp>
    <Router>
        <Route path="/home" component={Home} />
        <Redirect exact from="/" to="/home" />
    </Router>
  </IonApp>
);

export default App;
