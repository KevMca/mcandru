---
title: "Recipe: A Daily Driven eBike"
date: 2022-05-21
slug: "/daily-driver-ebike"
author: "Michael McAndrew"
math: true
tags:
    - Bike
---

## Ingredients

| Component | Description | Price |
|-----------|-------------|-------|
| [1500W Hub Motor](https://www.aliexpress.com/item/32988879954.html) | Gearless (direct drive) hub motor | €192.28 |
| [Ryde Zac 200 Rim](https://www.bike24.com/p2315085.html) | 36 spoke for compatibility with the hub motor | €20.66 |
| [Salt BMX Spokes](https://www.bike24.com/p2429935.html) | 190mm required for the rim size used | €14.46 |
| [Enertion Focbox VESC Motor Controller](https://street-wing.com/product/enertion-focbox-vesc-x/) | 48V at about 35A minimum required to power the motor at full power | €140 |
| [Hailong Battery pack](https://www.pswpower.com/products/no-tax-electric-bike-battery-48v-175ah-downtube-hailong-plus-samsung-cells-pack-ebike-lithium-30a-60a-bms-output-1000w-160) | 48V and 20Ah | €170 |
| [eBike Throttle](https://www.amazon.com/Universal-Throttle-Control-Electric-Scooters/dp/B07KK145CK/ref=sr_1_2?keywords=ebike+throttle&qid=1653175772&sr=8-2) | | €10 |

*Note: The price and availability of components varies wildly. Apologies if the prices given are no longer accurate or links provided no longer work.*

## Parameters

**Motor Power**

If you don't need a really powerful eBike capable of 55-60km/h, you can choose one of the smaller motor options. Note that smaller motors are geared, which is better for range and torque but worse for reliability as the plastic gears wear over time.

Choosing a smaller size motor can reduce not only motor cost, but also battery and motor controller cost too. This is because the motor controller provides less continuous power to the motor, as does the battery and range is typically improved significantly.

You can calculate the current required to be provided by the battery and controller using: $I = \frac{P}{V}$

| Motor Power | Motor Voltage | Continuous Current | Burst Current |
|-------------|---------------|--------------------|---------------|
| 250W        | 36V           | 3.5A               | 7A            |
| 250W        | 48V           | 2.75A              | 5.5A          |
| 500W        | 36V           | 7A                 | 14A           |
| 500W        | 48V           | 5.25A              | 10.5A         |
| 1000W       | 48V           | 10.5A              | 21A           |
| 1500W       | 48V           | 16A                | 32A           |



**Motor Compatibility with your Bicycle**

The most important number is the Over-Lock-nut dimension (O.L.D). It is a measurement of how wide your seat stays where the hub is mounted. If the stays are only a small bit narrower, you should be able to widen them slightly without damaging the bicycle. Likewise, if the stays are slightly too wide, you can narrow them safely.

**Rim size**

This will depend on the frame size and previous rim sizes used on your bicycle. The most common rim size is 700C. To use the rim with the hub motor I have linked, you will need 36 spokes.

**Spoke length**

You can calculate the spoke length using a [spoke calculator](https://ebikes.ca/tools/spoke-calc.html?hub=cust_d235_s32_o0_n36_l142_h3_p41.0&pair=false&rim=cust_dia622_e595_lo1_ro1_w28). You will need the diameter and O.L.D of the hub motor, the size of rim and its the effective rim diameter (ERD) to calculate the spoke length. If using a 700C rim with the 1500W hub motor, you will need 190mm spokes. I highly recommend buying pre-cut spokes of the correct length rather than cutting longer spokes to length to make truing the bicycle later easier.

## Method

1. Build the wheel
    - You can check out [Kevin's wheel building post here](https://www.mcand.ru/posts/building-a-wheel/).
    - You can choose either to true the wheel yourself or for about €20 or so you could have a bicycle shop true it for you.
    - It is particularly important on an eBike that the wheel is true for smoothness of ride and wheel structural integrity
    - Place the freewheel or casette on the wheel before installation
2. Mount the wheel
3. Mounting the other components
4. Configure FOC (https://www.mcand.ru/posts/vesc-foc/)
5. Build a controller box
6. Take her for a shpin
