---
title: "Reverse Engineering EU Covid Certs"
date: 2021-11-09
slug: "/covid-certificate"
author: "Michael McAndrew"
draft: true
tags:
  - covid
  - certificate
  - pki
---

After coming back from my first trip abroad in a year and a half, I was
really impressed by just how well the EU Green Certificate system worked.
There is certainly some level of bureaucracy involved in being
issued with a certificate by the local pharmacist that an agitated tourist
attration worker can verify.

So while I don't know much about bureaucracy, I do know a thing or too about the
technology that underpins some of it these days. I thought I'd write a note
here on how all of this works.

## High level Summary

There are three parties, the issuer (the HSE), the holder (me) and the verifier
(tourist attraction employee).

When you are fully vaccinated, your name, date-of-birth, country
of issuance and vaccination details are concatenated together and stored in the
form of a QR code. This information is then _digitally signed_ by
the private key of the issuer (The HSE in the case of Ireland). They then send
this _signed_ code to you, the holder, via an email. Digitally signed is just
a fancy term for encrypted by a private key that only the issuer knows.

When I show up at my tourist attraction of choice, the employee scans the QR code,
pulls the public key for the issuing country (Ireland) and can now verify using
this public key, if the information contained in the QR code was signed by the
Irish state. To do this, the verifier app they use decrypts the QR code information
signed by the issuer using the public key and compares both hashes. If the decrypted data
matches the data on the QR code, then the vaccine certificate has been verified.

Then the employee typically asks for a form of ID (passport or EU drivers license)
to check that the name and date-of-birth match the certificate and you're good to go.

There is quite a lot of detail missing from this so for those with an interest
in the concrete, let's dig in a bit more.

## Chains of trust

The EU is a big circle of friends and as such they all trust each other unequivocally.
In all seriousness though, a _chain of trust_ is what really allows this vaccine certificate
stuff to work.

Most EU countries have introduced Covid-19 certificates in the form of a
QR code that can be read and verified. This is important so that it
can be said with confidence that the certificate was created for the individual
with the given information.

I was interested in what my own certificate QR code contained,
how it can be decoded and verified.

## Decoding a certificate

This wasn't too difficult to do. I scanned the QR code on my cert and I
got the following data:

```
HC1:6BF%RN%TSMAHN-H+UOJPPMYDOMP83S:D40.K%CMU*KB8JY2Q4.I4$RD5QB.SMMD/
GPWBILC9GGBYPL:SS4ES+-3:CO-B5ET42HPPEPHCR7XB+DPN95*28OVQAC5ADNA2PI+
MUKM1Q4IZ6QR8508XIORW6%5LKP89TMHW6 96IV4BD7XG8CU6O8QGU68ORJSPZHQ4ZQ 
SPE64.GO400YZHBW9MXHFV3K*LYUI%F1PN1/T1J$HTR9/O1 SI5K1*TB3:U-1VVS1UU1
$%H4SI3RU 2Q+E93ZM$96PZ6+Q6X46*PP:+P*.1D9R7Q0Q.C$JC+0KF0JEYI1DLZZLUC
II7JSTNSA7G6M12S8ZQ:XOR.QB95W16W27 96P*K1-MR95D261:62A7.966/4+Y56T4.
CRQNQ.Y4%W64A7E:7LYPFTQ7XB3FQPCRTU7$C4-+S3LHZ6MYOUNFTR SKK7 2TP5RWG1
E-J45M69JA41ZC6Y8TDSTWXE.JUELC 54JR90$03SR79J--HS1U7KU JSLCN6MSFKN*I
2224U50QBWALP53
```

### Prefix

The `HC1` is a prefix that is used to version the QR Code. We are currently
on Health Certificate Version 1 but if in the future there is the need
to update the data contained in the cert, `HC2` can be used to denote
a new version.

There are also, interestingly enough, different prefixes for non-EU
countries which also use the same underlying method. For example,
in Norway they use the `NO1` prefix.

### Data Encoding

After the prefix is a whole bunch of base45 encoded data. When we decode
this information, 

## Problems

One major problem is that I was afraid to publish my cert in this post. If
the system was perfect, I could happily publish my cert publically and it
wouldn't cause any security or privacy issues. The problem arises with how
we verify certs in Ireland. All you need is a valid cert. The information
on the cert nearly never matters because they never check the information
with an ID.
