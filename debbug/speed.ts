import { create, verify } from "https://deno.land/x/djwt/mod.ts"
import verifier from "../components/tokens/verifier.ts";
import signer from "../components/tokens/signer.ts";
import * as jose from 'https://deno.land/x/jose@v4.14.4/index.ts'

const sign = await signer({ seed: "hello" })
const verifyToken = await verifier({ seed: "hello" })
const token = sign(btoa(JSON.stringify({ foo: "bar" })))
const key = await crypto.subtle.generateKey(
  {
    name: "HMAC",
    hash: { name: "SHA-256" },
  },
  true,
  ["sign", "verify"]
);

const solvingJSON = (s: string) =>
  verifyToken(s)
    ? JSON.parse(atob(s.slice(0, s.indexOf("."))))
    : false


const jwt = await create({ alg: "HS256", typ: "JWT" }, { foo: "bar" }, key)

console.log(solvingJSON(token))

let i = 0;

const t0 = performance.now()

while (i++ !== 1_000_000) {
  // verifyToken(token)

  verify(jwt)
}

console.log(performance.now() - t0)
console.log(jwt)
console.log(verifyToken(token))
console.log(token)
console.log((Math.floor(token.length / 2)))

