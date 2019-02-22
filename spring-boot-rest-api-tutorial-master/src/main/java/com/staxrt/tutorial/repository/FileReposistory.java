package com.staxrt.tutorial.repository;

import com.staxrt.tutorial.model.File1;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileReposistory extends JpaRepository<File1, String> {

}
