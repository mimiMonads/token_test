import verifier from "vixeny/components/tokens/verifier";
import signer from "vixeny/components/tokens/signer";
import crypto from 'node:crypto';
import { run, bench } from 'mitata'

const seed = "hello"
const key = "0".repeat(63)

const shaVerifier = (key: string) => (token: string) => (
  index =>
    index !== -1 && crypto.createHash("sha256").update(token.substring(0, index) + key).digest('hex') === token.substring(index + 1, token.length)

)(
  token.indexOf(".")
)
const getSHA256Hash = (key: string) => (input: string) => input + "." + crypto.createHash("sha256").update(input + key).digest('hex');
const signWithSha = getSHA256Hash(key)
const verifyWithSha = shaVerifier(key)


const token_8 = "12345678",
  token_16 = "1234567890123456",
  token_24 = "123456789012345678901234",
  token_32 = "12345678901234567890123456789012",
  token_40 = "1234567890123456789012345678901234567890"

const sign_8 = await signer({ seed: seed, size: 8 }),
  sign_16 = await signer({ seed: seed, size: 16 }),
  sign_24 = await signer({ seed: seed, size: 24 }),
  sign_32 = await signer({ seed: seed, size: 32 }),
  sign_40 = await signer({ seed: seed, size: 40 });

const sign_8_1 = await signer({ seed: seed, sequence: 1, size: 8 }),
  sign_16_1 = await signer({ seed: seed, sequence: 1, size: 16 }),
  sign_24_1 = await signer({ seed: seed, sequence: 1, size: 24 }),
  sign_32_1 = await signer({ seed: seed, sequence: 1, size: 32 }),
  sign_40_1 = await signer({ seed: seed, sequence: 1, size: 40 });

const genericVerifier = await verifier({ seed: seed })
const genericVerifier_1 = await verifier({ seed: seed, sequence: 1 })

const genericSigner_4 = await signer({ seed: seed }),
  genericSigner_1 = await signer({ seed: seed, sequence: 1 })

const signed_token_sha_8 = signWithSha(token_8),
  signed_token_sha_16 = signWithSha(token_16),
  signed_token_sha_24 = signWithSha(token_24),
  signed_token_sha_32 = signWithSha(token_32),
  signed_token_sha_40 = signWithSha(token_40);

const signed_token_4_8 = genericSigner_4(token_8),
  signed_token_4_16 = genericSigner_4(token_16),
  signed_token_4_24 = genericSigner_4(token_24),
  signed_token_4_32 = genericSigner_4(token_32),
  signed_token_4_40 = genericSigner_4(token_40);

const signed_token_1_8 = genericSigner_1(token_8),
  signed_token_1_16 = genericSigner_1(token_16),
  signed_token_1_24 = genericSigner_1(token_24),
  signed_token_1_32 = genericSigner_1(token_32),
  signed_token_1_40 = genericSigner_1(token_40);

const verify_8 = await verifier({ seed: seed, size: 8 }),
  verify_16 = await verifier({ seed: seed, size: 16 }),
  verify_24 = await verifier({ seed: seed, size: 24 }),
  verify_32 = await verifier({ seed: seed, size: 32 }),
  verify_40 = await verifier({ seed: seed, size: 40 });

const verify_8_1 = await verifier({ seed: seed, sequence: 1, size: 8 }),
  verify_16_1 = await verifier({ seed: seed, sequence: 1, size: 16 }),
  verify_24_1 = await verifier({ seed: seed, sequence: 1, size: 24 }),
  verify_32_1 = await verifier({ seed: seed, sequence: 1, size: 32 }),
  verify_40_1 = await verifier({ seed: seed, sequence: 1, size: 40 });

bench("genericSigner_8_4", () => genericSigner_4(token_8))
bench("genericSigner_16_4", () => genericSigner_4(token_16))
bench("genericSigner_24_4", () => genericSigner_4(token_24))
bench("genericSigner_32_4", () => genericSigner_4(token_32))
bench("genericSigner_40_4", () => genericSigner_4(token_40))

bench("genericSigner_8_1", () => genericSigner_1(token_8))
bench("genericSigner_16_1", () => genericSigner_1(token_16))
bench("genericSigner_24_1", () => genericSigner_1(token_24))
bench("genericSigner_32_1", () => genericSigner_1(token_32))
bench("genericSigner_40_1", () => genericSigner_1(token_40))

bench("Sign_8_4", () => sign_8(token_8))
bench("Sign_16_4", () => sign_16(token_16))
bench("Sign_24_4", () => sign_24(token_24))
bench("Sign_32_4", () => sign_32(token_32))
bench("Sign_40_4", () => sign_40(token_40))


bench("Sign_8_1", () => sign_8_1(token_8))
bench("Sign_16_1", () => sign_16_1(token_16))
bench("Sign_24_1", () => sign_24_1(token_24))
bench("Sign_32_1", () => sign_32_1(token_32))
bench("Sign_40_1", () => sign_40_1(token_40))

