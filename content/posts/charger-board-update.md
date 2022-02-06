---
title: "Charger Board Update"
date: 2022-02-06
slug: "/charger-board-update"
author: "Kevin McAndrew"
tags:
    - Prius
---

[//]: <>                                                                     (.)

### ADC Measurements

The high voltages on the inverter can be measured using the isolated voltage
measurement signals. The following formula can be used to calculate the actual
voltage from the scaled signal:

```
Vc = (Vmeas - 0.5V)*100
```

<figure>
  <img src="/images/posts/32-pin-connector-detail/VH-curve.png" alt="VH-curve"/>
  <figcaption>The VH signal voltage curve</figcaption>
</figure>

The bare minimum high voltage resolution I would like is 0.1V.

[//]: <>                                                                     (.)
If the maximum voltage is 500V, 500V/0.1V = 5000 levels are required to achieve
the required resolution.

If the maximum scaled voltage is 5V, the smallest detectable voltage would then
be 5V/5000 = 0.001V. Therefore, any noise would have to be smaller than this
voltage.

The minimum number of bits is then log2(5000) = 12.29, so a 13-bit ADC would 
have the minimum allowable bit resolution.

The ADS1115 is a 16-bit ADC which should be able to suit the purposes of these
signals.

<figure>
  <img src="/images/posts/charger-board-update/ads1115.jpg" alt="ads1115"/>
  <figcaption>ADS1115 breakout board</figcaption>
</figure>

### Charging Procedure

1. Turn on HIGH side switch (0% converter PWM)
2. Precharge the capacitor
3. Close main contactor, once capacitor voltage has settled
4. Increase PWM until capacitor is at the set voltage
5. Connect the mains
6. Adjust voltage until no current flows
7. Adjust voltage to keep constant charging current
8. Enter constant voltage stage when within certain range of charged battery voltage
9. Disconnect mains
10. Reduce PWM slowly
11. Open contactors

[//]: <>                                                                     (.)
The full charging procedure can be controlled with a finite state machine. An
update function can be run in order to check for events and update the state
machine.

### Relays

[//]: <>                                                                     (.)
There are a total of 5 relays needed for the charger. 2 main contactors each for
the battery and mains and an extra precharge resistor for the battery. The
battery relays are contained within the battery unit and accessible to the
hybrid ECU. However, the two contactors for the mains will have to be added.

<figure>
  <img src="/images/posts/charger-board-update/relays.png" alt="relays"/>
  <figcaption>Small precharge relay (left) and main contactor (right)</figcaption>
</figure>

[//]: <>                                                                     (.)
As you can see from the figure, the small relay pulls 101mA and the large relays
pull 353mA. Regular 2n3904 bipolar transistors can handle 200mA constant current
according to their datasheet, so a darlington pair can be used for the larger
contactors and a 2n3904 can be used for the precharge relay.

[//]: <>                                                                     (.)
These relays can be controlled from the H16 Hybrid ECU connector, which is why
the charging controller board should be placed in between the hybrid ECU and
inverter, instead of being connected directly at the inverter.

### Hybrid ECU connections

The hybrid ECU has 4 connectors A (H14), B (H15), C (H16) and D (H17). Detail
of each of the connectors follows. Any pin names in **bold** correspond to pins
that are needed for the charge controller.

[//]: <>                                                                     (.)
H14 is a 31 pin 90980-12431 connector that is connected to the power source
controller, CAN bus, transponder key, cruise control, shift lever, airbag and
accelerator position sensor.

1. GND1: Chassis Ground
4. GND2: Chassis Ground
5. ST2: (Power Source Control ECU and combination meter)
6. TC: (Data link connector)
7. IGSW: Ignition switch (Transponder Key Computer)
8. CANH: CAN High
9. CANL: CAN Low
13. CCS: Cruise Control Combination Switch
14. E2X2: (Shift Lever Position Sensor)
15. E2X1: (Shift Lever Position Sensor)
16. VCX2: (Shift Lever Position Sensor)
17. VCX1: (Shift Lever Position Sensor)
18. IMI: (Transponder Key Computer)
19. SPD1: Speed? (Power Source Control ECU)
20. ABFS: (Airbag Sensor)
21. VCX3:(Shift Lever Position Sensor)
23. VSX3: (Shift Lever Position Sensor)
24. VSX2: (Shift Lever Position Sensor)
25. VSX1: (Shift Lever Position Sensor)
26. IMO: (Transponder Key Computer)
27. EP1: (Accel Position Sensor)
28. RDY: Ready (Power Source Control ECU)
30. VSX4: (Shift Lever Position Sensor)
31. VCX4: (Shift Lever Position Sensor)

<figure>
  <img src="/images/posts/charger-board-update/H14.PNG" alt="H14"/>
  <figcaption>H14 Connector</figcaption>
</figure>

[//]: <>                                                                     (.)
H15 is a 35 pin 90980-12429 connector that is connected to the inverter and stop
light.

1. **ILK**: Inverter interlock (Inverter)
2. ST1-: (Stop Light Switch)
3. STP: Stop (Power Source Control ECU and Stop Light Switch)
6. BATT: 12V battery (IGCT Relay)
8. **MSDN** MG2 Shutdown (Inverter)
9. **MUU**: MG2 PWM U (Inverter)
10. **MVU**: MG2 PWM V (Inverter)
11. **MWU**: MG2 PWM W (Inverter)
13. **GWU**: MG1 PWM W (Inverter)
14. **GVU**: MG1 PWM V (Inverter)
15. **GUU**: MG1 PWM U (Inverter)
16. **GSDN**: MG1 Shutdown (Inverter)
17. P1: Main switch (Main SW)
18. **MFIV**: MG2 Inverter Fail (Inverter)
19. **MIVT**: MG2 Inverter Temperature (Inverter)
20. **MIWB**:MG2 Phase current W (Inverter)
21. **MIVB**: MG2 Phase current V (Inverter)
22. **OVH**: Overvoltage (Inverter)
23. **GIMV**: (Inverter)
24. **ET1**:TOINV (Inverter)
25. **STB**: (Inverter)
26. **VN**: VH capacitor voltage (Inverter)
27. **GIVT**: MG1 Inverter Temperature (Inverter)
29. **MIWA**: MG2 Phase current W (Inverter)
30. **MIVA**: MG2 Phase current V (Inverter)
31. **GIWB**: MG1 Phase current W (Inverter)
32. **GIWA**: MG1 Phase current W (Inverter)
33. **GIVB**: MG1 Phase current V (Inverter)
34. **GIVA**: MG1 Phase current V (Inverter)
35. **GFIV**: MG1 Inverter Fail (Inverter)

<figure>
  <img src="/images/posts/charger-board-update/H15.PNG" alt="H15"/>
  <figcaption>H15 Connector</figcaption>
</figure>

[//]: <>                                                                     (.)
H16 is a 35 pin 90980-12428 connector that is connected to the battery relays,
main relay, air con water pump relay, the boost converter, engine controller,
accelerator position sensor and circuit breaker sensor.

1. **CON1**: Battery precharge relay
2. **CON2**: Battery positive relay
3. **CON3**: Battery negative relay
4. MREL: Main relay (IGCT Relay)
5. WP: Air conditioning water pump relay (AC W/P Relay)
6. +B2: Connected to +B1 12V (IGCT Relay)
7. +B1: Connected to +B2 12V (IGCT Relay)
8. **GCNV**: Converter ground (Inverter)
9. **CSDN**: Converter Shutdown (Inverter)
10. **CPWM**: Converter PWM (Inverter)
12. NEO: (Engine control module)
13. GO: (Engine control module)
14. **ITE**: TOECU (Inverter)
15. AS1: SIF+ (Circuit Breaker Sensor)
16. ASIG: SIF- (Circuit Breaker Sensor)
17. **CLK**: Clock (Inverter)
20. **FCV**: Boost converter fail (Inverter)
21. **CT**: Converter temperature (Inverter)
22. **OVL**: Overvoltage (Inverter)
24. NODD:
25. VCP1: (Accel Position Sensor)
26. VPA1: (Accel Position Sensor)
27. EP1: (Accel Position Sensor)
30. **VL**: VL boost converter voltage (Inverter)
31. VLO:
33. VCP2: (Accel Position Sensor)
34. VPA2: (Accel Position Sensor)
35. EP2: (Accel Position Sensor)

<figure>
  <img src="/images/posts/charger-board-update/H16.PNG" alt="H16"/>
  <figcaption>H16 Connector</figcaption>
</figure>

[//]: <>                                                                     (.)
H17 is a 34 pin 90980-12430 connector that is connected to the transmission
control ECU, power source control ECU, MG1 and MG2.

9. PCON: (Transmission control ECU)
10. PPOS: (Power source control ECU and transmission control ECU)
18. MMT: (MG2)
19. MSNG: (MG2)
20. MSN: (MG2)
21. GSNG: (MG1)
22. GSN: (MG1)
23. GCS: (MG1)
24. GCSG: (MG1)
26. GRFG: (MG1)
27. GRF: (MG1)
28. MMTG: (MG2)
29. OMTG: (MG2)
30. OMT: (MG2)
31. MCSG: (MG2)
32. MCS: (MG2)
34. MRF: (MG2)
35. MRFG: (MG2)

<figure>
  <img src="/images/posts/charger-board-update/H17.PNG" alt="H17"/>
  <figcaption>H17 Connector</figcaption>
</figure>

<figure>
  <img src="/images/posts/charger-board-update/relay-connections.png" alt="relay-connections"/>
  <figcaption>Relay connections to the hybrid ECU</figcaption>
</figure>


