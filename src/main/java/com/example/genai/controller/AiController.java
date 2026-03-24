package com.example.genai.controller;

import com.example.genai.model.AiRequest;
import com.example.genai.model.AiResponse;
import com.example.genai.service.GeminiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")

public class AiController {

    private final GeminiService geminiService;

    public AiController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping("/generate")
    public ResponseEntity<AiResponse> generateText(@RequestBody AiRequest request) {
        String mode = request.getMode() == null ? "document" : request.getMode();
        String output = geminiService.generateText(request.getPrompt(), mode);
        return ResponseEntity.ok(new AiResponse(output));
    }
}
