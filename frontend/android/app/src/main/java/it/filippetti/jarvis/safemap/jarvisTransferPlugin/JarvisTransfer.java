package it.filippetti.jarvis.safemap.jarvisTransferPlugin;

import android.content.Context;

import java.io.File;
import java.io.IOException;

public class JarvisTransfer {
    private final DownloadEventListener listener;
    private final Unzipper unzipper;

    public JarvisTransfer(DownloadEventListener listener) {
        this.listener = listener;
        this.unzipper = new Unzipper();
    }

    public void downloadFile(String url, String zipPath){
        new FileDownloader(listener).execute(url, zipPath);
    }

    public void unzip(String zipPath) throws IOException {
        unzipper.unzip(zipPath);
        unzipper.deleteZipFile(zipPath);
    }

    public boolean reset(String folderPath){
        File file = new File(folderPath);
        return file.delete();
    }
}


