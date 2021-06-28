package it.filippetti.jarvis.safemap.jarvisTransferPlugin;

import android.content.Context;

import java.io.File;
import java.io.IOException;

public class JarvisTransfer {
    private final DownloadEventListener downloadListener;
    private final UnzipEventListener unzipListener;

    public JarvisTransfer(DownloadEventListener downloadListener, UnzipEventListener unzipListener) {
        this.downloadListener = downloadListener;
        this.unzipListener = unzipListener;
    }

    public void downloadFile(String url, String zipPath){
        new FileDownloader(downloadListener).execute(url, zipPath);
    }

    public void unzip(String zipPath) throws IOException {
        Unzipper unzipper = new Unzipper(unzipListener);
        unzipper.execute(zipPath);
    }

    public boolean reset(String folderPath){
        File file = new File(folderPath);
        return file.delete();
    }
}


