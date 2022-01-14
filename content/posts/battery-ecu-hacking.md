---
title: "CAN you hack a Prius battery ECU?"
date: 2022-01-14
slug: "/battery-ecu-hacking"
author: "Kevin McAndrew"
tags:
    - Prius
---

[//]: <>                                                                     (.)
The Prius Gen 2 battery ECU has a few design flaws, one of which we have already
encountered with our Prius. Battery fires caused by the high voltage connector
shorting out are a common fault.

The question is, is it possible to make our own battery ECU that fixes these
problems and is designed to be easily upgraded.

### Battery ECU connectors
[//]: <>                                                                     (.)
The battery ECU has three connectors 1) High voltage sensing connector, 2) 
Temperature and current sensing connector and 3) the main fan control and
communication connector.

The high voltage sensing connector:

- 1: **B-** (Battery negative)
- 5: **VBB13** (Cell 13)
- 6: **VBB11** (Cell 11)
- 7: **VBB9** (Cell 9)
- 8: **VBB7** (Cell 7)
- 9: **VBB5** (Cell 5)
- 10: **VBB3** (Cell 3)
- 11: **VBB1** (Cell 1)
- 15: **VBB14** (Cell 14)
- 16: **VBB12** (Cell 12)
- 17: **VBB10** (Cell 10)
- 18: **VBB8** (Cell 8)
- 19: **VBB6** (Cell 6)
- 20: **VBB4** (Cell 4)
- 21: **VBB2** (Cell 2)
- 22: **GBB0** (Ground)

<figure>
  <img src="/images/posts/battery-ecu-hacking/b12-connector.png" alt="battery-ecu-connector"/>
  <figcaption>The high voltage sensing connector</figcaption>
</figure>

The current and temperature sensing connector:

- 1: **TB1** (Temp sensor 1 positive)
- 2: **GB1** (Temp sensor 1 ground)
- 3: **TB2** (Temp sensor 2 positive)
- 4: **GB2** (Temp sensor 2 ground)
- 5: **TB3** (Temp sensor 3 positive)
- 6: **GB3** (Temp sensor 3 ground)
- 9: **TC1** (Temp sensor 4 positive)
- 10: **GC1** (Temp sensor 4 ground)
- 14: **GIB** (Current sensor ground)
- 15: **VIB** (Current sensor power)
- 16: **IB** (Current sensor output voltage)

<figure>
  <img src="/images/posts/battery-ecu-hacking/b13-connector.png" alt="battery-ecu-connector"/>
  <figcaption>The current and temperature sensing connector</figcaption>
</figure>

The main battery ECU connector has the following connections:

- 1: **AM** (12V Auxilliary battery - always on)
- 2: **IGCT** (12V Ignition relay input - on when ignition is on)
- 9: **VM** (Fan voltage monitoring)
- 10: **FCTL** (Fan relay control output)
- 12: **GND** (Ground)
- 13: **IG2** (12V ignition wire)
- 18: **CANH** (CAN bus high pin)
- 19: **CANL** (CAN bus low pin)
- 24: **S1** (Fan PWM control)

<figure>
  <img src="/images/posts/battery-ecu-hacking/b11-connector.png" alt="battery-ecu-connector"/>
  <figcaption>The main communication and fan control connector for the battery ECU</figcaption>
</figure>

[//]: <>                                                                     (.)
B12 and B13 are internal connectors connected to different sensors in the
battery housing. B11 is the main connector that connects the battery to the rest
of the car. This is the connector we need to connect to in order to fool the car
into thinking that the battery ECU is installed when it isn't and our imposter
ECU is actually the one pulling the strings.

### CAN bus messages

[//]: <>                                                                     (.)
CAN is a differential multi-master serial bus. There are two connections called 
CANH and CANL. When the bus is idle (called recessive state), CANH and CANL are
at a similar voltage. When the bus is turned on (called dominant state), CANH
and CANL should have about 2V of a difference between them, with CANH being
higher than CANL.

[//]: <>                                                                     (.)
The following figure shows the CANH and CANL signals for a CAN frame. The frame
consists of 1) an identifier used in arbitration, 2) control bits telling how 
many data bytes there are (from 0 to 8 bytes per frame), 3) the data payload,
4) Cyclic Redundancy Check (CRC) and 4) an acknowledgement.

