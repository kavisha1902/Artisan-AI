package com.example.genai.controller;

import com.example.genai.model.Event;
import com.example.genai.service.EventService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    // ✅ Get all events
    @GetMapping
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
    }

    // ✅ Create a new event
    @PostMapping
    public Event createEvent(@RequestBody Event event) {
        return eventService.saveEvent(event);
    }

    // ✅ Get events between two dates (e.g. upcoming)
    @GetMapping("/between")
    public List<Event> getEventsBetween(
            @RequestParam("start") String start,
            @RequestParam("end") String end
    ) {
        LocalDateTime startDate = LocalDateTime.parse(start);
        LocalDateTime endDate = LocalDateTime.parse(end);
        return eventService.getEventsBetween(startDate, endDate);
    }

    // ✅ Get single event by ID
    @GetMapping("/{id}")
    public Event getEventById(@PathVariable Long id) {
        return eventService.getEventById(id);
    }

    // ✅ Delete event
    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
    }
}
