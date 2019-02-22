package com.staxrt.tutorial.service;

import com.staxrt.tutorial.model.File1;
import org.springframework.web.multipart.MultipartFile;

public interface FileService1 {
    File1 storeFile(MultipartFile file);

    File1 getFile(String fileId);

}
