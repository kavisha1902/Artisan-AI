package com.example.genai.model;

public class AiResponse {
    private String output;

    public AiResponse() {}
    public AiResponse(String output) { this.output = output; }

    public String getOutput() { return output; }
    public void setOutput(String output) { this.output = output; }
}
