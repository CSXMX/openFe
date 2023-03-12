// aes加密函数
// import CryptoJS from 'crypto-js'
// const aesEncrypt = (iv, word, keyStr) => {
//     const text = word instanceof Object ? JSON.stringify(word) : word
//     const key = CryptoJS.enc.Utf8.parse(keyStr)
//     const encryptedObj = CryptoJS.AES.encrypt(
//         CryptoJS.enc.Utf8.parse(text),
//         key, {
//             iv: CryptoJS.enc.Utf8.parse(iv),
//             mode: CryptoJS.mode.CBC,
//             padding: CryptoJS.pad.Pkcs7,
//         },
//     )
//     return encodeURIComponent(encryptedObj.toString())
// }
// // aes解密函数
// const aesDecrypt = (iv, word, keyStr) => {
//     const key = CryptoJS.enc.Utf8.parse(keyStr)
//     const decrypt = CryptoJS.AES.decrypt(decodeURIComponent(word), key, {
//         iv: CryptoJS.enc.Utf8.parse(iv),
//         mode: CryptoJS.mode.CBC,
//         padding: CryptoJS.pad.ZeroPadding,
//     })
//     const decString = CryptoJS.enc.Utf8.stringify(decrypt).toString()
//     const endString = decString.split('}').slice(0, -1).join('}') + '}'
//     return endString
// }
// export {
//     aesDecrypt,
//     aesEncrypt,
// }