#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <HTTPClient.h>

// -------------------- Wi-Fi ---------------------------------------------------
const char* ssid     = "";   // fill in your Wi-Fi
const char* password = "";

// -------------------- Albilab server & HTTP header ---------------------------
const char* ALBILAB_BASE_URL  = "";
const char* AUTH_HEADER_NAME  = "Authorization";
const char* AUTH_HEADER_VALUE = "Basic ";

// -------------------- Touch sensors ------------------------------------------
const byte NUM_TOUCH = 5;
const byte touchPins[NUM_TOUCH] = {4, 14, 27, 33, 32};          // T0–T4
const char* btnId[NUM_TOUCH]    = {"down", "right", "run-stop", "left", "up"};

const int   THRESHOLD       = 50;   // lower => more sensitive
const unsigned long MIN_TIME = 200; // ms, debounce
const unsigned long DEBUG_MS = 100; // print raw values every n ms

// -------------------- State variables ----------------------------------------
bool          pressed [NUM_TOUCH] = {false};
bool          counting[NUM_TOUCH] = {false};
unsigned long pressStart[NUM_TOUCH];
unsigned long lastDebug = 0;

// -----------------------------------------------------------------------------
// HTTPS GET with custom header
void callButtonUrl(const char* id) {
  static WiFiClientSecure client;
  client.setInsecure();                    // ignore TLS cert (self-signed)
  HTTPClient https;

  String url = String(ALBILAB_BASE_URL) + id;
  Serial.print("Calling: "); Serial.println(url);

  if (https.begin(client, url)) {
    https.addHeader(AUTH_HEADER_NAME, AUTH_HEADER_VALUE);
    int code = https.GET();
    Serial.print("HTTP code: "); Serial.println(code);
    https.end();
  } else {
    Serial.println("HTTPS.begin() failed");
  }
}

// -----------------------------------------------------------------------------
// Wi-Fi connect / reconnect
void wifiConnect() {
  Serial.print("Connecting to \""); Serial.print(ssid); Serial.println("\"...");
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  unsigned long t0 = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - t0 < 15000) {
    delay(250);
    Serial.print('.');
  }
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nWi-Fi OK, IP: " + WiFi.localIP().toString());
  } else {
    Serial.println("\nWi-Fi failed, will retry later.");
  }
}

// -----------------------------------------------------------------------------
void setup() {
  Serial.begin(115200);
  wifiConnect();
}

// -----------------------------------------------------------------------------
void loop() {
  unsigned long now = millis();

  // reconnect attempt every 10 s
  static unsigned long lastWifiTry = 0;
  if (WiFi.status() != WL_CONNECTED && now - lastWifiTry > 10000) {
    lastWifiTry = now;
    wifiConnect();
  }

  for (byte i = 0; i < NUM_TOUCH; ++i) {
    int val = touchRead(touchPins[i]);

    if (now - lastDebug >= DEBUG_MS) {
      Serial.print(i + 1); Serial.print(": "); Serial.println(val);
    }

    if (val < THRESHOLD) {                               // finger detected
      if (!pressed[i]) {
        if (!counting[i]) {                              // start debounce
          counting[i]   = true;
          pressStart[i] = now;
        } else if (now - pressStart[i] >= MIN_TIME) {    // valid press!
          pressed[i]  = true;
          counting[i] = false;
          Serial.print("Button "); Serial.print(i + 1); Serial.println(" PRESSED");

          if (WiFi.status() == WL_CONNECTED) {
            callButtonUrl(btnId[i]);
          } else {
            Serial.println("No Wi-Fi, URL not called.");
          }
        }
      }
    } else {                                            // released
      pressed[i]  = false;
      counting[i] = false;
    }
  }

  if (now - lastDebug >= DEBUG_MS) lastDebug = now;
  delay(5);
}