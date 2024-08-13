
const { TextDecoder, TextEncoder } = require('node:util')
 
Object.defineProperties(globalThis, {
  TextDecoder: { value: TextDecoder },
  TextEncoder: { value: TextEncoder },
})


import { setupServer } from "msw/node";
import { handler } from "./handler";

export const server = setupServer(...handler)