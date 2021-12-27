#include <Adafruit_NeoPixel.h>
#include <ArduinoJson.h>
#ifdef __AVR__
 #include <avr/power.h>
#endif

#define LED_PIN     11
#define LED_PIN2    12
#define LED_COUNT   150
#define SPEED 1
#define Switch1     3
#define Switch2     4
#define Switch3     5
#define Switch4     6
#define brightness  190

Adafruit_NeoPixel strip(LED_COUNT, LED_PIN, NEO_GRB + NEO_KHZ800);

int redMode1 = 0;
int greenMode1 = 0;
int blueMode1 = 0;

int redMode2 = 0;
int greenMode2 = 0;
int blueMode2 = 0;

int redMode3 = 0;
int greenMode3 = 0;
int blueMode3 = 0;

const unsigned int MAX_MESSAGE_LENGTH =300;
bool ValSwitch1 = 0;
bool ValSwitch2 = 0;
bool ValSwitch3 = 0;
bool ValSwitch4 = 0;

int clkPin  = 7;
int dtPin  = 9;
int swPin  = 8;

int rotVal  = 0;
bool clkState  = LOW;
bool clkLast  = HIGH;
bool swState  = HIGH;
bool swLast  = HIGH;

void setup() {
  Serial.begin(9600);
  #if defined(__AVR_ATtiny85__) && (F_CPU == 16000000)
    clock_prescale_set(clock_div_1);
  #endif
  pinMode(clkPin,INPUT);
  pinMode(dtPin,INPUT);
  pinMode(swPin,INPUT_PULLUP);
  pinMode(LED_PIN2,OUTPUT);
  digitalWrite(LED_PIN2,HIGH);
  strip.begin();           // INITIALIZE NeoPixel strip object (REQUIRED)
  strip.show();            // Turn OFF all pixels ASAP
  strip.setBrightness(brightness); // Set BRIGHTNESS to about 1/5 (max = 255)
}
/*void readRotary( ) {
  clkState = digitalRead(clkPin);
  if ((clkLast == LOW) && (clkState == HIGH)) {//rotary moving
    if (digitalRead(dtPin) == HIGH) {
      rotVal++;
      if ( rotVal > 10 ) {
        rotVal = 10;
      }
    }
    else {
      rotVal--;
      if ( rotVal <0 ) {
        rotVal = 0;
      }
    }
    strip.setBrightness(rotVal*25.5);
    Serial.println(rotVal);
  }
  clkLast = clkState;

  swState = digitalRead(swPin);
  if (swState == LOW && swLast == HIGH) {
    rotVal = 5;
  }
  swLast = swState;
}*/
void colorWipe(uint32_t color, int wait) {
  for(int i=0; i<strip.numPixels(); i++) { // For each pixel in strip...
    strip.setPixelColor(i, color);         //  Set pixel's color (in RAM)
    strip.show();                          //  Update strip to match
    delay(wait);                           //  Pause for a moment
  }
}
void switch_effect(bool s1, bool s2, bool s3, bool s4){
  if(s1){
    colorWipe(strip.Color(redMode1,greenMode1,blueMode1), SPEED);
  }
  if(s2){
    colorWipe(strip.Color(redMode2,greenMode2,blueMode2), SPEED);
  }
  if(s3){
    colorWipe(strip.Color(redMode3,greenMode3,blueMode3), SPEED);
  }
  if(s4){
    for(long firstPixelHue = 0; firstPixelHue < 5*65536; firstPixelHue += 256) {
      for(int i=0; i<strip.numPixels(); i++) { // For each pixel in strip...
        int pixelHue = firstPixelHue + (i * 65536L / strip.numPixels());
        strip.setPixelColor(i, strip.gamma32(strip.ColorHSV(pixelHue)));
      }
      ValSwitch4 = digitalRead(Switch4);
      if(ValSwitch4==0){
        break;
      }
      strip.show(); // Update strip with new contents
      delay(50);  // Pause for a moment
    }
  }
}
void loop() {
 //Check to see if anything is available in the serial receive buffer
 //readRotary();
 ValSwitch1 = digitalRead(Switch1);
 ValSwitch2 = digitalRead(Switch2);
 ValSwitch3 = digitalRead(Switch3);
 ValSwitch4 = digitalRead(Switch4);
 switch_effect(ValSwitch1, ValSwitch2, ValSwitch3, ValSwitch4);
 //readRotary();
 while (Serial.available() > 0)
 {
   //Create a place to hold the incoming message
   static char message[MAX_MESSAGE_LENGTH];
   static unsigned int message_pos = 0;

   //Read the next available byte in the serial receive buffer
   char inByte = Serial.read();

   //Message coming in (check not terminating character) and guard for over message size
   if ( inByte != '\n' && (message_pos < MAX_MESSAGE_LENGTH - 1) )
   {
     //Add the incoming byte to our message
     message[message_pos] = inByte;
     message_pos++;
   }
   //Full message received...
   else
   {
     //Add null character to string
     message[message_pos] = '\0';     
      DynamicJsonDocument doc(200);
      DeserializationError error = deserializeJson(doc, message);
      if(!error){
        String titre = doc["TITLE"];
        int mode = doc["MODE"];
        switch(mode){
           case 1:
               redMode1 = doc["RED"];
               greenMode1 = doc["GREEN"];
               blueMode1 = doc["BLUE"];
           case 2:
               redMode2 = doc["RED"];
               greenMode2 = doc["GREEN"];
               blueMode2 = doc["BLUE"];
           case 3:
               redMode3 = doc["RED"];
               greenMode3 = doc["GREEN"];
               blueMode3 = doc["BLUE"];
            }
        /*
        if (titre=="COLOR"){
            Serial.println("here");
            int mode = doc["MODE"];
            switch(mode){
               case 1:
                    redMode1 = doc["RED"];
                    greenMode1 = doc["GREEN"];
                    blueMode1 = doc["BLUE"];
               case 2:
                    redMode2 = doc["RED"];
                    greenMode2 = doc["GREEN"];
                    blueMode2 = doc["BLUE"];
               case 3:
                    redMode3 = doc["RED"];
                    greenMode3 = doc["GREEN"];
                    blueMode3 = doc["BLUE"];
            }
        }*/
        //Serial.println(red);
      } else{
        Serial.print("erreur");
        //Serial.print(error.f_str());
        //Serial.println(doc.capacity());
      }
     /*if (strcmp(red,"255")  == 0){
        colorWipe(strip.Color(0,   50,   0), 50); // Red
     }*/
     //Reset for the next message
     message_pos = 0;
   }
 }
}
