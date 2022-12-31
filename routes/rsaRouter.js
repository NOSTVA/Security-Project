chars = [' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
    'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
    'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
    'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
    'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
]

const express = require('express')
const router = express.Router()
const {
    e,
    modular_inverse,
    decrypt
} = require('../controllers/RSA')

p = 11
q = 7
n = p * q
phi = (p - 1) * (q - 1)
E = e(phi)
d = modular_inverse(E, phi)





router.post('/', async (req, res) => {
    cipherList = req.body.cipherList
    msgList = []
    for (i = 0; i < cipherList.length; i++) {
        char = decrypt(cipherList[i], d, n)
        msgList.push(chars[char])
    }

    console.log("(RSA) Encrypted message: ", cipherList.join(''))
    console.log("(RSA) Decrypted message: ", msgList.join(''))
    res.json({
        message: '(RSA) Message received!'
    })
})


router.get('/', (req, res) => {
    res.json({
        E: E,
        n: n
    })
})

module.exports = router