bench("Sha256Signer_8", () => { signWithSha(token_8) })
bench("Sha256Signer_16", () => { signWithSha(token_16) })
bench("Sha256Signer_24", () => { signWithSha(token_24) })
bench("Sha256Signer_32", () => { signWithSha(token_32) })
bench("Sha256Signer_40", () => { signWithSha(token_40) })


bench("genericVerifier_4_8", () => genericVerifier(signed_token_4_8))
bench("genericVerifier_4_16", () => genericVerifier(signed_token_4_16))
bench("genericVerifier_4_24", () => genericVerifier(signed_token_4_24))
bench("genericVerifier_4_32", () => genericVerifier(signed_token_4_32))
bench("genericVerifier_4_40", () => genericVerifier(signed_token_4_40))

bench("genericVerifier_1_8", () => genericVerifier_1(signed_token_1_8))
bench("genericVerifier_1_16", () => genericVerifier_1(signed_token_1_16))
bench("genericVerifier_1_24", () => genericVerifier_1(signed_token_1_24))
bench("genericVerifier_1_32", () => genericVerifier_1(signed_token_1_32))
bench("genericVerifier_1_40", () => genericVerifier_1(signed_token_1_40))

bench("verify_8_4", () => verify_8(signed_token_4_8))
bench("verify_16_4", () => verify_16(signed_token_4_16))
bench("verify_24_4", () => verify_24(signed_token_4_24))
bench("verify_32_4", () => verify_32(signed_token_4_32))
bench("verify_40_4", () => verify_40(signed_token_4_40))

bench("verify_8_1", () => verify_8_1(signed_token_1_8))
bench("verify_16_1", () => verify_16_1(signed_token_1_16))
bench("verify_24_1", () => verify_24_1(signed_token_1_24))
bench("verify_32_1", () => verify_32_1(signed_token_1_32))
bench("verify_40_1", () => verify_40_1(signed_token_1_40))

bench("Sha256Verifier_8", () => { verifyWithSha(signed_token_sha_8) })
bench("Sha256Verifier_16", () => { verifyWithSha(signed_token_sha_16) })
bench("Sha256Verifier_24", () => { verifyWithSha(signed_token_sha_24) })
bench("Sha256Verifier_32", () => { verifyWithSha(signed_token_sha_32) })
bench("Sha256Verifier_40", () => { verifyWithSha(signed_token_sha_40) })
let i = 0;


while (i++ !== 100_000) {
  genericSigner_4(token_16)
  genericSigner_1(token_16)
  genericVerifier(signed_token_4_16)
  genericVerifier_1(signed_token_1_16)
  sign_8(token_8)
  sign_16(token_16)
  sign_24(token_24)
  sign_32(token_32)
  sign_40(token_40)


  sign_8_1(token_8)
  sign_16_1(token_16)
  sign_24_1(token_24)
  sign_32_1(token_32)
  sign_40_1(token_40)

  verify_8(signed_token_4_8)
  verify_16(signed_token_4_16)
  verify_24(signed_token_4_24)
  verify_32(signed_token_4_32)
  verify_40(signed_token_4_40)

  verify_8_1(signed_token_1_8)
  verify_16_1(signed_token_1_16)
  verify_24_1(signed_token_1_24)
  verify_32_1(signed_token_1_32)
  verify_40_1(signed_token_1_40)

  signWithSha(token_8)

  verifyWithSha(token_8)

}

console.log("Sign_8_4 => " + genericVerifier(sign_8(token_8)))
console.log("Sign_16_4 => " + genericVerifier(sign_16(token_16)))
console.log("Sign_24_4 => " + genericVerifier(sign_24(token_24)))
console.log("Sign_32_4 => " + genericVerifier(sign_32(token_32)))
console.log("Sign_40_4 => " + genericVerifier(sign_40(token_40)))

console.log("Sign_8_1 => " + genericVerifier_1(sign_8_1(token_8)))
console.log("Sign_16_1 => " + genericVerifier_1(sign_16_1(token_16)))
console.log("Sign_24_1 => " + genericVerifier_1(sign_24_1(token_24)))
console.log("Sign_32_1 => " + genericVerifier_1(sign_32_1(token_32)))
console.log("Sign_40_1 => " + genericVerifier_1(sign_40_1(token_40)))


console.log("Verify_8_4 => " + verify_8(genericSigner_4(token_8)));
console.log("Verify_16_4 => " + verify_16(genericSigner_4(token_16)));
console.log("Verify_24_4 => " + verify_24(genericSigner_4(token_24)));
console.log("Verify_32_4 => " + verify_32(genericSigner_4(token_32)));
console.log("Verify_40_4 => " + verify_40(genericSigner_4(token_40)));

console.log("Verify_8_1 => " + verify_8_1(genericSigner_1(token_8)));
console.log("Verify_16_1 => " + verify_16_1(genericSigner_1(token_16)));
console.log("Verify_24_1 => " + verify_24_1(genericSigner_1(token_24)));
console.log("Verify_32_1 => " + verify_32_1(genericSigner_1(token_32)));
console.log("Verify_40_1 => " + verify_40_1(genericSigner_1(token_40)));

await run()