package com.example.genai.service;

import com.google.auth.oauth2.ServiceAccountCredentials;
import com.google.api.gax.paging.Page;
import com.google.cloud.bigquery.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.*;

@Service
public class BigQueryService {

    private final BigQuery bigQuery;

    public BigQueryService(
            @Value("${gcp.project-id}") String projectId,
            @Value("${gcp.credentials.path}") String credentialsPath) throws IOException {

        this.bigQuery = BigQueryOptions.newBuilder()
                .setProjectId(projectId)
                .setCredentials(ServiceAccountCredentials.fromStream(new FileInputStream(credentialsPath)))
                .build()
                .getService();
    }

    public BigQuery getBigQuery() {
        return bigQuery;
    }

    // ✅ List all datasets
    public List<String> listDatasets() {
        List<String> datasetNames = new ArrayList<>();
        Page<Dataset> datasets = bigQuery.listDatasets();
        if (datasets != null) {
            for (Dataset dataset : datasets.iterateAll()) {
                datasetNames.add(dataset.getDatasetId().getDataset());
            }
        }
        return datasetNames;
    }

    // ✅ Run SQL query and return results as a List of Maps (JSON-friendly)
    public List<Map<String, Object>> runQuery(String query) {
        List<Map<String, Object>> resultList = new ArrayList<>();

        try {
            QueryJobConfiguration queryConfig = QueryJobConfiguration.newBuilder(query).build();
            TableResult results = bigQuery.query(queryConfig);

            for (FieldValueList row : results.iterateAll()) {
                Map<String, Object> rowMap = new LinkedHashMap<>();

                for (Field field : results.getSchema().getFields()) {
                    FieldValue value = row.get(field.getName());
                    if (!value.isNull()) {
                        switch (field.getType().getStandardType()) {
                            case BOOL:
                                rowMap.put(field.getName(), value.getBooleanValue());
                                break;
                            case INT64:
                                rowMap.put(field.getName(), value.getLongValue());
                                break;
                            case FLOAT64:
                                rowMap.put(field.getName(), value.getDoubleValue());
                                break;
                            case TIMESTAMP:
                                rowMap.put(field.getName(), value.getTimestampValue());
                                break;
                            default:
                                rowMap.put(field.getName(), value.getStringValue());
                        }
                    } else {
                        rowMap.put(field.getName(), null);
                    }
                }
                resultList.add(rowMap);
            }

        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            resultList.add(Map.of("error", "Query interrupted: " + e.getMessage()));
        } catch (BigQueryException e) {
            resultList.add(Map.of("error", "BigQuery error: " + e.getMessage()));
        }

        return resultList;
    }
}
