chars = ['a', 'b', 'c', 'd', 'e', 'f', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']


window.onload = async function () {
    const publicKeyField = document.getElementById('public-key')
    const DES_k1 = document.getElementById('DES-k1')
    const DES_k2 = document.getElementById('DES-k2')
    const DES_k3 = document.getElementById('DES-k3')
    const btn = document.getElementById('send-btn')


    // GET RSA API
    const publicRSA_res = await fetch("/RSA")
    const publicRSA_data = await publicRSA_res.json()
    const e = publicRSA_data.E
    const n = publicRSA_data.n
    publicKeyField.innerText = `(${e}, ${n})`


    // POST 3DES encrypted message
    btn.addEventListener("click", async () => {

        k1 = DES_k1.value
        k2 = DES_k2.value
        k3 = DES_k3.value

        cipher_k1_List = []
        cipher_k2_List = []
        cipher_k3_List = []

        for (i = 0; i < k1.length; i++) {
            word = chars.indexOf(k1.charAt(i))
            char = encrypt(word, e, n)
            cipher_k1_List.push(char)
        }

        for (i = 0; i < k2.length; i++) {
            word = chars.indexOf(k2.charAt(i))
            char = encrypt(word, e, n)
            cipher_k2_List.push(char)
        }

        for (i = 0; i < k3.length; i++) {
            word = chars.indexOf(k3.charAt(i))
            char = encrypt(word, e, n)
            cipher_k3_List.push(char)
        }


        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                cipher_k1_List,
                cipher_k2_List,
                cipher_k3_List
            }),
        }

        const res = await fetch("/RSA", options)
        const resData = await res.json()

        cipherMessage = resData.cipherData
        plainMessage = []

        for (i = 0; i < cipherMessage.length; i++) {

            let plainBlock = decode(bin(cipherMessage[i]), k1);
            plainBlock = encode(bin(plainBlock), k2);
            plainBlock = decode(bin(plainBlock), k3);

            ASCIIBlock = hexToASCII(plainBlock)
            plainMessage.push(ASCIIBlock)
        }

        console.log(plainMessage.join(""))
    })

}