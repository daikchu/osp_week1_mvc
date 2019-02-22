package com.staxrt.tutorial.model;

public class UploadResponse {
    private String url;

    private String fileName;

    private String fileContentType;

    private Boolean status;

    public UploadResponse() {}

    public UploadResponse(String url, String fileName, Boolean status, String fileContentType) {
        this.url = url;
        this.status = status;
        this.fileName = fileName;
        this.fileContentType = fileContentType;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileContentType() {
        return fileContentType;
    }

    public void setFileContentType(String fileContentType) {
        this.fileContentType = fileContentType;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }
}
