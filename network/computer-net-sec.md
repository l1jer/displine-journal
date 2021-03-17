# Computer and Network Security

- [Computer and Network Security](#computer-and-network-security)
  - [What is security?](#what-is-security)
    - [Objects](#objects)
    - [Content](#content)
  - [The definition of computer security](#the-definition-of-computer-security)
    - [The basic components](#the-basic-components)
    - [Attacks n threats](#attacks-n-threats)
  - [Security policy n machanism](#security-policy-n-machanism)
    - [Policy: a statement of what is, and is not allowed](#policy-a-statement-of-what-is-and-is-not-allowed)
    - [Mechanism: a procedure, tool, or method of enforcing a policy](#mechanism-a-procedure-tool-or-method-of-enforcing-a-policy)
  - [Cryptography](#cryptography)
    - [Overview](#overview)
      - [Basic terminology](#basic-terminology)
      - [Classification of Cryptography](#classification-of-cryptography)
      - [Secret Key vs. Secret Algorithm](#secret-key-vs-secret-algorithm)
      - [cryptanalysis scheme](#cryptanalysis-scheme)
      - [Unconditional vs Computational Security](#unconditional-vs-computational-security)
      - [Brute Force Search](#brute-force-search)
    - [Classical Symmetric Cipher](#classical-symmetric-cipher)
      - [Substitution Cipher](#substitution-cipher)
        - [Model](#model)
        - [Requirements](#requirements)
        - [Classical Substitution Ciphers](#classical-substitution-ciphers)
        - [Caesar Cipher](#caesar-cipher)
      - [Transposition Cipher](#transposition-cipher)
    - [Modern Symmetric Cypher](#modern-symmetric-cypher)

## What is security?

### Objects

- Understand the basic principles for information and communication security, and be able to apply these principles to evaluate and criticize information system security properties

- Be able to use some important and popular security tools, like encryption, digital signatures, firewalls, **intrusion detection systems** (IDS)

- Be able to identify the vulnerability of the Internet, and networks (e.g. IoT, IIoT, Wireless, Cellular,..) and recognize the mechanisms of the attacks, and apply them to design and evaluate counter-measure tools

### Content

- Cryptography
  - Secret key algorithms: DES/AES
  - Public key algorithms: RSA
  - One way hash functions & message digests: MD5, SHA2
- Authentication, access control, public key infrastructure (PKI, briefly)
  - Case study: Kerberos
- Internet vulnerability
  - Denial-of-service attacks
  - Viruses, worms, Trojan horses
- Securing the Internet
  - Intrusion detection systems (IDSs): host vs. network-based, signature vs. statistical detection
  - Case study: Snort and Bro
- Wireless network security
  - Wireless network Architecture and design
  - Wireless networks security and analysis
- IoT and Cellular networks security
  - IoT network architecture and design
  - IoT networks security and Analysis

## The definition of computer security

- _Security_ is a state of well-being of information and infrastructures in which the possibility of successful yet undetected theft, tampering, and disruption of information and services is kept low or tolerable
- _Security_ rests on confidentiality, authenticity, integrity, and availability

### The basic components

- **Confidentiality**(保密性) is the concealment of information or resources.
  - E.g., only sender, intended receiver should “understand” message contents
- **Authenticity** (真实性) is the identification and assurance of the origin of information.
- **Integrity** (完整性) refers to the trustworthiness of data or resources in terms of preventing improper and unauthorized changes.
- **Availability** (可用性) refers to the ability to use the information or resource desired.

### Attacks n threats

- Eavesdropping(窃取) (attack on confidentiality 保密性攻击) - message interception 消息拦截
  - Unauthorized access to information 未授权获取信息
  - Packet sniffers and wiretappers 数据包嗅探器和窃听器
  - Illicit copying of files and programs 非法复制文件及程序
- Integrity Attack - Tampering With Messages 消息干预
  - Stop the flow of the message
  - Delay and optionally modify the message
  - Release the message again
- Authenticity Attack - Fabrication (伪造授权)
  - Unauthorized assumption of other’s identity (伪造授权)
  - Generate and distribute objects under this identity (生成并分发授权)
- Attack on Availability
  - Destroy hardware (cutting fiber) or software
  - Modify software in a subtle way (alias commands)
  - Corrupt packets in transit
  - Blatant (公然的) denial of service(DoS):
    - Crashing the server
    - Overwhelm the server (use up its resource)

## Security policy n machanism

### Policy: a statement of what is, and is not allowed

### Mechanism: a procedure, tool, or method of enforcing a policy

- Security mechanisms(机制) implement function that help prevent, detect, and respond to recovery from security attacks
- Security functions are typically made available to users as a set of security services through APIs or integrated interfaces.
- Cryptography underlies many security mechanisms

## Cryptography

### Overview

#### Basic terminology

- Plaintext //ptxt
- Ciphertext //the coded message, ctxt
- Cipher //algorithm for transforming plaintext to ciphertext
- Key // info used in cipher known only to sender/receiver
- Encipher (encript) // converting ptxt to ctxt
- Decipher (decript) // recovering ctxt from ptxt
- Cryptography // study of encryption principles/methods
- Cryptanalysis (codebreaking) // the study of principles/methods of deciphering ciphertext w/out knowing key
- Cryptology // the field of both cryptography n cryptanalysis

#### Classification of Cryptography

- Number of keys used
  - hash functions: no key
  - secret key cryptography: one key
  - public key cryptography: two keys(public n private)
- Type of encryption operations used
  - substitution/transposition/product
- Way in which ptxt is processed
  - block (combines different numbers/characters/bits/bytes in one block) / stream(dealing with single byte or bit)
  - blockchain based on blocks but use different hash functions, other are as blocks

#### Secret Key vs. Secret Algorithm

- Secret algorithm: additional hurdle(障碍)
- hard to keep secret if used widely
  - reverse engineering,social engineering
- commercial: published
  - wide review, trust
- military: avoid giving info to enemy

#### cryptanalysis scheme

- Ciphertext only:
  - exhaustive search until 'recognizable plaintext'
  - need enough ciphertext
- known plaintext
  - secret may be revealed(by spy, time), thusciphertext, plaintext pair is obtained
- chosen plaintext
  - choose txt, get encrypted
  - pick pattern

#### Unconditional vs Computational Security

- Unconditional security
  - no matter how much computer power is available, the cipher cannot be broken
  - the ciphertxt provides insufficient info to uniquely determine the corresponding ptxt
  - only one-time pad scheme qualifies
- Computational security
  - the cost of breaking the cupher exceeds the value of theencrypted info
  - the time required to break the cipher exceeds the useful lifetime of the info

#### Brute Force Search

- simply try every key
- mostly attack is proportional to key size
- assume either know/recognise ptxt

| key size/bits | number of alternative keys      | time required at 1 decryption/us         | time required at 10 to 6th |
| ------------- | ------------------------------- | ---------------------------------------- | -------------------------- |
| 32            | 2 to the 32nd=4.3x10 to the 9th | 2 to the 31st ms=35.8 mins               | 2.15ms                     |
| 26 characters | 26!=4x10 to the 26th            | 2 x 10 to the 26th ms=6.4x10 to the 12th | 6.4x 10 to 6th years       |

### Classical Symmetric Cipher

#### Substitution Cipher

##### Model

Ptxt --> **Encryption algorithm(e.g. DES)** --transmitted ctxt--> **Decryption algorithm(reverse of encryption algorithm)** --> ptxt

**secret key** shared by sender n recipient

##### Requirements

- 2 reqirements for secure use of symmetric encryption:
  - a strong encryption algorithm
  - a secret key known only to sender/receiver
    - Y = Ek(X)
    - X = Dk(Y)
  - Assume encryption algorithm is known
  - Implies a secure channel to distribute key

##### Classical Substitution Ciphers

- Letters of ptxt are replaced by other letters or by numbers or symbols
- Ptxt is viewed as a sequence of bits, then substitution replaces ptxt bit patterns with ctxt bit patterns

##### Caesar Cipher

- earliest known substitution cipher
- replaces each letter by 3rd letter on:

```
meet me after the toga party
PHHW PH DIWHU WKH WRJD SDUWB

Define transformation as:
a b c d e f g h i j k l m n o p q r s t u v w x y z
D E F G H I J K L M N O P Q R S T U V W X Y Z A B C
```

Then have Caesar cipher as:
C = E(p) = (p + k) mod (26)
p = D(C) = (C –k) mod (26)

#### Transposition Cipher

### Modern Symmetric Cypher
