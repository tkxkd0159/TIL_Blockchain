// import * as im from "./exporttest.js";

// console.log(im.PI);
// console.log(im.calVol(2,3,4));

import calVol, {defalutConst} from "./exporttest.js";
import {PI} from "./exporttest.js"
console.log(PI, defalutConst);

console.log(calVol)
console.log(calVol['calVol'](2,3,4));