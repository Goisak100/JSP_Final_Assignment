package com.example.demo.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.example.demo.model.User;

@Repository
public class UserRepository {
    
    private final JdbcTemplate jdbcTemplate;

    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<User> rowMapper = (result, rowNumber) -> {
        return new User(
            result.getString("id"),
            result.getString("password")
        );
    };

    public User findUserById(String id) {
        String sql = "select * from users where id = ?";
        return jdbcTemplate.queryForObject(sql, rowMapper, id);
    }

    public void insertUser(User user) {
        String sql = "insert into users(id, password) values(?, ?)";
        jdbcTemplate.update(sql, new Object[]{user.getId(), user.getPassword()});
    }
}