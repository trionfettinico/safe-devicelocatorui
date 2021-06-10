package io.ionic.starter.jarvisTransferPlugin;

import android.os.AsyncTask;
import android.util.Log;

import java.io.BufferedInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;
import java.net.URLConnection;
import java.util.Objects;

public class FileDownloader extends AsyncTask<String, String, String> {

    private final DownloadEventListener listener;

    public FileDownloader(DownloadEventListener listener) {
        this.listener = listener;
    }

    @Override
    protected String doInBackground(String... strings) {
        Log.d("DOWNLOAD", "Download started");
        int count;
        try {
            URL url = new URL(strings[0]);
            URLConnection connection = url.openConnection();
            connection.connect();
            InputStream input = new BufferedInputStream(url.openStream(),
                    8192);
            OutputStream output = new FileOutputStream(strings[1]);
            byte[] data = new byte[1024];
            while ((count = input.read(data)) != -1) {
                output.write(data, 0, count);
            }
            output.flush();
            output.close();
            input.close();

        } catch (Exception e) {
            Log.e("Error: ", Objects.requireNonNull(e.getMessage()));
        }
        return strings[0];
    }

    @Override
    protected void onPostExecute(String s) {
        super.onPostExecute(s);
        Log.d("DOWNLOAD", "Download finished");
        listener.downloadCompleted(s);
    }
}
