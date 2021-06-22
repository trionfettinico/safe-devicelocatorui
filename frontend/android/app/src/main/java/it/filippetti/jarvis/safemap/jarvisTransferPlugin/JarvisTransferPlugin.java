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
public class JarvisTransferPlugin extends Plugin implements DownloadEventListener, UnzipEventListener{

    private final JarvisTransfer implementation;
    private final Map<String, PluginCall> downloadCalls;
    private ProgressDialog dialog;

    public JarvisTransferPlugin() {
        super();
        this.implementation = new JarvisTransfer(this, this);
        this.downloadCalls = new HashMap<>();
    }

    public void showDialog(String message, boolean indeterminate){
        if(dialog != null)
            dialog.dismiss();
        dialog = new ProgressDialog(getContext());
        dialog.setMessage(message);
        dialog.setIndeterminate(indeterminate);
        if(!indeterminate)
            dialog.setMax(100);
        dialog.setProgressStyle(indeterminate? ProgressDialog.STYLE_SPINNER : ProgressDialog.STYLE_HORIZONTAL);
        dialog.setCancelable(false);
        dialog.show();
    }

    @PluginMethod()
    public void download(PluginCall call){
        String url = call.getString("url");
        downloadCalls.put(url,call);
        implementation.downloadFile(url, getZipPath());
    }

    public void unzip(PluginCall call){
        showDialog("Estrazione mappa...", true);
        try {
            downloadCalls.put(getZipPath(), call);
            implementation.unzip(getZipPath());
        } catch (IOException e) {
            e.printStackTrace();
            dialog.dismiss();
            call.reject("error");
            Toast.makeText(getContext(), "Errore durante l'estrazione della mappa", Toast.LENGTH_LONG).show();
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
        PluginCall toResolve = downloadCalls.get(url);
        if(toResolve!=null){
            downloadCalls.remove(url);
            unzip(toResolve);
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
        showDialog("Connessione al server...", true);
    }

    @Override
    public void serverConnected() {
        showDialog("Scaricamento mappa...", false);
    }

    private String getZipPath(){
        return getFolderPath()+".zip";
    }

    private String getFolderPath(){
        return getContext().getExternalFilesDir(null).getPath()+"/tiles";
    }

    @Override
    public void unzipCompleted(String file) {
        dialog.dismiss();
        PluginCall toResolve = downloadCalls.get(file);
        if(toResolve!=null){
            toResolve.resolve();
        }
    }
}
