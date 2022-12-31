const express = require('express')
const router = express.Router()
const {
    encode,
    decode,
    bin
} = require('../controllers/DES')


// Triple DES Keys
let key1 = bin("ASDSDFDSDFDERFDS");
let key2 = bin("0DAE3BF4ECCAD161");

router.post('/', async (req, res) => {
    tripleEnc = req.body.tripleEnc

    //Decryption
    let tripleDec = decode(bin(tripleEnc), key1);
    tripleDec = encode(bin(tripleDec), key2);
    tripleDec = decode(bin(tripleDec), key1);

    console.log("(3-DES) Encrypted message: ", tripleEnc)
    console.log("(3-DES) Decrypted message: ", tripleDec)
    res.json({
        message: '(3-DES) Message received!'
    })
})


router.get('/', (req, res) => {
    res.json({
        k1: key1,
        k2: key2
    })
})

module.exports = router