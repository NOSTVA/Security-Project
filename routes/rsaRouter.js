chars = ['a', 'b', 'c', 'd', 'e', 'f', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

const express = require('express')
const router = express.Router()
const {
    e,
    modular_inverse,
    decrypt
} = require('../controllers/RSA')

const {
    hexToASCII,
    decToHexa,
    ASCIItoHEX
} = require('../controllers/hex_acii')

const {
    encode,
    decode,
    bin
} = require('../controllers/DES')

p = 11
q = 7
n = p * q
phi = (p - 1) * (q - 1)
E = e(phi)
d = modular_inverse(E, phi)


router.get('/', (req, res) => {
    res.json({
        E: E,
        n: n
    })
})

router.post('/', async (req, res) => {

    const {
        cipher_k1_List,
        cipher_k2_List,
        cipher_k3_List
    } = req.body

    k1_List = []
    k2_List = []
    k3_List = []

    for (i = 0; i < cipher_k1_List.length; i++) {
        char = decrypt(cipher_k1_List[i], d, n)
        k1_List.push(chars[char])
    }

    for (i = 0; i < cipher_k2_List.length; i++) {
        char = decrypt(cipher_k2_List[i], d, n)
        k2_List.push(chars[char])
    }

    for (i = 0; i < cipher_k3_List.length; i++) {
        char = decrypt(cipher_k3_List[i], d, n)
        k3_List.push(chars[char])
    }


    k1 = k1_List.join('')
    k2 = k2_List.join('')
    k3 = k3_List.join('')


    var message = "0123456789asdassd()^&$%^@#$";
    chipherData = []

    for (i = 0; i < message.length; i++) {
        char = message.charAt(i)
        hexChar = ASCIItoHEX(char).padEnd(16, '0')

        let chipherChar = encode(bin(hexChar), k1);
        chipherChar = decode(bin(chipherChar), k2);
        chipherChar = encode(bin(chipherChar), k3);

        chipherData.push(chipherChar)
    }

    res.json({
        chipherData
    })
})

module.exports = router