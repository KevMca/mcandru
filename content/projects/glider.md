---
title: "Glider"
draft: false
start: 2020-03-20
status: done
image: projects/paper-plane.jpg
description: An autonomous, perpetually flying aircraft.
owners:
  - Kevin McAndrew
tags: 
  - glider
timeline:
  - name: Glider conversion
    date: 2020-03-20
    status: done
    description: |
      I bought a hand thrown glider for €5 in Lidl. The first thing to do was to put a motor and servos on it.
      Initially it would be controlled using my stock RC controller and receiver.
  - name: Motor control and sensors
    date: 2020-05-05
    status: done
    description: |
      There are two roll servos, one pitch servo, one yaw servo and a propeller BLDC. There will also be a 9DOF IMU,
      altitude barometer, windspeed sensor, GPS, and RC receiver.
  - name: Final electronics
    date: 2020-06-26
    status: done
    description: |
      The final board for testing will place an ESP32 inbetween the RC receiver and the motors so that PID control
      and more complex controllers can be implemented.
  - name: Web interface / datalogging
    date: 2020-08-20
    status: done
    description: |
      PID controllers will be implemented for each of the axes for simpler intial controls and some level of automation.
    posts:
      - web-interface-working
  - name: Control system
    date: 2020-09-25
    status: done
    description: |
      One of the goals of this project is to create a robust control system that can withstand imbalance in the plane,
      gusts of wind, stalling and the ability to take tight turns. PID controllers are the first initial starting point,
      but many changes will be necessary.
---

If you have ever seen a bird gliding in the wind, that is exactly what this project is trying to emulate. The world record flight time for a two-seat glider is over 70 hours set in 1961 in Hawaii. This record has not been beaten because it is seen as being a pointless and dangerous challenge. Alpine swifts can fly for 6 months at a time without landing in fact.

So it is not too crazy to imagine building an autonomous glider that can remain airborne for large periods of time. To do this, a stable control system and suite of algorithms is required.