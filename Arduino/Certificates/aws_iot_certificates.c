/*
 * Copyright 2010-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * Additions Copyright 2016 Espressif Systems (Shanghai) PTE LTD
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *  http://aws.amazon.com/apache2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

/**
 * @file aws_iot_certifcates.c
 * @brief File to store the AWS certificates in the form of arrays
 */

#ifdef __cplusplus
extern "C" {
#endif

const char aws_root_ca_pem[] = {"-----BEGIN CERTIFICATE-----\n\
MIIDQTCCAimgAwIBAgITBmyfz5m/jAo54vB4ikPmljZbyjANBgkqhkiG9w0BAQsF\n\
ADA5MQswCQYDVQQGEwJVUzEPMA0GA1UEChMGQW1hem9uMRkwFwYDVQQDExBBbWF6\n\
b24gUm9vdCBDQSAxMB4XDTE1MDUyNjAwMDAwMFoXDTM4MDExNzAwMDAwMFowOTEL\n\
MAkGA1UEBhMCVVMxDzANBgNVBAoTBkFtYXpvbjEZMBcGA1UEAxMQQW1hem9uIFJv\n\
b3QgQ0EgMTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALJ4gHHKeNXj\n\
ca9HgFB0fW7Y14h29Jlo91ghYPl0hAEvrAIthtOgQ3pOsqTQNroBvo3bSMgHFzZM\n\
9O6II8c+6zf1tRn4SWiw3te5djgdYZ6k/oI2peVKVuRF4fn9tBb6dNqcmzU5L/qw\n\
IFAGbHrQgLKm+a/sRxmPUDgH3KKHOVj4utWp+UhnMJbulHheb4mjUcAwhmahRWa6\n\
VOujw5H5SNz/0egwLX0tdHA114gk957EWW67c4cX8jJGKLhD+rcdqsq08p8kDi1L\n\
93FcXmn/6pUCyziKrlA4b9v7LWIbxcceVOF34GfID5yHI9Y/QCB/IIDEgEw+OyQm\n\
jgSubJrIqg0CAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAOBgNVHQ8BAf8EBAMC\n\
AYYwHQYDVR0OBBYEFIQYzIU07LwMlJQuCFmcx7IQTgoIMA0GCSqGSIb3DQEBCwUA\n\
A4IBAQCY8jdaQZChGsV2USggNiMOruYou6r4lK5IpDB/G/wkjUu0yKGX9rbxenDI\n\
U5PMCCjjmCXPI6T53iHTfIUJrU6adTrCC2qJeHZERxhlbI1Bjjt/msv0tadQ1wUs\n\
N+gDS63pYaACbvXy8MWy7Vu33PqUXHeeE6V/Uq2V8viTO96LXFvKWlJbYK8U90vv\n\
o/ufQJVtMVT8QtPHRh8jrdkPSHCa2XV4cdFyQzR1bldZwgJcJmApzyMZFo6IQ6XU\n\
5MsI+yMRQ+hDKXJioaldXgjUkK642M4UwtBV8ob2xJNDd2ZhwLnoQdeXeGADbkpy\n\
rqXRfboQnoZsG4q5WTP468SQvvG5\n\
-----END CERTIFICATE-----\n"};

const char certificate_pem_crt[] = {"-----BEGIN CERTIFICATE-----\n\
MIIDWjCCAkKgAwIBAgIVAO6mK8EIeNIx53kijmzMzi1R7V68MA0GCSqGSIb3DQEB\n\
CwUAME0xSzBJBgNVBAsMQkFtYXpvbiBXZWIgU2VydmljZXMgTz1BbWF6b24uY29t\n\
IEluYy4gTD1TZWF0dGxlIFNUPVdhc2hpbmd0b24gQz1VUzAeFw0xOTA1MTIwMTI1\n\
NDBaFw00OTEyMzEyMzU5NTlaMB4xHDAaBgNVBAMME0FXUyBJb1QgQ2VydGlmaWNh\n\
dGUwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQD02sA9fc7WgHuZszq/\n\
uiLblxidKAP7JUrn60Ee+306nYNorVB1ne5cc/FehpMuMzMD4GM9qUzOj8Wba84L\n\
HovD/5XzVOlwlnGhdgKqdXKCKSE61PxfpxTy3AAXHMMYT7YImhd8toP0YBHJUq+d\n\
QHtfFMqNckOLlqvOZqOdefmB2RYr+BHRQg1JnxIjeSuOKmRFRLHZCCap+86XMK1z\n\
L6QXP4YJ6YkVUYxP90ux01sXI7GIckv6M53MeIgUwlaV3qejYLZZyuEnZ25I0iHx\n\
QxGI8CLrSB7iO4SUogvxNMV1KUsQTrP4SM/REjRxOXEAtdXf6gsuSWgCLOFK1dZt\n\
E1SxAgMBAAGjYDBeMB8GA1UdIwQYMBaAFMMQNEbeB9YDFaQdBId+IA3KTgTmMB0G\n\
A1UdDgQWBBQY+XWViorR8WxbVGuFUr+q9K9tpzAMBgNVHRMBAf8EAjAAMA4GA1Ud\n\
DwEB/wQEAwIHgDANBgkqhkiG9w0BAQsFAAOCAQEA0CAcVnfViMX0o4E8C2FytZws\n\
KpMywGia3xKCdpgP1XqSYAS6GzH6RlzvJSR2B4YHKurp69O6lKG76rS5l0QzlacX\n\
QSeXBiKAyrBDJu/mp+/Qnk9YWqfRkVg/AH61IOJYyxrFxvOJrLNH00/NiVtauSS2\n\
P7Q1chc/l5oYzk5k2AshuX4kKVUR5BIqQRJsEG/dVNW3GtFtec6CzjBYxlkgXSYz\n\
WReRLeIO2BqsHWYJoyA9huzQHwsFGhOWr/F1Q84DNU4/M8EVjKWoMBkX5ZY/mRdz\n\
NCos5af3ehNtXtnlcuKX/XmEPNFttwrDCDJ69CNHTQoTCp2mU9EJN/qbpsrCuw==\n\
-----END CERTIFICATE-----\n"};

const char private_pem_key[] = {"-----BEGIN RSA PRIVATE KEY-----\n\
MIIEowIBAAKCAQEA9NrAPX3O1oB7mbM6v7oi25cYnSgD+yVK5+tBHvt9Op2DaK1Q\n\
dZ3uXHPxXoaTLjMzA+BjPalMzo/Fm2vOCx6Lw/+V81TpcJZxoXYCqnVygikhOtT8\n\
X6cU8twAFxzDGE+2CJoXfLaD9GARyVKvnUB7XxTKjXJDi5arzmajnXn5gdkWK/gR\n\
0UINSZ8SI3krjipkRUSx2QgmqfvOlzCtcy+kFz+GCemJFVGMT/dLsdNbFyOxiHJL\n\
+jOdzHiIFMJWld6no2C2WcrhJ2duSNIh8UMRiPAi60ge4juElKIL8TTFdSlLEE6z\n\
+EjP0RI0cTlxALXV3+oLLkloAizhStXWbRNUsQIDAQABAoIBAD3eyJTBJXKuJI1B\n\
7KZlskkqdN3BLsBXPAY+O8ZIZexZwMrCgII31fMmmOb5ulcCOPHR0UHTdcT8L0KG\n\
ixnkLgzomEtUOWhpm2zhFOtdogGhwvPKvbqtzW1QifVNHz8VZTnnNegddlpZrCTi\n\
790cXhA4gLYdGVQ8Tk1pQg6Ys6NLaPXs/VBI9sxjgsnP+F2r5xz7Rlbp4lOD2TSf\n\
0JL7ECyWwTsBItIlYploorNGBlqx7n/pFmTBkddiv065GkexNgfiLrrYMk6RCNJx\n\
yr0uuoS0M+MQGLxiEyAltXkqNbiyoCdb/LNNl/QMpS0c/I7J1H3K7MDjwAvuOlwT\n\
XNWYFMECgYEA/Rb8hLrBpu/+shgrZPBYwOVG9Zgmga8tR36xKTzmCWDDP+hCft5D\n\
E3tj/txHn/JVZVtzgg6rCKP46aMRUI8KrOnu+55ZHBlx+ur+2xD/SWBVHops5hpW\n\
hlAsZ0NZAYXa3ZhoGzJiYQn2VLtzvFMhMekPoiKB8+r7cdYTHI3NiW8CgYEA96uF\n\
xApI4q5ORSAJuQyQBLDV3J8dmyBOs7vaNgIqY+6Gct+TSTyeWi2xSe3l3MVzYWs1\n\
WqYnha86wQylQl23E1Fu6Aq8BEUQi04UH8/LNO+8hd+uhIWv0nQPZ1sA4lAiwicU\n\
St74UJOXJ8iJc7ExKGwaTyPDe0S7G7Hju3cQs98CgYBDs3FrI/YHbO2JwHNjNfPX\n\
7b0Ul1W9nRmUpWxIprS2T38LSlr3SwdQX9J4633xaEa1rUfxw3C3B/3eqbNJBGqL\n\
pKw7/LjDjn7x6wivmxVfEHjUiZzl1KfOmAW4vchCYwcP/ePjWo/8e0i8k8Q63VXk\n\
3v5Clc6DbBlE80n7emc/2wKBgQCf0kSQvB5KgTaq7sC3dD7feAmZw+gD+bYvz7JB\n\
leYq9Ho4WMQfx4lcIg486dKiQ5xwKhGU/JGWd/xPJUzjZbxFMBCElqC7lKHXczwT\n\
RzEXaPjb3vssM2TBRvnFtXj9kb7MURGMOxQ8UvGAz6y7RoW1UwUrOqXjvveLKKEP\n\
kQbrOwKBgBEcTg0wdJxn868vZNOGbNAmZWiKoXaUjH1k3fOqlfIuE8f1RfvlmyjQ\n\
GEHg02JPtrxdzANwK/fmH2s5g0PkTu6FxM7mdkFpB7ARoynArCTRYttQJT3DV/cv\n\
SQv/m8RH2mMKjTFSZxAY6RanlW1VcQ71+pMatkZAyuP4FF5lxuRV\n\
-----END RSA PRIVATE KEY-----\n"};


#ifdef __cplusplus
}
#endif