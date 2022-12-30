chars = [ ' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
'M', 'N', 'O', 'P', 'Q', 'R',  'S', 'T', 'U', 'V', 'W', 'X',
'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
'm', 'n', 'o', 'p', 'q', 'r',  's', 't', 'u', 'v', 'w', 'x',
'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ]


window.onload = async function() {

const publicKeyField = document.getElementById('public-key')
const messageRSAField = document.getElementById('RSA-message-Field')
const btnRSA = document.getElementById('send-RSA-btn')

function encrypt(msg, e, n)  {
    return BigNumber(msg).exponentiatedBy(e).modulo(n).toNumber();
}


// GET RSA API
const publicRSA_res = await fetch("/RSA")
const publicRSA_data = await publicRSA_res.json()
const e = publicRSA_data.E
const n = publicRSA_data.n

publicKeyField.innerText = `(${e}, ${n})`


// POST encrypted message
btnRSA.addEventListener("click", async () => {

    msg = messageRSAField.value
    var cipherList = []
    for (i=0; i<msg.length; i++) {
        char = encrypt(chars.indexOf(msg[i]), e, n)
        cipherList.push(char)
    }
    
    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({cipherList}),
    }

    const res = await fetch("/RSA", options)
    const resData = await res.json()
    console.log(resData)

    


})




}