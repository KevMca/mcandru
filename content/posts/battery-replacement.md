---
title: "Battery Replacement"
date: 2022-01-04
slug: "/battery-replacement"
author: "Kevin McAndrew"
tags:
    - Prius
---

[//]: <>                                                                     (.)
The traction battery of our Prius needs to be replaced. The main problem with
the original battery is that there is no Battery Management System. There is
only a battery monitoring function in the battery ECU. Furthermore, the energy
density and cost of replacing the old battery make a lithium ion solution more
desireable. It would also be nice to replace the battery ECU with a custom
solution that can be scaled for larger capacity batteries.

### Original battery
[//]: <>                                                                     (.)
The high voltage battery (also known as the traction battery) is a 201.6V NiMH 
battery composed of 28 modules (7.2V each), where each module is made of six 
individual 1.2-volt, 6.5 Ah Panasonic Prismatic NiMH cells. The 28 modules are 
connected in series to produce a total energy storage capacity of 1.310kWh 
(201.6-volts × 6.5 Ah).

    Total voltage:           201.6V
    Total energy storage:    1.31kWh
    Number modules:          28
    Module voltage:          7.2V
    Module energy:           46.8Wh
    Module weight:           1030g
    Module energy density:   45.44Wh/kg
    Number cells per module: 6
    Cell voltage:            1.2V
    Cell energy:             7.8Wh

1.3kW/kg
186A output

https://www.peve.jp/en/product/np2/
https://ur.booksc.eu/book/72082550/3d5351

### Lithium Ion replacement

Specification:

- Module voltage of 14.4V roughly
- At least 1.31kWh of capacity
- Power output of at least 20kW
- 20kW @ 201.6V = 100A of current continuous

Procedure:

1. Calculate number of series cells from nominal voltage (this will always be the same)
2. Calculate range of parallel cells from capacity
3. Calculate range of maximum current per cell
4. Battery energy capacity
5. Battery energy density
6. Battery cell cost

Good brands:

- LG
- Panasonic
- Samsung
- Sanyo
- Sony
- Murata

Tesla (https://www.quora.com/What-is-the-C-rating-of-Teslas-18650-batteries - Karl Young's answer):

- NCA (LiNiCoAlO2) has specific=energy of 250Wh/kg
- 3.1Ah @ 3.6V
- 1C for max life
- roughly 5C on ludicrous mode

#### 18650

    Cell voltage:           3.6V
    Cell capacity:          2Ah to 3.5Ah
    Cell weight:            45g

    1.  number series cells = 201.6V / 3.6V = 56
    2.  total capacity/(cell capacity × cell voltage × number series cells)
        1.3kWh/(2Ah × 3.6V × 56) = 3.22 = 4
        1.3kWh/(2Ah × 3.6V × 56) = 1.84 = 2
        2 > number parallel cells > 4
    3.  max current / number parallel cells
        100A / 4 = 25A
        100A / 2 = 50A
        25A > cell current > 50A

[//]: <>                                                                     (.)
The final battery would be 56s 201.6V 3p (3Ah cells with 30A max current).

    4. energy capacity = 2.6Ah × 3 × 201.6V  = 1.573kWh
    5. number of cells = 56 × 3 = 168
       weight = 168 × 45g = 7.56kg
       energy density  = 1.573kWh / 7.56kg = 208Wh/kg
    6. cost = 168 × €2.95 = €495.6

US18650VTC5A 2600mAh - 35A : https://eu.nkon.nl/sony-us18650vtc5a-flat-top-reclaimed.html

#### 21700

    Cell voltage:           3.6V
    Cell capacity:          3Ah to 4.9Ah
    Cell weight:            65g

    1.  number series cells = 201.6V / 3.6V = 56
    2.  total capacity/(cell capacity × cell voltage × number series cells)
        1.3kWh/(3Ah × 3.6V × 56) = 2.149 = 2
        1.3kWh/(4.9Ah × 3.6V × 56) = 1.32 = 2
        number parallel cells = 2
    3.  max current / number parallel cells
        100A / 2 = 50A
        cell current = 50A

[//]: <>                                                                     (.)
The final battery would be 56s 201.6V 3p (4Ah cells with 35A max current).

    4. energy capacity = 4Ah × 3 × 201.6V  = 2.419kWh
    5. number of cells = 56 × 3 = 168
       weight = 168 × 65g = 10.920kg
       energy density  = 2.419kWh / 10.920kg = 221Wh/kg
    6. cost = 168 × €3.25 = €546

Samsung INR21700-40T 4000mAh - 35A : https://eu.nkon.nl/rechargeable/li-ion/21700-20700-size/samsung-inr21700-40t-4000mah-35a-clear-wrap-reclaimed.html

#### Pouch

#### LiFePo

#### Nissan leaf cells

[//]: <>                                                                     (.)
1st Generation had 4 cells per modules. Each cell is 3.75 volts nominal with two 
pairs of parallel cells inside each module. This gives a module voltage of 7.5V.
The cells are a pouch style. Hypothetically, it would be possible to rewire wire 
the bus bars inside each module to give 15V per module with a smaller maximum 
current. However, this would be difficult to do and honestly not worth it. The 
goal is to make the battery easy to make and repair.

Nissan leaf battery have no active cooling system also, which severely reduces
their lifetime. The battery is literally a sealed container that relies on
conduction to remove heat. Therefore each of the modules are pretty poor at
removing heat and a new cooling system would have to be designed.

    Module voltage:         7.5V
    Module energy:          500Wh
    Module weight:          3.8kg
    Cell voltage:           3.75V
    Cell energy:            125Wh
    Cell amp-hour:          30Ah
    Number of modules:      48
    Battery voltage:        360V
    Battery energy:         24kWh
    Motor power:            80kW
    Battery max current:    222A

Module price: €100

    1.  number series cells = 201.6V / 7.5V = 28
    2.  total capacity/(cell capacity × cell voltage × number series cells)
        1.3kWh/(3Ah × 3.6V × 56) = 2.149 = 0.3714
        number parallel cells = 1
    3.  cell current = 222A

[//]: <>                                                                     (.)
The final battery would be 28s 210V 1p (60Ah cells with 222A max current).

    4. energy capacity = 60Ah × 1 × 210V  = 12.6kWh
    5. weight = 28 × 3.8kg = 106.4kg
       energy density  = 12.6kWh / 106.4kg = 118.4Wh/kg
    6. cost = 28 × €90 = €2520

#### Chevy volt

Pouch cells

#### BMW i3

Prismatic cells

#### Tesla Model S



#### Super capcitors

Reduces strain on battery and increases battery life

### Battery Management System

### Cooling

Original : Air
New : Liquid (Like a Tesla)