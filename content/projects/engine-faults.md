---
title: Engine Fault Diagnosis by Audio Analysis
draft: false
status: done
owners:
  - Michael McAndrew
tags: 
  - fault-detection
timeline:
  - name: RPM Detection
    date: 2020-10-12
    status: done
    description: |
      To acquaint myself with audio analysis techniques, my first task is to determine the RPM of the
      engine from its sound. I opted to perform a Fast Fourier Transform on the audio and find the
      fundamental frequency of the cylinders firing to determine the RPM.
  - name: Misfire Detection
    date: 2020-10-27
    status: done
    description: |
      Misfires occur when the fuel and air mixture in a cylinder doesn't combust. This can be caused by spark plug,
      injector or coilpack faults. To find a misfire, I used a Fast Fourier Transform and used harmonics of the
      fundamental frequency of the cylinders and the presence of intermediate frequencies between the harmonic
      frequencies to determine a misfire.
  - name: Relative Compression
    date: 2021-03-24
    status: done
    description: |
      Cylinder compression is a great metric for determining engine health. If a cylinders compression varies greatly
      from others, it is often an indicator of poor engine condition. I used the sound of the starter motor cranking
      the engine to determine the relative compression of each cylinder.
    
---

 I am currently completing an MCS in Computer Science. My masters dissertation is on Engine Fault Detection
 using audio analysis. The goal of the project is to find out, to what degree can Internal Combustion Engine
 health can be determined by using a smartphone microphone.

The idea originated from a tappet sound on my infamous 2002 Audi TT. At the time, I didn't have enough knowledge
or experience in the field to identify the sound. However, an expert mechanic could instantly identify the tappet
sound and recommend a fix.

At the most basic level, this project could prove useful to create a tool that identifies basic faults for a
non-mechanic. If the project is more successful, it may very well be able to identify faults from sound that
even an expert mechanic is unable to notice.
