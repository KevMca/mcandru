---
title: "Plug-in Converter Board"
date: 2020-12-27
slug: "/prius-in-converter-board"
author: "Kevin McAndrew"
tags:
    - Prius
---

### 32 pin connector 🔌

The 32 pin connector enterring the prius inverter will be intercepted by the new
conversion board. Another 32 pin connector will connect the new board to the 
inverter.

The male 32-pin connector that is attached to the hybrid ECU is number: 1318747-1
The female 32-pin connector that is attached to the inverter is number: 1318745-2

<figure>
    <img src="/images/posts/plug-in-converter-board/32-pin.jpg" alt="32-pin"/>
    <figcaption>The 32-pin connector to the main board</figcaption>
</figure>

- Pass = connect directly to Hybrid ECU
- *Monitor* = pass the signal to the Hybrid ECU, and to the converter board
- **Intercept** = be able to connect and disconnect the signal from the Hybrid ECU and
connect to circuitry on the converter board

1. --
2. *Monitor* : MG1 phase current V (GIVA)
3. Pass : MG1 phase current V (GIVB)
4. Pass  : MG1 PWM U (GUU)
5. Pass  : MG1 PWM V (GVU)
6. Pass  : MG1 PWM W (GWU)
7. Pass : MG2 phase current V (MIVA)
8. Pass : MG2 phase current V (MIVB)
9. Pass  : MG2 PWM U (MUU)
10. Pass  : MG2 PWM V (MVU)
11. Pass  : MG2 PWM W (MWU)
12. *Monitor* : Inverter capacitor voltage (VH)
13. **Intercept** : Boost converter switch signal (CPWM)
14. **Intercept** : MG1 shutdown (GSDN)
15. *Monitor*: Boost converter input voltage (VL)
16. *Monitor* : Inverter ground (GINV)
17. --
18. *Monitor* : MG1 phase current W (GIWA)
19. Pass : MG1 phase current W  : (GIWB)
20. *Monitor* : Boost converter temperature sensor (CT)
21. *Monitor* : MG1 inverter temperature (GIVT)
22. *Monitor* : MG1 inverter fail (GFIV)
23. Pass : MG2 phase current W (MIWA)
24. Pass : MG2 phase current W (MIWB)
25. **Intercept** : MG2 shutdown (MSDN)
26. Pass : MG2 inverter temperature (MVIT)
27. *Monitor* : MG2 inverter fail (MFIV)
28. *Monitor*  : Overvoltage (OVH)
29. **Intercept** : Boost converter shutdown signal (CSDN)
30. *Monitor* : Boost converter fail signal (FCV)
31. *Monitor* : Boost converter over voltage signal (OVL)
32. *Monitor* : Boost converter ground (GCNV)

Interceptions can be made using an analog multiplexer chip like the 405x
family of chips.
There are 4 pins that need to be **intercepted**:

- Boost converter switch signal (PWM signal created from microcontroller)
- Boost converter shutdown
- MG1 shutdown
- MG2 shutdown
- The PWM signals for the inverters might need to be disconnected, but the
MG1 and MG2 shutdown signals should handle that

There are 6 sensor pins that need to be *monitored*:

- MG1 phase current V
- MG1 phase current W
- Inverter capacitor voltage
- Boost converter input voltage
- Boost converter temperature sensor
- MG1 inverter temperature

And 5 error pins that need to be *monitored*:

- MG1 inverter fail
- MG2 inverter fail
- Overvoltage
- Boost converter fail signal
- Boost converter over voltage signal

There are also 2 ground pins:

- Boost converter ground
- Inverter ground

[Which ground should I use? Probably boost converter - can they
be connected together?]

### Contactors ⚡

The board must be able to control 2 sets of contactors:

- The High Voltage Battery contactors
- The mains and motor contactors

The High Voltage Battery has 3 contactors in the System Main Relay unit, as
seen in Fig 2.1. These three contactors are controlled by the Hybrid Vehicle
Control ECU at pins CON1, CON2 and CON3. This must also be intercepted by
converter board.

<figure>
    <img src="/images/posts/plug-in-converter-board/battery-contactor.png" alt="battery-contactor"/>
    <figcaption>The High Voltage Battery contactor arrangement. The orange wires
are the positive and negative terminals from the battery. You may notice that
the positive wire has 2 contactors, 1 for precharge through a resistor and 1
without the precharge resistor.</figcaption>
</figure>

Two contactors will also need to be added in order to connect and disconnect a
motor and to connect the mains to the inverter also.

### Microcontroller 💾

Pin requirements:

- 4 digital pins for selecting intercepts
- 5 digital pins for errors
- 3 digital pins for contactors
- 6 ADC pins for sensors

Digital pins: 12
Analog pins: 6

#### (Arduino nano)

- 11 digital pins
- 8 analog pins

Analog pins can be reused as digital pins.
