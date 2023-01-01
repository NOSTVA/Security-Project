function hexToASCII(hex) {
    var ascii = "";

    for (var i = 0; i < hex.length; i += 2) {
        var part = hex.substring(i, i + 2);

        var ch = String.fromCharCode(parseInt(part, 16));

        ascii = ascii + ch;
    }
    return ascii;
}

function decToHexa(n) {

    var hexaDeciNum = new Array(100).fill(0);

    var i = 0;

    while (n !== 0) {
        var temp = 0;

        temp = n % 16;

        if (temp < 10) {
            hexaDeciNum[i] = String.fromCharCode(temp + 48);
            i++;
        } else {
            hexaDeciNum[i] = String.fromCharCode(temp + 87);
            i++;
        }

        n = parseInt(n / 16);
    }

    var ans = "";

    for (var j = i - 1; j >= 0; j--) {
        ans += hexaDeciNum[j];
    }

    return ans;
}

function ASCIItoHEX(ascii) {
    var hex = "";

    for (var i = 0; i < ascii.length; i++) {
        var ch = ascii[i];

        var tmp = ch.charCodeAt(0);

        var part = decToHexa(tmp);

        hex += part;
    }

    return hex;
}