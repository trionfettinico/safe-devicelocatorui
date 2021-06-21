import React, { useEffect, useState } from "react";
import { ContextSensorsType } from "./type";
import StorageService from "../services/storage";
import { Sensor } from "../data/sensors";
import ApiService from "../services/apiService";
import { IonButton, IonPopover } from "@ionic/react";

export const SensorsContext = React.createContext<ContextSensorsType | null>(null);

const SensorsProvider: React.FC<React.ReactNode> = ({ children }) => {
    const [popoverState, setShowPopover] = useState({ showPopover: false, event: undefined });
    const [apiService] = React.useState<ApiService>(new ApiService());
    const [sensors, setSensorsLocal] = React.useState(new Array<Sensor>());
    const [storageService] = React.useState(new StorageService());
    const [teams, setTeamsLocal] = React.useState<Array<string>>([]);
    const [team, setTeamLocal] = React.useState<string>("");

    async function loadData() {
        var sensorsTemp = await storageService.getSensorLocal();
        if (sensorsTemp.length === 0) {
            try {
                sensorsTemp = await apiService.loadSensors();
                setShowPopover({ showPopover: false, event: undefined });
            } catch {
                setShowPopover({ showPopover: true, event: undefined });
            }
        }
        setSensors(sensorsTemp);
        setTeams(await storageService.getTeams());
        setTeam(await storageService.getTeam());
    }

    useEffect(() => {
        loadData();
    }, []);

    const setSensors = async (sensorsList: Array<Sensor>) => {
        setSensorsLocal(sensorsList);
        storageService.saveSensorLocal(sensorsList);
    }

    const setTeams = async (teams: Array<string>) => {
        setTeamsLocal(teams);
        storageService.saveTeams(teams);
    }

    const setTeam = async (team: string) => {
        setTeamLocal(team);
        storageService.saveTeam(team);
    }

    return (
        <SensorsContext.Provider value={{
            sensors,
            setSensors,
            teams,
            setTeams,
            team,
            setTeam,
        }}>
            {children}
            <IonPopover
                cssClass='my-custom-class'
                event={popoverState.event}
                isOpen={popoverState.showPopover}
                backdropDismiss={false}
            >
                ERRORE<br />
                Avviare app Safe
                <br />
                <IonButton onClick={() => loadData()}>reload</IonButton>
            </IonPopover>
        </SensorsContext.Provider>
    );
};

export default SensorsProvider;