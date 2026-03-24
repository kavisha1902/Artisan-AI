package com.example.genai.model;

public class AiRequest {
    private String prompt;
    private String mode; // "document" or "advisor"

    public AiRequest() { }
    public AiRequest(String prompt, String mode) { this.prompt = prompt; this.mode = mode; }

    public String getPrompt() { return prompt; }
    public void setPrompt(String prompt) { this.prompt = prompt; }

    public String getMode() { return mode; }
    public void setMode(String mode) { this.mode = mode; }
}
