package com.example.genai.service;

import com.example.genai.model.Event;
import com.example.genai.repository.EventRepository;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    private final EventRepository eventRepository;


    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }


    public Event saveEvent(Event event) {
        return eventRepository.save(event);
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public List<Event> getEventsBetween(LocalDateTime start, LocalDateTime end) {
        return eventRepository.findByEventDateBetween(start, end);
    }

    public Event getEventById(Long id) {
        return eventRepository.findById(id).orElse(null);
    }

    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }
}
