/* this is a simple script to generate your unique FLAGS_SECRET */

import * as crypto from "crypto";

console.log(crypto.randomBytes(32).toString("base64url"));
