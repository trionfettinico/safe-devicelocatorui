import { IonButton, IonLoading, IonToast } from '@ionic/react';
import { Plugins} from "@capacitor/core";
import { useState } from 'react';
const { Geolocation,Geoposition} = Plugins;


interface LocationError {
    showError: boolean;
    message?: string;
}

const GeolocationButton: React.FC = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<LocationError>({ showError: false });
    var position:any = null;

    function setPosition(cord:any){
        position = cord;
    }

    const getLocation = async () => {
        setLoading(true);

        try {
            const position = await Geolocation.getCurrentPosition();
            setPosition(position);
            setLoading(false);
            setError({ showError: false });
            console.log("okay");
            console.log(position);
        } catch (e) {
            setError({ showError: true, message: e.message });
            setLoading(false);
            console.log("error");
            console.log(position);
        }

    }

    return (
        <>
            <IonLoading
                isOpen={loading}
                onDidDismiss={() => setLoading(false)}
                message={'Getting Location...'}
            />
            <IonToast
                isOpen={error.showError}
                onDidDismiss={() => setError({ message: "", showError: false })}
                message={error.message}
                duration={3000}
            />
            <IonButton color="primary" onClick={getLocation}>{position ? `${position.coords.latitude} ${position.coords.longitude}` : "Get Location"}</IonButton>
        </>
    );
};

export default GeolocationButton;