package com.staxrt.tutorial.model;

/*import lombok.Data;*/

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;
/*import lombok.*;*/

/*@Data*/

@Entity
@Table(name = "sach")
@EntityListeners(AuditingEntityListener.class)
public class Sach {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ten;
    private String mota;
    private Date namxb;
    private String file;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTen() {
        return ten;
    }

    public void setTen(String ten) {
        this.ten = ten;
    }

    public String getMota() {
        return mota;
    }

    public void setMota(String mota) {
        this.mota = mota;
    }

    public Date getNamxb() {
        return namxb;
    }

    public void setNamxb(Date namxb) {
        this.namxb = namxb;
    }


    public String getFile() {
        return file;
    }

    public void setFile(String file) {
        this.file = file;
    }
}
