package com.ryota.hello.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "properties")
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;      // 物件名
    private String address;   // 住所
    private Integer rent;     // 家賃
    private String status;    // 空室 / 入居中

    @ManyToOne
    @JoinColumn(name = "owner_id")
    @JsonIgnore
    private User owner;

}