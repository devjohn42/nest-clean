### Windows Usar Git Bash ###

#### Private_Key

> openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048``

> openssl rsa -pubout -in private_key.pem -out public_key.pem

```Obs : base64 -w 0: Converte a entrada em base64, evitando quebras de linha.```

#### Public_Key

> base64 -w 0 private_key.pem > private_key-base64.txt

> base64 -w 0 public_key.pem > public_key-base64.txt