package com.staxrt.tutorial.repository;

import com.staxrt.tutorial.model.Sach;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin(origins = "http://localhost:4200")
public interface SachReposistory extends JpaRepository<Sach, Long> {
}
