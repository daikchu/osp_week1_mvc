/*
package com.staxrt.tutorial.controller;

import com.staxrt.tutorial.config.StorageProperties;
import com.staxrt.tutorial.model.UploadResponse;
import com.staxrt.tutorial.service.FileService;
//import org.apache.tomcat.util.http.ResponseUtil;
//import org.apache.tomcat.util.http.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.staxrt.tutorial.config.Constanst;
import com.staxrt.tutorial.config.Constanst.FolderLocation;;
import com.staxrt.tutorial.config.Constanst.FolderName;;import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/file")
@Transactional
public class FileController {


    private final FileService fileService;
   */
/* @Autowired StorageProperties storageProperties;*//*

    private final StorageProperties storageProperties;

    public FileController(FileService fileService, StorageProperties storageProperties) {
        this.fileService = fileService;
        this.storageProperties = storageProperties;
    }


    @PostMapping("/upload")
    public UploadResponse uploadFile(@RequestParam MultipartFile file, @RequestParam String location) {
        StringBuilder path = new StringBuilder();

        // root folder: upload
        path.append(Constanst.FolderName.FOLDER_ROOT).append("/");

        // choose next folder
        String nextFolder;
        Integer lo = Integer.parseInt(location);
        if (lo.equals(FolderLocation.LOCATION_TEMP)) {
            nextFolder = FolderName.FOLDER_TEMP;
        } else if (lo.equals(FolderLocation.LOCATION_CABINET)) {
            nextFolder = FolderName.FOLDER_CABINET;
        } else if (lo.equals(FolderLocation.LOCATION_PHYS_ACES)) {
            nextFolder = FolderName.FOLDER_PHYS_ACES;
        } else if (lo.equals(FolderLocation.LOCATION_DOCS)) {
            nextFolder = FolderName.FOLDER_DOCS;
        } else if (lo.equals(FolderLocation.LOCATION_HANDOVER_DOCS)) {
            nextFolder = FolderName.FOLDER_HANDOVER_DOCS;
        } else if (lo.equals(FolderLocation.LOCATION_LAYOUTS)) {
            nextFolder = FolderName.FOLDER_LAYOUTS;
        } else if (lo.equals(FolderLocation.LOCATION_ROUTINE)) {
            nextFolder = FolderName.FOLDER_ROUTINE;
        } else if (lo.equals(FolderLocation.LOCATION_PERSONAL)) {
            nextFolder = FolderName.FOLDER_PERSONAL;
        } else {
            nextFolder = FolderName.FOLDER_OTHER;
        }

        // append next folder
        path.append(nextFolder).append("/");

//        // append user
//        String user = SecurityUtils.getCurrentUserLogin().isPresent() ? SecurityUtils.getCurrentUserLogin().get()
//                : "user";
//        path.append(user).append("/");

        // append current time
        path.append(Long.toString(System.currentTimeMillis()));

        UploadResponse response = null;
        String pathFile = path.toString();
        try {
            fileService.saveFile(file, pathFile);
            response = new UploadResponse();
            response.setUrl(pathFile + "/" + file.getOriginalFilename());
            response.setFileName(file.getOriginalFilename());
            response.setStatus(true);
            response.setFileContentType(file.getContentType());

        } catch (IOException e) {

            e.printStackTrace();
        }
        return new UploadResponse();
    }
}
*/
