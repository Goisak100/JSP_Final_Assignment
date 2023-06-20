package com.example.demo.repository;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.example.demo.model.UserInformation;

@Repository
public class UserInformationRepository {
    private JdbcTemplate jdbcTemplate;

    public UserInformationRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<UserInformation> rowMapper = (rs, rowNum) -> {
        return new UserInformation(
            rs.getString("user_id"),
            rs.getString("address"),
            rs.getString("address_detail"),
            rs.getString("phone_number")
        );
    };

    public ResponseEntity<UserInformation> findUserInformationById(String userId) {
        String sql = "select * from users_information where user_id = ?";
        try {
            UserInformation userInformation = jdbcTemplate.queryForObject(sql, rowMapper, userId); 
            return ResponseEntity.ok().body(userInformation);
        } catch (EmptyResultDataAccessException ex) {
            ex.printStackTrace();
            return ResponseEntity.notFound().build();
        }
    }

    public void updateUserInformationById(UserInformation userInformation) {
        String sql = "update users_information set address = ?, address_detail = ?, phone_number = ? where user_id = ?";
        jdbcTemplate.update(sql,
            userInformation.getAddress(),
            userInformation.getAddressDetail(),
            userInformation.getPhoneNumber(),
            userInformation.getUserId());
    }

    public void insertUesrInformation(UserInformation userInformation) {
        String sql = "insert into users_information values(?, ?, ?, ?)";
        jdbcTemplate.update(sql,
            userInformation.getUserId(),
            userInformation.getAddress(),
            userInformation.getAddressDetail(),
            userInformation.getPhoneNumber());
    }

    public boolean isExistsUserInformation(UserInformation userInformation) {
        String sql = "select user_id from users_information where user_id = ?"; 
        try {
            jdbcTemplate.queryForObject(sql, (rs, rowNum) -> {
                return rs.getString("user_id");
            }, userInformation.getUserId());
            return true;
        } catch (EmptyResultDataAccessException ex) {
            return false;
        }
    }

     public UserInformation getUserInformationByOrderId(int orderId) {
        String sql = "select user_id, address, address_detail, phone_number from orders where id = ?";
        UserInformation result = jdbcTemplate.queryForObject(sql, rowMapper, orderId);
        return result;
    }
}