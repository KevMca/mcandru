---
title: "Traction Battery Repairs"
date: 2022-01-03
slug: "/traction-battery-repairs"
author: "Kevin McAndrew"
tags:
    - Prius
---

The traction battery (the 200 volt battery that powers the motors of the prius) 
is often a source of many problems with the second generation Prius. Our Prius
was left up for a couple of months after January 2021, which allowed water to
accumulate inside the car. When we attempted to start the car, the battery
seemed to be dead. We got the dreaded **P0A80** code with a red triangle of
death 🔺

## Diagnosis 🩺
[//]: <>                                                                     (.)
Upon searching the P0A80 code online, the first results returned *"Replace
Hybrid Battery Pack"* warnings, which is pretty worrying! So out came the
battery pack, which is located just behind the back seats.

<figure>
  <img src="/images/posts/traction-battery-repairs/battery-removal.png" alt="battery-removal"/>
  <figcaption>Removal of the traction battery from the prius.</figcaption>
</figure>

<figure>
  <img src="/images/posts/traction-battery-repairs/battery-open.jpg" alt="battery-open"/>
  <figcaption>Removed traction battery all opened up.</figcaption>
</figure>

[//]: <>                                                                     (.)
After removing the traction battery, the first thing we checked were the cell 
voltages. Some of the cells were close to zero volts and others were even
negative 😰 (The nominal voltage of each module should be 7.2V)

The questions were now, what is the extent of the damage, what caused this and
how can it be fixed. After doing some more searching of the PriusChat forums,
it was recommended that the high voltage connector into the battery ECU is
checked because that connector can short out if moisture gets into the car. The
ECU was designed as if it was going to be in indoor conditions, which it should
be, however if it is left outside the battery can short through this connector
even if the service plug grip is out and the car is fully powered down.

The purpose of the high voltage connector is to allow the battery monitoring
system to read the module voltages. This means that there are potentially
voltage gradients of 200 volts across the connector. The original designers made
an effort to arrange the pins to reduce the voltage gradient, but it still ended
up shorting the battery in outside moisture conditions.

<figure>
  <img src="/images/posts/traction-battery-repairs/burnt-stuff.png" alt="burnt-stuff"/>
  <figcaption>Burnt battery ECU connector and board.</figcaption>
</figure>

[//]: <>                                                                     (.)
And there you go. She's well burnt. This means that the cells and the board 
could potentially be damaged. We know that the cells are already damaged for
sure. After a quick test of the board, it amazingly seemed fine. Obviously the
connector would need to be replaced, but the only damage was some heating of the
traces. Since the short occured through the connector, none of the current ran
throught the board itself.

## Repair 🔨
[//]: <>                                                                     (.)
I bought replacements for the severely damaged cells and a new connector for the
battery ECU. The cells came from a lad in Cork that dismantles hybrid batteries
and resells the individual components. A replacement connector was the most
difficult thing to find! The connector should be 22 pin, but this is not a very
common size of connector to come by. So I got 20 pin male and female connectors
since the last two pins are not used. 

The female connector is a MULTILOCK 040 II Female Connector Housing, 20 Way, 2 
Row Right Angle. The male connector is a MULTILOCK 040 II Male Connector 
Housing, 2.5mm Pitch, 20 Way, 2 Row. The pins are MULTILOCK 040 Female Crimp 
Terminal Contact 20AWG.

<figure>
  <img src="/images/posts/traction-battery-repairs/replacements.png" alt="replacements"/>
  <figcaption>Extra replacement cells and a new connector.</figcaption>
</figure>

[//]: <>                                                                     (.)
We returned the battery to the car and tried starting it again. There was still
a red triangle of death, but now there were no fault codes on the OBD.

<figure>
  <img src="/images/posts/traction-battery-repairs/returned.jpg" alt="returned"/>
</figure>

[//]: <>                                                                     (.)
The new cells were put in on the 11th of January 2021. No time was spared with
replacing those. However, the new connector was installed on the 6th June because
we didn't get to work on the Prius over the college semester. After the battery 
was reinstalled and the problem still persisted, it was difficult to find the
time to diagnose the problem since we were only home for a couple of days at a
time. Come Christmas 2021 though and we had a full week to go at it.

We came up with a list of possible issues and ways to solve them as follows:

[//]: <>                                                                     (.)

- Get a Mini VCI cable and a copy of Techstream to read more in depth codes
  - We did this, but it took too long to come
  - In the future, we should be able to troubleshoot problems like this more 
    easily with more helpful codes
- Balance the cells
  - The Prius does not balance the cells, it only monitors them. Therefore if
    the lowest and highest voltage cells have more than a volt of a difference
    between them, the P0A80 code might be active again.
  - This could have been the case, since the replacement cells were not charged
    to match the rest of the battery
- Battery blower fan malfunction
  - The car would technically still run if this was a problem, but the fan was
    filthy anyways
- High voltage leak
  - A high voltage leak can occur when the cells of the prius leak electrolyte
    and form a conductive path to the chassis of the car
  - The error for this would be a P0AA6
  - We followed the diagnostic steps for P0A66 (page HV-426 to HV-427 of P112 
    Hybrid vehicle control manual: http://static.hybrids.ru/files/OfficialToyotaInfo/RepairInformation/RepairManual/HV%20-%20P112%20Hybrid%20Vehicle%20Control.pdf) 
    which eventually led us to the problem

[//]: <>                                                                     (.)
The problem was very simple in the end. While the car wouldn't start up, I (Kev) 
attempted to get a simple battery charger to work with a prius inverter. While
doing this, I think I might have blown the precharge resistor. Since the
precharge resistor was blown, no voltage was detected at the inverter side and
this was detected as a high voltage leak, which prevented the car from starting.

<figure>
  <img src="/images/posts/traction-battery-repairs/charger.jpg" alt="charger"/>
  <figcaption>The battery charger test setup that blew the precharge resistor.</figcaption>
</figure>

[//]: <>                                                                     (.)
We replaced the precharge resistor with another power 20 ohm resistor from a 
microwave and as soon as the battery was reinstalled, she started up. Thus she 
awoke from her slumber of almost a year 💖

<figure>
  <iframe width="100%" height="315" src="https://www.youtube.com/embed/k_YzvTz234s" frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</figure>

[//]: <>                                                                     (.)
The first point of duty is to replace the battery ECU with a custom one. We
might as well replace the NiMH battery with a Li-ion one too while we're at it.
A battery charger has already been made, so a post should be coming out on that
soon as well if other priorities don't take over.
