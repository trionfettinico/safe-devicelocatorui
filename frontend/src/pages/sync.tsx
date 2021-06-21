import React, { useContext, useEffect } from "react";
import {
    IonButton,
    IonCheckbox,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
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

function enableHardwareBackButton(ionRouter: UseIonRouterResult) {
    document.addEventListener('ionBackButton', (ev: any) => {
        ev.detail.register(-1, () => {
            if (!ionRouter.canGoBack()) {
                App.exitApp();
            }
        });
    });
}

const Welcome: React.FC = () => {
    const ionRouter = useIonRouter();

    const { downloadedCities, setDownloadedCities, clearAll } = useContext(
        MapContext
    ) as ContextMapType;
    const [present, dismiss] = useIonToast();

    const [availableCities, setAvailableCities] = React.useState<Array<string>>(new Array());

    useEffect(() => {
        enableHardwareBackButton(ionRouter);
        loadAvailableCities();
    }, []);

    function loadAvailableCities() {
        var request = "http://www.lucapatarca.cloud/list/available";
        fetch(request)
            .then(response => response.json())
            .then(async data => {
                setAvailableCities(data);
            });
    }

    async function downloadCity(city_name: string) {
        console.log("Starting download");
        await JarvisTransferPlugin.download({
            url: "http://www.lucapatarca.cloud/download/" + city_name,
        });
        console.log("Download completed");
        console.log("Starting unzip");
        await JarvisTransferPlugin.unzip({});
        console.log("Unzip completed");
        const newArray = downloadedCities.concat(city_name);
        setDownloadedCities(newArray);
    }

    function reset() {
        clearAll();
        JarvisTransferPlugin.reset();
        setDownloadedCities(new Array());
        present({
            buttons: [{ text: 'hide', handler: () => dismiss() }],
            message: 'rimossi tutti i dati',
            duration: 10000
        });
        return;
    }

    return (
        <IonPage id="home-page">
            <IonList>
                {availableCities.map((cityName) => <IonItem>
                    <IonLabel>{cityName}</IonLabel>
                    {downloadedCities.find((e) => e == cityName) === undefined ?
                        <IonButton onClick={() => downloadCity(cityName)}>download</IonButton>
                        : <div />}
                </IonItem>)}
            </IonList>
            <IonButton onClick={() => reset()} >
                reset all
            </IonButton>
            <IonButton disabled={downloadedCities.length === 0} routerLink="/home">
                skip
            </IonButton>
        </IonPage>
    );
};

export default Welcome;
