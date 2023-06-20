package com.example.demo.repository;


import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.example.demo.model.CartDetail;

@Repository
public class CartDetailRepository {
    private final JdbcTemplate jdbcTemplate;

    public CartDetailRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<CartDetail> rowMapper = (result, rowNumber) -> {
        return new CartDetail(
            result.getInt("id"),
            result.getString("imageUrl"),
            result.getString("name"),
            result.getInt("price"),
            result.getInt("quantity")
        );
    };

    public ResponseEntity<List<CartDetail>> findCartDetailById(String user_id) {
        String sql = "select c.id, b.imageUrl, b.name, b.price, c.quantity "
                    + " from (select * from cart where user_id = ?) as c "
                    + " inner join books as b on b.id = c.book_id";
        List<CartDetail> result = jdbcTemplate.query(sql, rowMapper, user_id);
        return ResponseEntity.ok().body(result);
    }

    public void insertCartDetail(String user_id, int book_id, int quantity) {
        String sql = "insert into cart(user_id, book_id, quantity) values(?, ?, ?)";
        jdbcTemplate.update(sql, user_id, book_id, quantity);
    }

    public void updateQuantityByCount(int item_id, int count) {
        String sql = "update cart set quantity = ? where id =?";
        jdbcTemplate.update(sql, count, item_id);
    }

    public boolean isExistsForID(String user_id, int book_id) {
        String sql = "select user_id from cart where user_id = ? and book_id = ?";
        List<String> userIds = jdbcTemplate.query(sql, (resultSet, rowNumber) -> {
            return resultSet.getString("user_id");
        }, user_id, book_id);
        
        return !userIds.isEmpty();
    }

    public void deleteCartById(String user_id, int item_id) {
        String sql = "delete from cart where user_id = ? and id = ?";
        jdbcTemplate.update(sql, user_id, item_id);    
    }

    public ResponseEntity<Integer> totalPrice(String user_id) {
        String sql = "select sum(c.quantity * b.price) as total from cart as c inner join books as b on b.id = c.book_id where c.user_id = ?";
        Integer total = jdbcTemplate.queryForObject(sql, (rs, rowNum) -> {
            return rs.getInt("total");
        }, user_id);
        
        return ResponseEntity.ok().body(total);
    }

    // 얘는 Order에서 같이 사용한다. (같이 묶어야 하나?)
    public void deleteCartById(String userId) {
        String sql = "delete from cart where user_id = ?";
        jdbcTemplate.update(sql, new Object[] {userId});
    }
}