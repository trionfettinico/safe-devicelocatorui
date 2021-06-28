import React, { useContext, useEffect, useState } from "react";
import {
    IonButton,
    IonButtons,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonPopover,
    IonToolbar,
    useIonRouter,
    UseIonRouterResult,
    useIonToast,
    useIonViewDidEnter,
    useIonViewDidLeave,
} from '@ionic/react';
import { Plugins } from "@capacitor/core";
import { MapContext } from "../provider/MapProvider";
import { ContextMapType, ContextSensorsType } from "../provider/type";
import { cloudDoneOutline, downloadOutline } from "ionicons/icons";

import './sync.css';
import { SensorsContext } from "../provider/SensorsProvider";

const { JarvisTransferPlugin, App, Network } = Plugins;

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

    const [popoverState, setShowPopover] = useState(false);

    const [loadError, setLoadError] = useState(false);

    const { downloadedCities, setDownloadedCities, loadDataMap, deletAllMap } = useContext(
        MapContext
    ) as ContextMapType;

    const { clearAll, loadDataSensor } = useContext(
        SensorsContext
    ) as ContextSensorsType

    const [present, dismiss] = useIonToast();

    const [availableCities, setAvailableCities] = React.useState<Array<string>>(new Array());

    useEffect(() => {
        enableHardwareBackButton(ionRouter);
        loadAvailableCities();
        Network.addListener("networkStatusChange", status => {
            if(status.connected){
                loadAvailableCities();
            }
        });
    }, []);

    function loadAvailableCities() {
        var request = "http://www.lucapatarca.cloud/list/available";
        fetch(request)
            .then(response => response.json())
            .then(async data => {
                setAvailableCities(data);
                setLoadError(false);
            }).catch((e) => {
                setLoadError(true);
            });
    }

    async function downloadCity(city_name: string) {
        try {
            await JarvisTransferPlugin.download({
                url: "http://www.lucapatarca.cloud/download/" + city_name,
            });
            var newArray = new Array();
            newArray = newArray.concat(downloadedCities);
            newArray = newArray.concat(city_name);
            setDownloadedCities(newArray);
            present({
                buttons: [{ text: 'ok', handler: () => dismiss() }],
                message: 'mappa scaricata con successo',
                duration: 10000
            });
        } catch (e) {
            setShowPopover(true);
        }
    }

    function reset() {
        clearAll();
        try {
            JarvisTransferPlugin.reset();
            setDownloadedCities(new Array());
            deletAllMap();
            present({
                buttons: [{ text: 'ok', handler: () => dismiss() }],
                message: 'rimossi tutti i dati',
                duration: 10000
            });
            loadDataMap();
            loadDataSensor();
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
            <br />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src="assets/icon/splash.png" height="70 px" width="70 px" />
            </div>
            <IonList className="available-list">
                {loadError? <IonItem><IonLabel className="left-item">Impossibile caricare le mappe disponibili</IonLabel></IonItem>: availableCities.map((cityName) => <IonItem>
                    <IonLabel className="left-item">{cityName}</IonLabel>
                    {downloadedCities.find((e) => e == cityName) === undefined ?
                        <IonButton onClick={() => downloadCity(cityName)} className="right-item" size="default"><IonIcon icon={downloadOutline} size="default" /></IonButton>
                        : <IonIcon icon={cloudDoneOutline} className="right-item" size="large" />}
                </IonItem>)}
            </IonList>
            <IonPopover
                event={undefined}
                isOpen={popoverState}
                backdropDismiss={false}
            >
                <IonLabel className="right-item left-item">ATTENZIONE<br />
                Attivare internet per scaricare le mappe</IonLabel>
                <IonButton onClick={() => setShowPopover(false)}>ok</IonButton>
            </IonPopover>
            <IonToolbar>
                <IonButtons slot="end">
                    <IonButton disabled={downloadedCities.length === 0} color="primary" fill="solid" routerLink="/home" onClick={()=>Network.removeAllListeners()}>
                        fatto
                    </IonButton>
                </IonButtons>
                <IonButtons slot="start">
                    <IonButton color="danger" size="small" onClick={() => reset()} >
                        cancella tutto
                    </IonButton>
                </IonButtons>
            </IonToolbar>
        </IonPage>
    );
};

export default Welcome;
