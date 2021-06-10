package io.ionic.starter.jarvisTransferPlugin;

import android.util.Log;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Enumeration;
import java.util.Objects;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

public class Unzipper {

    private final String filename;
    private final String outputPath;

    public Unzipper(String filename) {
        this(filename,filename.substring(0, filename.length() - 4));
    }

    public Unzipper(String filename, String outputPath){
        this.filename = filename;
        this.outputPath = outputPath;
    }

    public void unzip(){
        Log.d("UNZIP", "Unzip started");
        unzipRecursive(filename);
        Log.d("UNZIP", "Unzip finished");
    }

    public boolean deleteZipFile(){
        File file = new File(filename);
        return file.delete();
    }

    private void unzipRecursive(String zipFile) {
        File file = new File(zipFile);
        try (ZipFile zip = new ZipFile(file)) {
            File outputPathFile = new File(outputPath);
            if(!outputPathFile.mkdir())
                throw new IOException("Cannot create main output directory");
            unzipAllEntries(zip);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void unzipAllEntries(ZipFile zip) throws IOException {
        Enumeration<? extends ZipEntry> zipEntries = zip.entries();
        while (zipEntries.hasMoreElements()) {
            ZipEntry entry = zipEntries.nextElement();
            String currentEntryName = entry.getName();
            File outputFile = new File(outputPath, currentEntryName);
            File destinationParent = outputFile.getParentFile();

            Objects.requireNonNull(destinationParent).mkdirs();

            if (!entry.isDirectory()) {
                unzipEntry(zip,entry,outputFile);
            }

            if (currentEntryName.endsWith(".zip")) {
                // found a zip file, try to open
                unzipRecursive(outputFile.getAbsolutePath());
            }
        }
    }

    private void unzipEntry(ZipFile zip, ZipEntry entry, File outputFile) throws IOException {
        BufferedInputStream is = new BufferedInputStream(zip.getInputStream(entry));
        int currentByte;
        int bufferSize = 2048;
        byte[] data = new byte[bufferSize];

        FileOutputStream fos = new FileOutputStream(outputFile);
        try (BufferedOutputStream dest = new BufferedOutputStream(fos, bufferSize)) {
            while ((currentByte = is.read(data, 0, bufferSize)) != -1) {
                dest.write(data, 0, currentByte);
            }
            dest.flush();
            is.close();
        }
    }
}
