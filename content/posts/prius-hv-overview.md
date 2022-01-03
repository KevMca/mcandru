---
title: "Prius High Voltage System Overview"
date: 2020-11-14
slug: "/prius-hv-overview"
author: "Kevin McAndrew"
tags:
    - Prius
---

### Battery System Overview 🔋🔋🔋🔋🔌

Battery ECU teardown by pEEf: https://priuschat.com/threads/battery-ecu-secrets-and-teardown-warning-geek-content.85987/

<figure>
  <img src="/images/posts/prius-hv-overview/battery_system_simple.png" style="max-width: 500px;" alt="simple_battery_system"/>
  <figcaption>A simplified block diagram of the battery system</figcaption>
</figure>

- **Battery ECU** : Effectively a Battery Management System (BMS) that monitors the 
    cell voltages and controls the battery blower
- **Battery Blower** : Used to cool the battery
- **Battery Blower Controller** : Drives the battery blower motor
- **Traction Battery** : The high voltage battery that drives the car
- **Inverter / Converter** : Converts between AC and DC power for powering the motors 
    from the traction battery and charging the traction battery from the motors
- **Hybrid vehicle control ECU** : The main controller that coordinates the inverter/converter, ICE and battery

<figure>
  <img src="/images/posts/prius-hv-overview/prius_batt_system.png" alt="detailed_battery_system"/>
  <figcaption>A detailed block diagram of the battery system</figcaption>
</figure>

### Battery 🔋

- High Voltage Traction Battery

The high voltage battery (also known as the traction battery) is a 201.6V NiMH battery
composed of 28 modules (7.2V each), where each module is made of six individual 1.2-volt,
6.5 Ah Panasonic Prismatic NiMH cells. The 28 modules are connected in series to produce a total 
energy storage capacity of 1.310kWh (201.6-volts × 6.5 Ah).

    Total voltage:           201.6V
    Total energy storage:    1.31kWh
    Number modules:          28
    Module voltage:          7.2V
    Module energy:           46.8Wh
    Number cells per module: 6
    Cell voltage:            1.2V
    Cell energy:             7.8Wh

<figure>
  <img src="/images/posts/prius-hv-overview/traction.jpg" style="max-width: 600px;" alt="gen2_prius_battery"/>
  <figcaption>The Gen 2 prius battery without it's outer casing</figcaption>
</figure>

- Cooling System

Passive battery cooling and heating is accomplished through the metal case of the battery 
assembly pack, while a forced air cooling system with a blower motor and ducting system 
enables active cooling of the HV battery. The blower motor is driven by a blower motor
controller which is controlled by the battery ECU.

<figure>
  <img src="/images/posts/prius-hv-overview/blower.jpeg" alt="blower_motor"/>
  <figcaption>A view of the blower motor on a Gen 3 HV battery</figcaption>
</figure>

- Low Voltage Battery

The 12V lead acid battery in the boot of the car. The low voltage battery is charged by 
the Inverter/Converter which gets its power from the traction battery.

### Inverter / Converter 🌊 〰️

Functions:

- 2 inverters for MG1 and MG2
- Buck/Boost converter for battery charging
- 12V dc-dc converter
- Climate control AC inverter

<figure>
  <img src="/images/posts/prius-hv-overview/inverter.jpg" alt="inverter"/>
  <figcaption>The inverter / converter unit for the Prius Gen 2</figcaption>
</figure>

The MG1 and MG2 inverter units can be used either to drive the MG1 and MG2 motors
or to use the motors to power a load (usually charging the battery). MG1 and MG2 
are 3 phase synchronous motors with delta wound stators. The inverter takes three
phase control signals from the Hybrid Control ECU which modulate the DC voltage
from the boost converter in a sinusoidal-like pattern to drive the motors. The
inverters can also rectify the motor voltage using the internal diodes.

The buck/boost converter is connected to the battery at one end, and the inverters
at the other end. It is used to step up the battery voltage for driving the motors
and for stepping down the motors voltage to charge the battery. It is controlled
using the CPWM pin which takes a PWM signal to control the buck/boost action of the
converter.

The 12V DC-DC converter is used to charge the auxiliary 12V lead acid battery from
the traction battery and to run any other low voltage electronics.

An extra AC inverter is included to drive the pump for the climate control system.

---

**32 pin connector:**

1. --
2. GIVA : MG1 phase current V
3. GIVB : MG1 phase current V
4. GUU  : MG1 PWM U
5. GVU  : MG1 PWM V
6. GWU  : MG1 PWM W
7. MIVA : MG2 phase current V
8. MIVB : MG2 phase current V
9. MUU  : MG2 PWM U
10. MVU  : MG2 PWM V
11. MWU  : MG2 PWM W
12. VH   : Inverter capacitor voltage
13. CPWM : Boost converter switch signal
14. GSDN : MG1 shutdown
15. VL   : Boost converter input voltage
16. GINV : Inverter ground
17. --
18. GIWA : MG1 phase current W
19. GIWB : MG1 phase current W
20. CT   : Boost converter temperature sensor
21. GIVT : MG1 inverter temperature
22. GFIV : MG1 inverter fail
23. MIWA : MG2 phase current W
24. MIWB : MG2 phase current W
25. MSDN : MG2 shutdown
26. MVIT : MG2 inverter temperature
27. MFIV : MG2 inverter fail
28. OVH  : Overvoltage
29. CSDN : Boost converter shutdown signal
30. FCV  : Boost converter fail signal
31. OVL  : Boost converter over voltage signal
32. GCNV : Boost converter ground

### Battery Management System ⚖️🔋

The Battery ECU is the main control board for the battery. This controller keeps the state 
of charge (SOC) between approximately 40 and 80 percent (shallow cycling), where the average 
SOC hovers around 60 percent, allowing about 400 Wh of useful energy storage to capture energy
The shallow cycling enables the hybrid battery to last tens of thousands of cycles, which 
translates into decades of use and in many cases more than 200,000 miles (320,000 km) of operation.

<figure>
  <img src="/images/posts/prius-hv-overview/BMS.jpg" alt="BMS"/>
  <figcaption>The Battery ECU (BMS)</figcaption>
</figure>

The shallow cycling means that the batteries cells do not need to be balanced. High precision
matched cells are used so that they charge and discharge at the same rate and therefore maintain
the same voltage over many cycles. Therefore the Battery ECU monitors the voltages of a group of
modules, temperature and the battery blower system.
