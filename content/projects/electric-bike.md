---
title: "Electric Bike"
draft: false
start: 2020-08-11
status: done
image: projects/electric-bike.jpg
description: Get around cities faster and with less effort.
owners:
  - Kevin McAndrew
tags: 
  - bike
timeline:
  - name: Buy a new hub motor
    date: 2020-08-11
    status: done
    description: |
      I bought my hub motor from aliexpress so I could get the best price. There is no need for the full wheel,
      so I bought the motor by itself. It cost about €137.28 for a 48V 1500W motor. Motor arrived on 11th September.
    posts:
      - hub-motor-shopping
  - name: Test hub motor
    date: 2020-09-15
    status: done
    description: |
      All of the electronics are setup, so it's a matter of just plugging everything and seeing how well it works.
  - name: Scavenge old wheels for parts
    date: 2020-08-14
    status: done
    description: |
      I have two old rear wheels, one of which was destroyed by the last motor, the other has a bent rim.
      I can use parts from both of these to build a new wheel around the hub motor.
  - name: Build the wheel
    date: 2020-09-22
    status: done
    description: |
      A new wheel needs to be built from the scavenged spokes and rims of my old wheels.
    posts:
      - building-a-wheel
  - name: Balance the wheel
    date: 2020-09-23
    status: done
    description: |
      The hub motor needs to be balanced to run smooth. This can be done with some tape and coins. This is not
      strictly necessary, but it is a nice touch.
  - name: Build the wooden panels
    date: 2020-09-29
    status: done
    description: |
      The current compartment for the electronics looks ugly and can be improved. The battery needs to be secured
      in place and new light-weight wooden panels need to be made.
    posts:
      - new-compartment
  - name: Buy and install casette
    date: 2020-10-02
    status: done
    description: |
      The Hub motor comes with a casette mount for the pedal chain. I only have freewheels however, so I'll have
      to buy and install this.
  - name: Install hall sensors and setup FOC
    date: 2020-10-09
    status: done
    description: |
      The power of the hub motor is decent, but performance could probably be improved by adding position sensors
      to the wheel and by using Field Oriented Control (FOC).
    posts:
      - motor-control
      - vesc-foc
  - name: Add BMS to the battery
    date: 2020-11-03
    status: done
    description: |
      I bought a BMS for the battery that I have a while ago. However, the BMS was faulty. I have a new one that I
      have been meaning to install for a while. It's finally installed now 😊
  - name: Install battery-run lights
    date: 2020-12-06
    status: done
    description: |
      There are lights on the bike that have their own battery, but why not run them off the bike's battery 😁 I got
      a 12V motorbike headlight and LED rear light from banggood along with a 12V regulator
    posts:
      - bike-lights
---

 I have built a number of electric bikes in the past:

V1: Nissan Almera windscreen wiper motor and switch V2: Hobby BLDC motor, VESC controller and soldered battery V3: Same as V2 with better motor mount and modular battery

My new electric bike is an upgrade to the third version (V4). I am upgrading the motor and compartment for the electronics. The old motor mount broke which pulled the motor into the wheel and broke all the spokes 😬 So I decided to upgrade to a hub motor 😊 The electronics compartment will have a mix of plastic and wood panels.
