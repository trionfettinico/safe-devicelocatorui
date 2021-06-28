package it.filippetti.jarvis.safemap.jarvisTransferPlugin;

public interface DownloadEventListener {
    void downloadCompleted(String url);
    void downloadError(String url);
    void updatePercentage(int percentage);
    void connectingToServer();
    void serverConnected();
}
