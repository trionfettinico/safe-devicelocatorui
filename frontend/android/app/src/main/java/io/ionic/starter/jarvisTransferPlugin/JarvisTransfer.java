package io.ionic.starter.jarvisTransferPlugin;

public class JarvisTransfer {

    private final FileDownloader downloader;
    private Unzipper unzipper;

    public JarvisTransfer(DownloadEventListener listener) {
        this.downloader = new FileDownloader(listener);
    }

    public void downloadFile(String url, String savePath){
        String zipPath = savePath + "/tiles.zip";
        this.unzipper = new Unzipper(zipPath);
        downloader.execute(url, zipPath);
    }

    public void unzip() {
        unzipper.unzip();
        unzipper.deleteZipFile();
    }
}


