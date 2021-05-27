import { Storage } from '@ionic/storage';

class StorageService {
    storage = new Storage();

    constructor() {
        this.storage.create();
    }

    saveHeatmapVisible(value: boolean) {
        this.storage.set("HeatmapVisible", value);
    }

    async getHeatmapVisible(): Promise<boolean> {
        const heatmapVisible = await this.storage.get("HeatmapVisible");
        if(heatmapVisible != null)
            return heatmapVisible;
        else
            return true;
    }

    saveLocationVisible(value: boolean) {
        this.storage.set("LocationVisible", value);
    }

    async getLocationVisible(): Promise<boolean> {
        const locationVisible = await this.storage.get("LocationVisible");
        if(locationVisible != null)
            return locationVisible;
        else 
            return true;
    }

    saveMarkerVisible(value: boolean) {
        this.storage.set("MarkerVisible", value);
    }

    async getMarkerVisible(): Promise<boolean> {
        const markerVisible = await this.storage.get("MarkerVisible");
        if(markerVisible != null)
            return markerVisible;
        else 
            return true;
    }

    saveBlur(value: number) {
        this.storage.set("Blur", value);
    }

    async getBlur(): Promise<number> {
        const blur = await this.storage.get("Blur");
        if (blur != null)
            return blur;
        else
            return 18;
    }

    saveRadius(value: number) {
        this.storage.set("Radius", value);
    }

    async getRadius(): Promise<number> {
        const radius = await this.storage.get("Radius");
        if(radius != null)
            return radius;
        else
            return 10;
    }
}

export default StorageService;