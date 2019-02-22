package com.staxrt.tutorial.controller;

import com.staxrt.tutorial.model.File1;
import com.staxrt.tutorial.model.UploadFileResponse1;
import com.staxrt.tutorial.service.FileService1;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("/file")
@Transactional
public class FileController1 {
    @Autowired
    FileService1 fileService1;
    private static final Logger logger = LoggerFactory.getLogger(FileController1.class);

    @PostMapping("/uploadFile")
    public UploadFileResponse1 uploadFile(@RequestParam("file") MultipartFile file) {
        File1 file1 = fileService1.storeFile(file);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(file1.getId())
                .toUriString();

        return new UploadFileResponse1(file1.getFileName(), fileDownloadUri,
                file.getContentType(), file.getSize());
    }
}
