package io.ionic.starter.jarvisTransferPlugin;

import android.os.AsyncTask;
import android.os.StrictMode;
import android.util.Log;

import java.io.BufferedInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.net.URLConnection;
import java.util.Objects;

public class FileDownloader extends AsyncTask<String, String, String> {

    private final DownloadEventListener listener;

    public FileDownloader(DownloadEventListener listener) {
        this.listener = listener;

        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);
    }

    @Override
    protected void onPreExecute() {
        super.onPreExecute();
        listener.connectingToServer();
    }

    @Override
    protected String doInBackground(String... strings) {
        Log.d("DOWNLOAD", "Connecting");
        int count;
        try {
            URL url = new URL(strings[0]);
            URLConnection connection = url.openConnection();
            connection.connect();
            int lengthOfFile = connection.getContentLength();
            InputStream input = new BufferedInputStream(url.openStream(),
                    8192);
            OutputStream output = new FileOutputStream(strings[1]);
            byte[] data = new byte[1024];
            long total = 0;
            publishProgress("Connected");
            Log.d("DOWNLOAD", "Download started");
            while ((count = input.read(data)) != -1) {
                total += count;
                publishProgress("" + (int) ((total * 100) / lengthOfFile));
                output.write(data, 0, count);
            }
            output.flush();
            output.close();
            input.close();

        } catch (ProtocolException e) {
            //ignore
        } catch (IOException e) {
            e.printStackTrace();
            this.cancel(false);
        }
        return strings[0];
    }

    @Override
    protected void onProgressUpdate(String... values) {
        try {
            listener.updatePercentage(Integer.parseInt(values[0]));
        }catch (NumberFormatException e){
            if(values[0].equals("Connected")){
                listener.serverConnected();
            }
        }
    }

    @Override
    protected void onPostExecute(String s) {
        super.onPostExecute(s);
        Log.d("DOWNLOAD", "Download finished");
        listener.downloadCompleted(s);
    }

    @Override
    protected void onCancelled(String s) {
        Log.d("DOWNLOAD", "Download error");
        listener.downloadError(s);
    }
}
