---
title: "Plug-in Hybrid Plan"
date: 2020-12-06
slug: "/plug-in-plan"
author: "Kevin McAndrew"
tags:
    - Prius
---

For an overview of the current Prius High Voltage system, got to [High Voltage System Overview](/prius-hv-overview).
This post will outline the plan for converting the Prius to a plug-in hybrid vehicle. The steps
are as follows:

1. *Modify the inverter/converter, so that the battery can be charged using either a regular plug
    or a fast charging plug.*
2. *Replace the current BMS (Battery Management System) with a custom board that will allow us to
    create our own custom battery.*
3. *Replace the current NiMH battery with a larger Lithium Ion cell battery.*

Step 1 will make the car into a Plug-In hybrid. Steps 2 and 3 will extend the range and the battery
capacity, which will be important for going full-electric.

### 1. Inverter / Converter Charger Mod 🔌

We can charge the battery by plugging the 230V AC mains into one of the inverter units in the
inverter/converter. The inverter unit rectifies the 230V AC to roughly 330V DC. The buck/boost
converter can then be used to set the higher voltage than the battery in order to charge it.
The PWM signal going to the buck/boost converter can be used to change the charging voltage and
therefore the current going to the battery.

A proof of concept of this design has been done by Damien Maguire:
[Damien's Prius Charger](https://www.youtube.com/watch?v=hkCRddO3Clc&ab_channel=DamienMaguire)

<figure>
  <img src="/images/posts/plug-in-plan/converter.png" alt="converter"/>
  <figcaption>A simple version of what the charging circuit might look like</figcaption>
</figure>

Custom board:
- Must control the Boost converter PWM signal
- Turn off MG1 and MG2 inverters
- The MG1 and MG2 inverters should passively rectify the incoming mains voltage
- A microcontroller can alter the boost converter to maintain a constant current
- Control of precharge relays and main contactors is needed
- It must be able to control the contactors
- It must be able to swap the connection between a motor generator and the mains input

### 2. Battery Management System replacement ⚖️

The purpose of the battery management system is to monitor and balance each cell in the battery,
monitor the temperature, State of Charge (SOC) and current flowing to and from the battery.

<figure>
  <img src="/images/posts/plug-in-plan/BMS_peef.jpg" alt="BMS"/>
  <figcaption>The current Battery ECU (BMS)</figcaption>
</figure>

The old battery ECU does not have any room for expansion. It also does not support any form
of balancing, which would be useful for a Lithium Ion battery and when using a higher percentage
of maximum energy storage. The new battery ECU must have a few added features with a focus on
expandability.

The specification:

- Spoof the same CAN messages that are required by other controllers (these other controllers may
need to be modified to be able to work correctly with a different battery)
- The ability to work with a range of battery voltages and cell configurations
- Easy battery monitor over CAN or OBD2
- Monitor temperature
- Control a temperature control system (air or liquid cooled)
- Monitor current to and from the battery
- Balance cells efficiently

### 2. Traction Battery replacement 🔋

The current traction battery is a 201.6V 1.31kWh NiMH battery with 28 modules. I have seen claims
of 2 or 3km range with this battery at 60kmh cruising. This is obviously much too low for our needs!
Furthermore, we want to be able to use as much of the maximum charge as possible. This means that
balancing is probably important to have on the custom BMS.

The new battery should be of some Lithium persuasion. Old electric car modules or cells would be a
cheap source. A second hand Nissan Leaf battery would be nice, but this will be entirely based on
what we can find, since the battery will probably be the most expensive part of this project 😬

<figure>
  <img src="/images/posts/plug-in-plan/leaf.jpg" alt="leaf_battery"/>
  <figcaption>A first generation Nissan Leaf battery ❤️</figcaption>
</figure>
