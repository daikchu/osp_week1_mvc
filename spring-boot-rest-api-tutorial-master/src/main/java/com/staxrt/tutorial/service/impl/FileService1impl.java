package com.staxrt.tutorial.service.impl;

import com.staxrt.tutorial.model.File1;
import com.staxrt.tutorial.repository.FileReposistory;
import com.staxrt.tutorial.service.FileService1;
import com.staxrt.tutorial.util.FileStorageException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class FileService1impl implements FileService1 {
    @Autowired FileReposistory fileReposistory;

    @Override
    public File1 storeFile(MultipartFile file) {

        // Normalize file name
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            // Check if the file's name contains invalid characters
            if(fileName.contains("..")) {
                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
            }

            File1 file1 = new File1(fileName, file.getContentType(), file.getBytes());

            return fileReposistory.save(file1);
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    @Override
    public File1 getFile(String fileId) {
        return null;
    }
}
