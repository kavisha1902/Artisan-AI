package com.example.genai.notification;

import com.example.genai.model.Event;
import com.example.genai.service.EventService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Component
public class EventScheduler {

    private final EventService eventService;
    private final NotificationService notificationService;

    public EventScheduler(EventService eventService, NotificationService notificationService) {
        this.eventService = eventService;
        this.notificationService = notificationService;
    }

    // runs every hour at minute 0
    @Scheduled(cron = "0 0 * * * *")
    public void checkUpcomingEvents() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime in24h = now.plusHours(24);

        List<Event> upcoming = eventService.getEventsBetween(now, in24h);
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

        for (Event ev : upcoming) {
            String msg = String.format("Reminder: '%s' at %s, location: %s",
                    ev.getTitle(),
                    ev.getEventDate().format(fmt),
                    ev.getLocation() == null ? "N/A" : ev.getLocation());

            try {
                notificationService.sendNotification(msg);
                System.out.println("Notification sent: " + msg);
            } catch (Exception e) {
                System.err.println("Failed to send notification: " + e.getMessage());
            }
        }
    }
}