<figure>
  <img src="/images/posts/battery-ecu-hacking/can-frame.png" alt="can-frame"/>
  <figcaption>An example of a CAN frame and it's layout</figcaption>
</figure>

[//]: <>                                                                     (.)
The identifier is 11 bits long on the prius and each message's is unique. The
bus data rate is 500kb/s on the prius also.

### Non-solicited messages

[//]: <>                                                                     (.)
Non-solicited messages are messages that are sent out by an ECU regardless of if
other ECUs want them or not. Solicited messages on the other hand are sent in
response to a request from another ECU on the CAN bus. A request message can be
sent by setting the RTR bit HIGH.

[//]: <>                                                                     (.)
In order to read any unsolicited messages that the battery ECU is sending, we
can disconnect the battery ECU entirely from the rest of the car and read any
messages that it sends out over CAN. In order to read these messages however,
there must be at least one other device on the bus that acknowledges those
messages. If the battery ECU does not receive any acknowledgements, it will
continue to send the same message over and over again, which limits how messages
we can pull from it.

[//]: <>                                                                     (.)
The purpose of the ACK bit in the CAN frame is to allow anything connected to
the CAN bus to let the transmitter know if it has successfully sent a CAN]
message. Each device on the network reads every CAN frame and checks to see if
it is a valid frame regardless of if it will use that frame or not.

<figure>
  <img src="/images/posts/battery-ecu-hacking/isocan-board.jpg" alt="isocan-board"/>
  <figcaption>Two isocan boards connected together that are communicating</figcaption>
</figure>

[//]: <>                                                                     (.)
We used one of the boards above to read the CAN frames and acknowledge them. The
two boards in the image are setup with one being a transmitter and the other
a receiver for testing purposes. You may notice an ESP32 board sitting on it.
This microcontroller contains a CAN controller, which is then used to control an
external CAN driver module. I programmed this module using the Arduino IDE and a
USB to UART adaptor.

<figure>
  <img src="/images/posts/battery-ecu-hacking/battery-ecu-unsolicited.jpg" alt="isocan-unsolicited"/>
  <figcaption>This shows battery ECU CAN reading setup</figcaption>
</figure>

[//]: <>                                                                     (.)
The figure above shows how the isocan board and the battery ECU are powered from
a 12V battery. Then the CAN bus of both boards is connected together. We used a
Saleae Logic Analyser to read the CAN bus messages and convert them into a .csv
file. 

The .csv file can be accessed here: https://drive.google.com/file/d/1cHYLfJRovdj254-lZ9bJrO89xJZFMTQZ/view?usp=sharing

We discovered 5 unique identifiers:

1. 0x03B : (5 bytes) Occurs every 8ms 
3. 0x3C9 : (8 bytes) Occurs every 100ms 
4. 0x3CB : (7 bytes) Occurs every 100ms
5. 0x3CD : (5 bytes) Occurs every 100ms
6. 0x4D1 : (8 bytes) Occurs every 1.06s

I found a pdf with a bunch decoded CAN identifiers for the Prius Gen 3: https://www.selidori.com/tech/00000-04999/40-lLwI4.pdf

[//]: <>                                                                     (.)
Using this PDF I could guess what some of these messages were:

- 0x03B : EM current and Pack voltage
- 0x3CB : Battery State of Charge (SoC), current max and min, temperature max and min
- 0x3CD : Battery fault codes and pack voltage

### Solicited messages and others

[//]: <>                                                                     (.)
In order to read any solicited messages or others that the battery ECU is
involved in, we can scan the CAN bus when the ECU is connected and then scan it
again when it is disconnected and see if there are any messages missing.
