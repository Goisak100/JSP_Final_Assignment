package com.example.demo.repository;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Order;
import com.example.demo.model.OrderDetail;

@Repository
public class OrderRepository {
    private final JdbcTemplate jdbcTemplate;

    public OrderRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // 최대한 명명규칙 지켜보려고 함
    public void insertOrder(String userId, String address, String addressDetail, String phoneNumber) {
        String sql = "insert into orders(user_id, address, address_detail, phone_number) values(?, ?, ?, ?)";
        jdbcTemplate.update(sql, new Object[]{userId, address, addressDetail, phoneNumber});
    }

    public void insertOrderDetail(String userId) {
        String sql = "insert into orders_detail(order_id, user_id, book_id, quantity)" + 
                    " select o.id, c.user_id, c.book_id, c.quantity" + 
                    " from cart as c" +
                    " inner join orders as o on o.user_id = c.user_id" + 
                    " where o.id = (select max(id) from orders)";
        jdbcTemplate.update(sql);
    }

    // sql문 잘못 작성함
    // 책의 종류를 파악하는 방식으로 집어넣어야 하는데,
    // 가장 많은 quantity를 반환해버림
    public List<Order> getAllOrders(String userId) {
        String sql = "select t.order_id, t.user_id, t.name, t.total_price, t.total_quantity" +
                    " from(" +
                        " select od.order_id, od.user_id, b.name," +
                            " sum(b.price * od.quantity) as total_price," +
                            " sum(od.quantity) as total_quantity," +
                            " row_number() over (partition by od.order_id order by sum(b.price) desc) as rn" +
                        " from orders_detail as od" + 
                        " inner join books as b on b.id = od.book_id" +
                        " where od.user_id = ?" +
                        " group by od.order_id, od.user_id, b.name" +
                    ") as t" +
                    " where t.rn = 1";
        List<Order> result = jdbcTemplate.query(sql, (rs, rowNum) -> {
            return new Order(
                rs.getInt("order_id"),
                rs.getString("user_id"),
                rs.getString("name"),
                rs.getInt("total_price"),
                rs.getInt("total_quantity")
            );
        }, new Object[] {userId});

        return result;
    }

    public List<OrderDetail> getOrderDetails(int orderId) {
        String sql = "select b.name, b.author, b.translator, b.price, od.quantity" + 
                    " from orders_detail as od" + 
                    " inner join books as b on b.id = od.book_id" + 
                    " where od.order_id = ?";
        List<OrderDetail> result = jdbcTemplate.query(sql, (rs, rowNum) -> {
            return new OrderDetail(
                rs.getString("name"),
                rs.getString("author"),
                rs.getString("translator"),
                rs.getInt("price"),
                rs.getInt("quantity")
            );
        }, orderId);

        return result;
    }
}