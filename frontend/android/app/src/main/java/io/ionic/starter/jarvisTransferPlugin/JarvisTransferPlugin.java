package io.ionic.starter.jarvisTransferPlugin;

import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;

import java.util.HashMap;
import java.util.Map;

import io.ionic.starter.jarvisTransferPlugin.JarvisTransfer;

@NativePlugin()
public class JarvisTransferPlugin extends Plugin implements DownloadEventListener{

    private final JarvisTransfer implementation;
    private final Map<String, PluginCall> downloadCalls;

    public JarvisTransferPlugin() {
        super();
        this.implementation = new JarvisTransfer(this);
        this.downloadCalls = new HashMap<>();
    }

    @PluginMethod()
    public void download(PluginCall call){
        String savePath = getActivity().getExternalFilesDir(null).getPath();
        String url = call.getString("url");
        downloadCalls.put(url,call);
        implementation.downloadFile(url, savePath);
    }

    @PluginMethod()
    public void unzip(PluginCall call){
        implementation.unzip();
        call.resolve();
    }

    @Override
    public void downloadCompleted(String url) {
        PluginCall toResolve = downloadCalls.get(url);
        if(toResolve!=null){
            toResolve.resolve();
            downloadCalls.remove(url);
        }
    }
}
