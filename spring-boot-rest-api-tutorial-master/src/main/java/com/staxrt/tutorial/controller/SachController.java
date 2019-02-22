package com.staxrt.tutorial.controller;

import com.staxrt.tutorial.exception.ResourceNotFoundException;
import com.staxrt.tutorial.model.Sach;
import com.staxrt.tutorial.model.User;
import com.staxrt.tutorial.repository.SachReposistory;
import com.staxrt.tutorial.util.PaginationUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/sach")
public class SachController {
    @Autowired
    SachReposistory sachReposistory;

//    @GetMapping("/all")
//    public List<Sach> getAll() {
//        System.out.println("chu quang dai");
//        /*Sach sach = new Sach()*/
//        return sachReposistory.findAll();
//    }

    @GetMapping("/all")
    public ResponseEntity<Page<Sach>> getAll(Pageable pageable) {
        Page<Sach> page = sachReposistory.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/sach/all");
        return new ResponseEntity<>(page, headers, HttpStatus.OK);
    }

    @GetMapping("/one/{id}")
    public ResponseEntity<Sach> getOne(@PathVariable Long id) throws ResourceNotFoundException{
        Sach sach =
                sachReposistory
                        .findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("not found on :: " + id));
        return ResponseEntity.ok().body(sach);
    }

    @PostMapping("/create")
    public Sach create(@Valid @RequestBody Sach sach) {

        return sachReposistory.save(sach);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Sach> updateUser(
            @PathVariable(value = "id") Long id, @Valid @RequestBody Sach sach)
            throws ResourceNotFoundException {

        Sach bookFound =
                sachReposistory
                        .findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Sach not found on :: " + id));

       bookFound.setTen(sach.getTen());
       bookFound.setMota(sach.getMota());
        final Sach bookUpdate = sachReposistory.save(bookFound);
        return ResponseEntity.ok(bookUpdate);
    }

    @DeleteMapping("/delete/{sach_id}")
    public Map<String, Boolean> deleteUser(@PathVariable(value = "sach_id") Long id) throws Exception {
        Sach sach =
                sachReposistory
                        .findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("not found on :: " + id));

        sachReposistory.delete(sach);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }



}
