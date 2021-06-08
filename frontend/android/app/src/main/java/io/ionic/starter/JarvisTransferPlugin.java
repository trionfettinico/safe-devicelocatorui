package io.ionic.starter;

import android.os.Environment;
import android.util.Log;

import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;

@NativePlugin()
public class JarvisTransferPlugin extends Plugin {
    @PluginMethod()
    public void test(PluginCall call){
        String value = call.getString("value");
        JSObject ret = new JSObject();
        JarvisTransfer implementation = new JarvisTransfer(this.getActivity().getExternalFilesDir(null).getPath());
        implementation.downloadFile(value, (s)->{
            implementation.unzip(implementation.getSavePath()+implementation.getFilename());
            ret.put("value", "From typescript: "+value);
            call.resolve(ret);
            return null;
        });
    }
}
