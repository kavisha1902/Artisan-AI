package com.example.genai.controller;

import com.example.genai.service.BigQueryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bigquery")
@CrossOrigin(origins = "*")
public class BigQueryController {

    private final BigQueryService bigQueryService;

    public BigQueryController(BigQueryService bigQueryService) {
        this.bigQueryService = bigQueryService;
    }

    // ✅ List datasets
    @GetMapping("/datasets")
    public List<String> getDatasets() {
        return bigQueryService.listDatasets();
    }

    // ✅ Run SQL query
    @PostMapping("/query")
    public ResponseEntity<List<Map<String, Object>>> runQuery(@RequestBody String query) {
        List<Map<String, Object>> result = bigQueryService.runQuery(query);
        return ResponseEntity.ok(result);
    }

}
