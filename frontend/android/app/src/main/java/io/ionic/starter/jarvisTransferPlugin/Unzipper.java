package io.ionic.starter.jarvisTransferPlugin;

import android.util.Log;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Enumeration;
import java.util.Objects;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;
import java.util.zip.ZipInputStream;

public class Unzipper {

    public void unzip(String filename) throws IOException {
        Log.d("UNZIP", "Unzip started");
        String outputPath = filename.substring(0, filename.length() - 4);
        File file = new File(filename);
        FileInputStream is = new FileInputStream(file);
        ZipInputStream zip = new ZipInputStream(is);
        File outputPathFile = new File(outputPath);
        outputPathFile.mkdir();
        unzipAllEntries(zip, outputPath);
        Log.d("UNZIP", "Unzip finished");
    }

    public boolean deleteZipFile(String filename){
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
}
