const crypto = require('crypto');

// 生成RSA密钥对
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
});

// 将公钥保存到文件
const fs = require('fs');
fs.writeFileSync('public.pem', publicKey);

// 加载私钥
const privateKeyObj = crypto.createPrivateKey(privateKey);

// 加载公钥
const publicKeyObj = fs.readFileSync('public.pem');

// 要加密的数据
const data = Buffer.from('Hello, World!');

// 使用公钥加密数据
const encryptedData = crypto.publicEncrypt(publicKeyObj, data);

// 使用私钥解密数据
const decryptedData = crypto.privateDecrypt(privateKeyObj, encryptedData);

console.log("原始数据:", data.toString());
console.log("加密后的数据:", encryptedData.toString('base64'));
console.log("解密后的数据:", decryptedData.toString());

// 非对称加密方式我的理解是，使用该方式时，同时生成私钥和公钥，只能使用私钥对数据进行解密，任何人都可以使用公钥进行加密，别人即使获取加密后的数据没有公钥也无法获取具体信息