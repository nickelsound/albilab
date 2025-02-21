#include <Wire.h>
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>


const char* ssid     = "";   // The SSID (name) of the Wi-Fi network you want to connect to
const char* password = "";     // The password of the Wi-Fi network

#define HTTP_REST_PORT 8080
ESP8266WebServer server(HTTP_REST_PORT);

uint8_t middle_PIN = D1;
uint8_t left_PIN = D2;
uint8_t right_PIN = D5;
uint8_t up_PIN = D6;
uint8_t down_PIN = D7;


void setup() {
  // zahájení komunikace po sériové lince
  Serial.begin(9600);


  pinMode(middle_PIN, OUTPUT);
  digitalWrite(middle_PIN, HIGH); 

  pinMode(left_PIN, OUTPUT);
  digitalWrite(left_PIN, HIGH);

  pinMode(right_PIN, OUTPUT);
  digitalWrite(right_PIN, HIGH);

  pinMode(up_PIN, OUTPUT);
  digitalWrite(up_PIN, HIGH);

  pinMode(down_PIN, OUTPUT);
  digitalWrite(down_PIN, HIGH);

  delay(10);
  WiFi.begin(ssid, password);             // Connect to the network
  Serial.print("Connecting to ");
  Serial.print(ssid); Serial.println(" ...");

  int i = 0;
  while (WiFi.status() != WL_CONNECTED) { // Wait for the Wi-Fi to connect
    delay(1000);
    Serial.print(++i); Serial.print(' ');
  }

  Serial.println('\n');
  Serial.println("Connection established!");  
  Serial.print("IP address:\t");
  Serial.println(WiFi.localIP());         // Send the IP address of the ESP8266 to the computer

  restServerRouting();
  server.begin();

}

void loop() {
 
  server.handleClient();

}

void restServerRouting() {
    server.on("/run-stop", HTTP_GET, []() {


        digitalWrite(middle_PIN, LOW);
        delay(100);
        
        digitalWrite(middle_PIN, HIGH);

        delay(100);
      
        server.send(200, F("text/html"),
            F("RUN/STOP"));
    });

    server.on("/left", HTTP_GET, []() {


        digitalWrite(left_PIN, LOW);
        delay(100);
        
        digitalWrite(left_PIN, HIGH);

        delay(100);
      
        server.send(200, F("text/html"),
            F("LEFT"));
    });

    server.on("/right", HTTP_GET, []() {


        digitalWrite(right_PIN, LOW);
        delay(100);
        
        digitalWrite(right_PIN, HIGH);

        delay(100);
      
        server.send(200, F("text/html"),
            F("RIGHT"));
    });

    server.on("/up", HTTP_GET, []() {


        digitalWrite(up_PIN, LOW);
        delay(100);
        
        digitalWrite(up_PIN, HIGH);

        delay(100);
      
        server.send(200, F("text/html"),
            F("UP"));
    });

    server.on("/down", HTTP_GET, []() {


        digitalWrite(down_PIN, LOW);
        delay(100);
        
        digitalWrite(down_PIN, HIGH);

        delay(100);
      
        server.send(200, F("text/html"),
            F("DOWN"));
    });
}
