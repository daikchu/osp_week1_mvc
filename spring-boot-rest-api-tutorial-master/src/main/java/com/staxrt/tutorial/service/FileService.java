package com.staxrt.tutorial.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileService {

    Long saveFile(MultipartFile files, String path) throws IOException;



}