import React, { useContext, useEffect } from "react";
import {
    IonButton,
    IonCheckbox,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    useIonRouter,
    UseIonRouterResult,
    useIonToast,
} from '@ionic/react';

import { Plugins } from "@capacitor/core";
import { MapContext } from "../provider/MapProvider";
import { ContextMapType } from "../provider/type";
import { Icon } from "ol/style";
import { cloudDoneOutline, download, downloadOutline } from "ionicons/icons";

import './sync.css';

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
        try{
            JarvisTransferPlugin.reset();
            setDownloadedCities(new Array());
            present({
                buttons: [{ text: 'ok', handler: () => dismiss() }],
                message: 'rimossi tutti i dati',
                duration: 10000
            });
        } catch {
            present({
                buttons: [{ text: 'ok', handler: () => dismiss() }],
                message: 'impossibile cancellare i dati',
                duration: 10000
            });
        }
    }

    return (
        <IonPage id="home-page">
            <IonList className="available-list">
                {availableCities.map((cityName) => <IonItem>
                    <IonLabel className="left-item">{cityName}</IonLabel>
                    {downloadedCities.find((e) => e == cityName) === undefined ?
                        <IonButton onClick={() => downloadCity(cityName)} className="right-item"><IonIcon icon={downloadOutline} size="large"/></IonButton>
                        : <IonIcon icon={cloudDoneOutline} className="right-item" size="large"/>}
                </IonItem>)}
            </IonList>
            <IonButton color="danger" size="small" onClick={() => reset()} >
                cancella tutto
            </IonButton>
            <IonButton disabled={downloadedCities.length === 0} color="secondary" routerLink="/home">
                fatto
            </IonButton>
        </IonPage>
    );
};

export default Welcome;
