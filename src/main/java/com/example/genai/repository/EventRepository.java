package com.example.genai.repository;

import com.example.genai.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    // JPA query method for the scheduler and controller
    List<Event> findByEventDateBetween(LocalDateTime start, LocalDateTime end);
}
