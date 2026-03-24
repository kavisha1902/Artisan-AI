package com.example.genai.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
public class DBTestController {

    @Autowired
    private DataSource dataSource;

    @GetMapping("/test-db")
    public String testDb() {
        try (var conn = dataSource.getConnection()) {
            return "Connected to DB: " + conn.getMetaData().getURL();
        } catch (Exception e) {
            return "Connection failed: " + e.getMessage();
        }
    }
}
