package com.ryota.hello.dto;

import lombok.Data;

@Data
public class PropertyResponse {

    private Long id;
    private String name;
    private String address;
    private Integer rent;
    private String status;
    private Long ownerId;

}