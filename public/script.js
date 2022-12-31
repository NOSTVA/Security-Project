chars = [' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
    'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
    'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
    'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
    'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
]


window.onload = async function () {

    const publicKeyField = document.getElementById('public-key')
    const messageRSAField = document.getElementById('RSA-message-Field')
    const btnRSA = document.getElementById('send-RSA-btn')
    const message3DES = document.getElementById('3DES-message-Field')
    const btn3DES = document.getElementById('send-3DES-btn')


    function encodeRSA(msg, e, n) {
        return BigNumber(msg).exponentiatedBy(e).modulo(n).toNumber();
    }


    // GET RSA API
    const publicRSA_res = await fetch("/RSA")
    const publicRSA_data = await publicRSA_res.json()
    const e = publicRSA_data.E
    const n = publicRSA_data.n
    publicKeyField.innerText = `(${e}, ${n})`

    // POST RSA encrypted message
    btnRSA.addEventListener("click", async () => {
        let msg = messageRSAField.value
        var cipherList = []

        if (msg != "") {
            for (i = 0; i < msg.length; i++) {
                char = encodeRSA(chars.indexOf(msg[i]), e, n)
                cipherList.push(char)
            }
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    cipherList
                }),
            }
            const res = await fetch("/RSA", options)
            const resData = await res.json()
            console.log(resData)
        }
    })




    // GET 3DES API
    const DES_res = await fetch("/DES")
    const DES_data = await DES_res.json()
    const key1 = DES_data.k1
    const key2 = DES_data.k2

    // POST RSA encrypted message
    btnRSA.addEventListener("click", async () => {
        let msg = bin(message3DES.value);

        if (msg.length == 16) {
            let tripleEnc = encode(msg, key1);
            tripleEnc = decode(bin(tripleEnc), key2);
            tripleEnc = encode(bin(tripleEnc), key1);
            console.log(tripleEnc);

            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    tripleEnc
                }),
            }
            const res3DES = await fetch("/DES", options)
            const res3DESData = await res3DES.json()
            console.log(res3DESData)
        }
    })

}