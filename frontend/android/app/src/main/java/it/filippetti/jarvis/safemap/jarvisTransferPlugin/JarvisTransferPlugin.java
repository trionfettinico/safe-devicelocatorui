package it.filippetti.jarvis.safemap.jarvisTransferPlugin;

import android.app.ProgressDialog;
import android.widget.Toast;

import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@NativePlugin()
public class JarvisTransferPlugin extends Plugin implements DownloadEventListener{

    private final JarvisTransfer implementation;
    private final Map<String, PluginCall> downloadCalls;
    private ProgressDialog dialog;

    public JarvisTransferPlugin() {
        super();
        this.implementation = new JarvisTransfer(this);
        this.downloadCalls = new HashMap<>();
    }

    public void showDialog(){
        dialog = new ProgressDialog(getContext());
        dialog.setMessage("Connecting to server...");
        dialog.setIndeterminate(true);
        dialog.setMax(100);
        dialog.setProgressStyle(ProgressDialog.STYLE_SPINNER);
        dialog.setCancelable(false);
        dialog.show();
    }

    @PluginMethod()
    public void download(PluginCall call){
        String url = call.getString("url");
        downloadCalls.put(url,call);
        implementation.downloadFile(url, getZipPath());
    }

    @PluginMethod()
    public void unzip(PluginCall call){
        try {
            implementation.unzip(getZipPath());
            call.resolve();
            Toast.makeText(getContext(), "Unzip completed", Toast.LENGTH_LONG).show();
        } catch (IOException e) {
            e.printStackTrace();
            call.reject("error");
        }
    }

    @PluginMethod()
    public void reset(PluginCall call){
        boolean result = implementation.reset(getZipPath());
        if(result)
            call.resolve();
        else
            call.reject("Impossibile rimuovere la cartella tiles");
    }

    @Override
    public void downloadCompleted(String url) {
        dialog.dismiss();
        PluginCall toResolve = downloadCalls.get(url);
        if(toResolve!=null){
            toResolve.resolve();
            downloadCalls.remove(url);
        }
    }

    @Override
    public void downloadError(String url) {
        dialog.dismiss();
        PluginCall toResolve = downloadCalls.get(url);
        if(toResolve!=null){
            toResolve.reject(url);
            downloadCalls.remove(url);
        }
    }

    @Override
    public void updatePercentage(int percentage) {
        dialog.setProgress(percentage);
    }

    @Override
    public void connectingToServer() {
        showDialog();
    }

    @Override
    public void serverConnected() {
        dialog.dismiss();
        dialog = new ProgressDialog(getContext());
        dialog.setMessage("Downloading file...");
        dialog.setIndeterminate(false);
        dialog.setMax(100);
        dialog.setProgressStyle(ProgressDialog.STYLE_HORIZONTAL);
        dialog.setCancelable(false);
        dialog.show();
    }

    private String getZipPath(){
        return getFolderPath()+".zip";
    }

    private String getFolderPath(){
        return getContext().getExternalFilesDir(null).getPath()+"/tiles";
    }
}
