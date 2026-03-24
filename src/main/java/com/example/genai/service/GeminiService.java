package com.example.genai.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public String generateText(String prompt, String mode) {
        String systemPrefix;
        if ("advisor".equalsIgnoreCase(mode)) {
            systemPrefix = "You are an expert business advisor. Provide: " +
                    "1) short summary, 2) Key tips. " +
                    "Format as sections with headings.";
        } else { // document
            systemPrefix = "You are a professional document generator. Format output as: Title, Introduction, Sections with headings and bullet points, Conclusion. Keep it clear and concise.";
        }

        String finalPrompt = systemPrefix + "\n\nUser prompt:\n" + prompt;

        String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey;

        Map<String, Object> content = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(Map.of("text", finalPrompt)))
                )
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(content, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);
            if (response.getBody() != null) {
                Map<String, Object> body = response.getBody();
                List<Map<String, Object>> candidates = (List<Map<String, Object>>) body.get("candidates");
                if (candidates != null && !candidates.isEmpty()) {
                    Map<String,Object> contentMap = (Map<String,Object>) candidates.get(0).get("content");
                    List<Map<String,Object>> parts = (List<Map<String,Object>>) contentMap.get("parts");
                    return (String) parts.get(0).get("text");
                }
            }
            return "No response text from Gemini.";
        } catch (Exception e) {
            return "Error calling Gemini API: " + e.getMessage();
        }
    }
}
