import { IonApp, useIonRouter, UseIonRouterResult } from '@ionic/react';
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

import React, { useEffect } from "react";
import { Redirect, Route } from 'react-router';
import { IonReactRouter } from '@ionic/react-router';
import MapProvider from './provider/MapProvider';
import Welcome from './pages/sync';
import Teams from './pages/Team';
import SensorsProvider from './provider/SensorsProvider';
import { Plugins } from "@capacitor/core";

function enableHardwareBackButton(ionRouter: UseIonRouterResult){
  document.addEventListener('ionBackButton', (ev: any) => {
    ev.detail.register(-1, () => {
      if (!ionRouter.canGoBack()) {
        Plugins.App.exitApp();
      }
    });
  });
}

const App: React.FC = () => {
  
  const ionRouter = useIonRouter();
  useEffect(()=>{
    enableHardwareBackButton(ionRouter);
  }, []);

  return (
    <MapProvider>
      <SensorsProvider>
      <IonApp>
        <IonReactRouter>
          <Route path="/home" component={Home} />
          <Route path="/welcome" component={Welcome} />
          <Route path="/teams" component={Teams} />
          <Redirect exact from="/" to="/welcome" />
        </IonReactRouter>
      </IonApp>
      </SensorsProvider>
    </MapProvider>)
};

export default App;