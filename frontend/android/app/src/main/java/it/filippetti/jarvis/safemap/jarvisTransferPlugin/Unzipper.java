package it.filippetti.jarvis.safemap.jarvisTransferPlugin;

import android.os.AsyncTask;
import android.util.Log;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Enumeration;
import java.util.Objects;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;
import java.util.zip.ZipInputStream;

public class Unzipper extends AsyncTask<String, String, String> {

    private final UnzipEventListener listener;

    public Unzipper(UnzipEventListener listener) {
        this.listener = listener;
    }

    private boolean deleteZipFile(String filename){
        File file = new File(filename);
        return file.delete();
    }

    private void unzipAllEntries(ZipInputStream zip, String outputPath) throws IOException {
        ZipEntry entry;
        while ((entry = zip.getNextEntry())!=null) {
            String currentEntryName = entry.getName();
            File outputFile = new File(outputPath, currentEntryName);
            File destinationParent = outputFile.getParentFile();

            Objects.requireNonNull(destinationParent).mkdirs();

            if (!entry.isDirectory()) {
                unzipEntry(zip,outputFile);
            }
        }
    }

    private void unzipEntry(ZipInputStream zip, File outputFile) throws IOException {
        int currentByte;
        int bufferSize = 2048;
        byte[] data = new byte[bufferSize];

        FileOutputStream fos = new FileOutputStream(outputFile);
        try (BufferedOutputStream dest = new BufferedOutputStream(fos, bufferSize)) {
            while ((currentByte = zip.read(data, 0, bufferSize)) != -1) {
                dest.write(data, 0, currentByte);
            }
            dest.flush();
            zip.closeEntry();
        }
    }

    @Override
    protected String doInBackground(String... strings) {
        Log.d("UNZIP", "Unzip started");
        try {
            File file = new File(strings[0]);
            String outputPath = file.getParent();
            FileInputStream is = new FileInputStream(file);
            ZipInputStream zip = new ZipInputStream(is);
            File outputPathFile = new File(outputPath);
            outputPathFile.mkdir();
            unzipAllEntries(zip, outputPath);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return strings[0];
    }

    @Override
    protected void onPostExecute(String s) {
        Log.d("UNZIP", "Unzip finished");
        listener.unzipCompleted(s);
        deleteZipFile(s);
        super.onPostExecute(s);
    }
}
