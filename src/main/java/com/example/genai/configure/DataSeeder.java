package com.example.genai.configure;

import com.example.genai.model.Event;
import com.example.genai.repository.EventRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DataSeeder {

    private final EventRepository eventRepository;

    public DataSeeder(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @PostConstruct
    public void seedData() {
        if (eventRepository.count() == 0) {
            eventRepository.save(new Event("AI Workshop", "Auditorium", LocalDateTime.now().plusHours(3)));
            eventRepository.save(new Event("Cloud Summit", "Main Hall", LocalDateTime.now().plusDays(1)));
            eventRepository.save(new Event("Dev Meetup", "Room 12", LocalDateTime.now().plusDays(2)));
            System.out.println("✅ Sample events seeded successfully.");
        } else {
            System.out.println("ℹ️ Event data already exists, skipping seeding.");
        }
    }
}
