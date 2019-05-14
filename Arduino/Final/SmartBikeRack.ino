#include <ArduinoJson.h>
#include <AWS_IOT.h>
#include <WiFi.h>
#include <Servo.h>

static const int servoPin = 2;

Servo servo1;

AWS_IOT hornbill;

char WIFI_SSID[] = "Redmi";
char WIFI_PASSWORD[] = "pater2215";
char HOST_ADDRESS[] = "a1i9pgad4051ff-ats.iot.us-east-1.amazonaws.com";
char CLIENT_ID[] = "arn:aws:iot:us-east-1:693535435238:policy/myTestThing";
char TOPIC_NAME[] = "arn:aws:iot:us-east-1:693535435238:thing/myTestThing";


int status = WL_IDLE_STATUS;
int tick = 0, msgCount = 0, msgReceived = 0;
char payload[512];
char rcvdPayload[512];
int bike_curr_state = 1;


void mySubCallBackHandler (char *topicName, int payloadLen, char *payLoad)
{
  strncpy(rcvdPayload, payLoad, payloadLen);
  rcvdPayload[payloadLen] = 0;
  msgReceived = 1;
}



void setup() {
  Serial.begin(115200);
  delay(2000);
  servo1.attach(servoPin);
  
  servo1.write(90);
  
  while (status != WL_CONNECTED)
  {
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(WIFI_SSID);
    // Connect to WPA/WPA2 network. Change this line if using open or WEP network:
    status = WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

    // wait 5 seconds for connection:
    delay(5000);
  }

  Serial.println("Connected to wifi");

  if (hornbill.connect(HOST_ADDRESS, CLIENT_ID) == 0)
  {
    Serial.println("Connected to AWS");
    delay(1000);

    if (0 == hornbill.subscribe(TOPIC_NAME, mySubCallBackHandler))
    {
      Serial.println("Subscribe Successful");
    }
    else
    {
      Serial.println("Subscribe Failed, Check the Thing Name and Certificates");
      while (1);
    }
  }
  else
  {
    Serial.println("AWS connection failed, Check the HOST Address");
    while (1);
  }

  delay(2000);

}

void loop() {
  servo1.attach(servoPin);

  // char JSONMessage[] = " {\"SensorType\": \"Temperature\", \"Value\": 10} ";

  if (msgReceived == 1)
  {
    msgReceived = 0;
    Serial.print("Received Message:");
    Serial.println(rcvdPayload);

    StaticJsonDocument<600> doc;
    
    // DeserializationError error = deserializeJson(doc, JSONMessage);
    DeserializationError error = deserializeJson(doc, rcvdPayload);
  
    if (error) {
      Serial.println("hello");
      Serial.println(error.c_str());
    }

    bool lockStatus = doc["lock_status"];
    //int devId = doc["devId"];
    int rackId = doc["rackId"];
    
    //Serial.println(devId);
    Serial.println(rackId);
    Serial.println(lockStatus);
    Serial.println(bike_curr_state);
    if (bike_curr_state != lockStatus && lockStatus == 1) {
        bike_curr_state = 1;
        lock_state();
    }
    else if (bike_curr_state != lockStatus && lockStatus == 0) {
        bike_curr_state = 0;
        unlock_state();
    }
    delay(5000);

    
  }
/*
  if (tick >= 5)  // publish to topic every 5seconds
  {
    tick = 0;
    sprintf(payload, "Hello from hornbill ESP32 : %d", msgCount++);
    if (hornbill.publish(TOPIC_NAME, payload) == 0)
    {
      Serial.println(TOPIC_NAME);
      Serial.print("Publish Message:");
      Serial.println(payload);
      for (int posDegrees = 180; posDegrees >= 0; posDegrees--) {
        servo1.write(posDegrees);
        delay(10);
        if (posDegrees == 0) {
          Serial.println("False");
        }
      }
    }
    else
    {
      Serial.println("Publish failed");
    }
  }
  vTaskDelay(1000 / portTICK_RATE_MS);
  tick++;
*/
}

void lock_state() {
  Serial.println("Lock");
  for (int posDegrees = 0; posDegrees <= 90; posDegrees++) {
    servo1.writeMicroseconds(posDegrees);
    delay(10);
    if (posDegrees == 90) {
      servo1.detach();
      Serial.print(posDegrees);
    }
  }
}

void unlock_state() {
  Serial.println("Unlock");
  for (int posDegrees = 180; posDegrees >= 90; posDegrees--) {
    servo1.write(posDegrees);
    delay(10);
    if (posDegrees == 90) {
      servo1.detach();
      Serial.print(posDegrees);
    }
  }
}
