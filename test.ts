import crypto from 'node:crypto';

const getSHA256Hash = (input: string) => (key: string) => input + "." + crypto.createHash("sha256").update(input + key).digest('hex');


const ShaVerify = (key: string) => (token: string) => (
  index =>
    index !== -1 && crypto.createHash("sha256").update(token.substring(0, index) + key).digest('hex') === token.substring(index + 1, token.length)

)(
  token.indexOf(".")
)


const inputString = '01234567890123456789012345678912';
const key = "0".repeat(63)
const sha256Hash = getSHA256Hash(inputString);
const token = getSHA256Hash(inputString)(key)
const verify = ShaVerify(key)

console.log(ShaVerify(key)(getSHA256Hash(inputString)(key)))

Deno.bench("check", () => { verify(token) })

