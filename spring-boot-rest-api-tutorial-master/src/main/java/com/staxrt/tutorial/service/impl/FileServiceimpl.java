package com.staxrt.tutorial.service.impl;

import com.staxrt.tutorial.service.FileService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileServiceimpl implements FileService {
    @Override
    public Long saveFile(MultipartFile file, String path) throws IOException {
        if (file.isEmpty()) {
            throw new RuntimeException("File is empty");
        }
        Path location = Paths.get(path);
        if (Files.notExists(location)) {
            new File(location.toString()).mkdirs();
        }
        return Files.copy(file.getInputStream(),
                location.resolve(file.getOriginalFilename()),
                StandardCopyOption.REPLACE_EXISTING);
    }
}
