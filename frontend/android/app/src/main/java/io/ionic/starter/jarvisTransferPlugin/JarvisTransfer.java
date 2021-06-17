package io.ionic.starter.jarvisTransferPlugin;

import android.content.Context;

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
}


