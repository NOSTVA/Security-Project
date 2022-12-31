function gcd(a, b) {
    if (b == 0) return a
    else return gcd(b, a % b)
}

function modular_inverse(e, phi) {
    for (d = 1; d < phi; d++) {
        if ((e * d) % phi == 1) return d
    }
    return -1
}

function e(phi) {
    let e = 2
    while (e < phi) {
        if (gcd(e, phi) == 1) break
        else e++
    }
    return e
}

function decrypt(cipher, d, n) {
    return BigNumber(cipher).exponentiatedBy(d).modulo(n).toNumber();
}

function encrypt(msg, e, n) {
    return BigNumber(msg).exponentiatedBy(e).modulo(n).toNumber();
}