import * as jose from 'npm:jose'
import jSigner from "https://deno.land/x/endofunctor/components/tokens/jSigner.ts"
import jVerifier from "https://deno.land/x/endofunctor/components/tokens/jVerify.ts"
import { run, bench } from 'npm:mitata'




const obj = {hello: "world"} 

const str = 'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2'

const secret = new TextEncoder().encode(str)

  const alg = 'HS256'
  const jwt = await new jose.SignJWT(obj)
    .setProtectedHeader({ alg })
    .sign(secret)

    const jwtWithExp = await new jose.SignJWT(obj)
    .setProtectedHeader({ alg })
    .setExpirationTime('2h')
    .sign(secret)

    const jwtExpired = await new jose.SignJWT(obj)
    .setProtectedHeader({ alg })
    .setExpirationTime('1s')
    .sign(secret)

const sign = jSigner({seed: "hello" })
const signS = jSigner({seed: "hello" , schema: {
    type: "object",
    properties: {
      hello: { type: "string" },
    },
    required: ["hello"],
  }})
  const signSchemaWithExp = jSigner({
    seed: "hello" , 
    expires: 100000 , 
    schema: {
    type: "object",
    properties: {
      hello: { type: "string" },
    },
    required: ["hello"],
  }})
  const signSchemaExpired = jSigner({
    seed: "hello" ,
    expires: -1 , 
    schema: {
    type: "object",
    properties: {
      hello: { type: "string" },
    },
    required: ["hello"],
  }})

  const tVerify = jVerifier({
    seed: "hello" ,
    expires: 1000 , 
    schema: {
    type: "object",
    properties: {
      hello: { type: "string" },
    },
    required: ["hello"],
  }})
const verify = jVerifier({seed: "hello" })
const vt = sign(obj)
const tvt = signSchemaWithExp(obj)
const evt = signSchemaExpired(obj)
bench("VTokens_sign_onlyObject", ()=>  sign(obj))
bench("VTokens_withSchema_sign_onlyObject", ()=>  signS(obj))
bench("VTokens_withSchema_sign_withExp", ()=>  signSchemaWithExp(obj))
bench("VTokens_verify_onlyObject", ()=>  verify(vt))
bench("VTokens_withSchema_verify_withExp", ()=>  tVerify(tvt))
bench("VTokens_withSchema_verify_expired", ()=>  tVerify(evt))
bench("JWT_sign_onlyObject", async()=>      
    await new jose.SignJWT(obj)
    .setProtectedHeader({ alg })
    .sign(secret))
    bench("JWT_sign_withExp", async()=>      
    await new jose.SignJWT(obj)
    .setExpirationTime('2h')
    .setProtectedHeader({ alg })
    .sign(secret))

bench("JWT_verify_onlyObject", async()=>      
await jose.jwtVerify(jwt, secret))
bench("JWT_verify_withExp", async()=>      
await jose.jwtVerify(jwtWithExp, secret))
bench("JWT_verify_Expired", async()=>      
{
    try {
        await jose.jwtVerify(jwtExpired, secret)
    } catch (e) {
        
    }
})


let i = 0
while(i++ !== 10000){
    sign("12345678")
    signS(obj)
    signSchemaExpired(obj)
    verify(vt)
    await new jose.SignJWT(obj)
    .setProtectedHeader({ alg })
    .sign(secret)
    await jose.jwtVerify(jwt, secret)
}

await run()

console.log(sign(obj))