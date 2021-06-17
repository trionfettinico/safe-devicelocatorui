import React, { useContext, useEffect } from "react";
import {
    IonButton,
    IonInput,
    IonItem,
    IonPage,
    useIonToast,
} from '@ionic/react';
import './Home.css';
import { Plugins } from "@capacitor/core";
import { MapContext } from "../provider/MapProvider";
import { ContextMapType } from "../provider/type";
const { JarvisTransferPlugin } = Plugins;

// const { Network } = Plugins;


var city = "";

const Welcome: React.FC = () => {
    const { tilesInit, setTilesInit } = useContext(
        MapContext
    ) as ContextMapType;
    const [present, dismiss] = useIonToast();

    // const [networkState, setNetworkState] = useState("offline");

    useEffect(() => {
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
                setTilesInit(true);
            });
    }

    return (
        <IonPage id="home-page">
            <IonItem>
                <IonInput placeholder="Enter Input" onIonChange={(e) => city = ((e.target as HTMLInputElement).value)}></IonInput>
            </IonItem>
            <IonButton onClick={() => loadTiles()} >
                load
            </IonButton>
            <IonButton routerLink="/home">
                skip
            </IonButton>
            {/* <IonCardContent>Network status: {networkState}</IonCardContent> */}
        </IonPage>
    );
};

export default Welcome;