package com.ryota.hello.mapper;

import com.ryota.hello.dto.PropertyResponse;
import com.ryota.hello.entity.Property;
import org.springframework.stereotype.Component;

@Component
public class PropertyMapper {

    public PropertyResponse toResponse(Property property) {

        PropertyResponse res = new PropertyResponse();

        res.setId(property.getId());
        res.setName(property.getName());
        res.setAddress(property.getAddress());
        res.setRent(property.getRent());
        res.setStatus(property.getStatus());

        if(property.getOwner() != null){
            res.setOwnerId(property.getOwner().getId());
        }

        return res;
    }

}