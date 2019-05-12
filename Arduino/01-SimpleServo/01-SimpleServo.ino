#include <Servo.h>

static const int servoPin = 2;

Servo servo1;

void setup() {
    Serial.begin(115200);
    servo1.attach(servoPin);
}

void loop() {
    for(int posDegrees = 0; posDegrees <= 180; posDegrees++) {
        servo1.write(posDegrees);
        delay(10);
        if(posDegrees == 180){
          Serial.println("True");
        }
    }
    for(int posDegrees = 180; posDegrees >= 0; posDegrees--) {
        servo1.write(posDegrees);
        delay(10);
        if(posDegrees == 0){
          Serial.println("False");
        }
    }
}
