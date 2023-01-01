chars = ['a', 'b', 'c', 'd', 'e', 'f', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

const express = require('express')
const router = express.Router()
const {
    e,
    modular_inverse,
    decrypt
} = require('../controllers/RSA')



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





router.post('/', async (req, res) => {


    cipherList1 = req.body.cipher_k1_List
    cipherList2 = req.body.cipher_k2_List
    cipherList3 = req.body.cipher_k3_List

    k1_List = []
    k2_List = []
    k3_List = []

    for (i = 0; i < cipherList1.length; i++) {
        char = decrypt(cipherList1[i], d, n)
        k1_List.push(chars[char])
    }

    for (i = 0; i < cipherList2.length; i++) {
        char = decrypt(cipherList2[i], d, n)
        k2_List.push(chars[char])
    }

    for (i = 0; i < cipherList3.length; i++) {
        char = decrypt(cipherList3[i], d, n)
        k3_List.push(chars[char])
    }


    k1 = k1_List.join('')
    k2 = k2_List.join('')
    k3 = k3_List.join('')

    msg = "9854ffabefbb908a"

    let tripleDec = encode(bin(msg), k1);
    tripleDec = decode(bin(tripleDec), k2);
    tripleDec = encode(bin(tripleDec), k3);

    console.log(tripleDec)
    res.json({
        tripleDec
    })

})


router.get('/', (req, res) => {
    res.json({
        E: E,
        n: n
    })
})

module.exports = router