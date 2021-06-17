import React, { useEffect } from "react";
import {
    IonButton,
    IonInput,
    IonItem,
    IonPage,
} from '@ionic/react';
import './Home.css';
import { Plugins } from "@capacitor/core";
const { JarvisTransferPlugin } = Plugins;

// const { Network } = Plugins;


var city = "";

const Welcome: React.FC = () => {

    // const [networkState, setNetworkState] = useState("offline");

    useEffect(() => {
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
                    console.log("vuoto");
                    return;
                }
                if (data.results[0].components.country_code == "it") {
                    console.log("Starting download");
                    await JarvisTransferPlugin.download({
                      url: "http://www.lucapatarca.cloud/"+data.results[0].geometry.lat+"/"+data.results[0].geometry.lng,
                    });
                    console.log("Download completed");
                    console.log("Starting unzip");
                    await JarvisTransferPlugin.unzip({});
                    console.log("Unzip completed");
                }
                else {                    
                    console.log("non presente");
                }
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