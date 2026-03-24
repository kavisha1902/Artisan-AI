package com.example.genai.notification;

import com.google.cloud.pubsub.v1.Publisher;
import com.google.pubsub.v1.ProjectTopicName;
import com.google.pubsub.v1.PubsubMessage;
import com.google.protobuf.ByteString;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    private static final String PROJECT_ID = "driven-copilot-476308-n5";
    private static final String TOPIC_ID = "ngo-event-notifications";

    public void sendNotification(String messageText) throws Exception {
        ProjectTopicName topicName = ProjectTopicName.of(PROJECT_ID, TOPIC_ID);

        Publisher publisher = null;
        try {
            publisher = Publisher.newBuilder(topicName).build();
            ByteString data = ByteString.copyFromUtf8(messageText);
            PubsubMessage pubsubMessage = PubsubMessage.newBuilder().setData(data).build();
            publisher.publish(pubsubMessage);
        } finally {
            if (publisher != null) {
                publisher.shutdown();
                publisher.awaitTermination(1, java.util.concurrent.TimeUnit.MINUTES);
            }
        }
    }
}
