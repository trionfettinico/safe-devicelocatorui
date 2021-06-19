import React, { useContext, useEffect } from "react";
import {
    IonButton,
    IonInput,
    IonItem,
    IonPage,
    useIonRouter,
    UseIonRouterResult,
    useIonToast,
} from '@ionic/react';
import './Home.css';
import { Plugins } from "@capacitor/core";
import { MapContext } from "../provider/MapProvider";
import { ContextMapType } from "../provider/type";
const { JarvisTransferPlugin, App } = Plugins;

function enableHardwareBackButton(ionRouter: UseIonRouterResult){
  document.addEventListener('ionBackButton', (ev: any) => {
    ev.detail.register(-1, () => {
      if (!ionRouter.canGoBack()) {
        App.exitApp();
      }
    });
  });
}

// const { Network } = Plugins;


var city = "";

const Welcome: React.FC = () => {
    const ionRouter = useIonRouter();

    const { tilesInit, setTilesInitLocal , clearAll } = useContext(
        MapContext
    ) as ContextMapType;
    const [present, dismiss] = useIonToast();

    // const [networkState, setNetworkState] = useState("offline");

    useEffect(() => {
        enableHardwareBackButton(ionRouter);
        if(tilesInit)
            window.open("/home");
        // Network.addListener("networkStatusChange", status => {
        //     setNetworkState(status.connectionType);
        // });
    }, []);

    function loadTiles() {
        var request = "http://api.opencagedata.com/geocode/v1/json?q=";
        request += city;
        request += "&key=6124b12559354447bfa6fd61c1316325";
        fetch(request)
            .then(response => response.json())
            .then(async data => {
                if (data.results.length == 0) {
                    present({
                        buttons: [{ text: 'hide', handler: () => dismiss() }],
                        message: 'nome ' + city + ' non valido',
                        duration: 10000
                    });
                    return;
                }
                console.log("Starting download");
                await JarvisTransferPlugin.download({
                    url: "http://www.lucapatarca.cloud/" + data.results[0].geometry.lat + "/" + data.results[0].geometry.lng,
                });
                console.log("Download completed");
                console.log("Starting unzip");
                await JarvisTransferPlugin.unzip({});
                console.log("Unzip completed");
                setTilesInitLocal(true);
            });
    }

    function reset(){
        clearAll();
        JarvisTransferPlugin.reset();
        present({
            buttons: [{ text: 'hide', handler: () => dismiss() }],
            message: 'rimossi tutti i dati',
            duration: 10000
        });
        return;
    }

    return (
        <IonPage id="home-page">
            <IonItem>
                <IonInput placeholder="Enter Input" onIonChange={(e) => city = ((e.target as HTMLInputElement).value)}></IonInput>
            </IonItem>
            <IonButton onClick={() => loadTiles()} >
                load
            </IonButton>
            <IonButton onClick={() => reset()} >
                reset all
            </IonButton>
            <IonButton /*disabled={!tilesInit}*/ routerLink="/home">
                skip
            </IonButton>
            {/* <IonCardContent>Network status: {networkState}</IonCardContent> */}
        </IonPage>
    );
};

export default Welcome;