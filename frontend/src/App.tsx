import { IonApp, IonRouterOutlet } from '@ionic/react';
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
import { IonReactRouter } from '@ionic/react-router';
import MapProvider from './provider/MapProvider';

const App: React.FC = () => (
  <MapProvider>
    <IonApp>
      <IonReactRouter>
        <Route path="/home" component={Home} />
        <Redirect exact from="/" to="/home" />
      </IonReactRouter>
    </IonApp>
  </MapProvider>
);

export default App;
