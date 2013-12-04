// Copyright 2013 the V8 project authors. All rights reserved.
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above
//       copyright notice, this list of conditions and the following
//       disclaimer in the documentation and/or other materials provided
//       with the distribution.
//     * Neither the name of Google Inc. nor the names of its
//       contributors may be used to endorse or promote products derived
//       from this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

'use strict';

// ES6 draft 09-27-13, section 20.2.2.28.
function MathSign(x) {
  x = TO_NUMBER_INLINE(x);
  if (x > 0) return 1;
  if (x < 0) return -1;
  if (x === 0) return x;
  return NAN;
}


// ES6 draft 09-27-13, section 20.2.2.34.
function MathTrunc(x) {
  x = TO_NUMBER_INLINE(x);
  if (x > 0) return MathFloor(x);
  if (x < 0) return MathCeil(x);
  if (x === 0) return x;
  return NAN;
}


// ES6 draft 09-27-13, section 20.2.2.30.
function MathSinh(x) {
  if (!IS_NUMBER(x)) x = NonNumberToNumber(x);
  // Idempotent for NaN, +/-0 and +/-Infinity.
  if (x === 0 || !NUMBER_IS_FINITE(x)) return x;
  return (MathExp(x) - MathExp(-x)) / 2;
}


// ES6 draft 09-27-13, section 20.2.2.12.
function MathCosh(x) {
  if (!IS_NUMBER(x)) x = NonNumberToNumber(x);
  // Idempotent for NaN and +/-Infinity.
  if (!NUMBER_IS_FINITE(x)) return x;
  return (MathExp(x) + MathExp(-x)) / 2;
}


// ES6 draft 09-27-13, section 20.2.2.33.
function MathTanh(x) {
  if (!IS_NUMBER(x)) x = NonNumberToNumber(x);
  // Idempotent for +/-0.
  if (x === 0) return x;
  // Returns +/-1 for +/-Infinity.
  if (!NUMBER_IS_FINITE(x)) return MathSign(x);
  var exp1 = MathExp(x);
  var exp2 = MathExp(-x);
  return (exp1 - exp2) / (exp1 + exp2);
}


// ES6 draft 09-27-13, section 20.2.2.5.
function MathAsinh(x) {
  if (!IS_NUMBER(x)) x = NonNumberToNumber(x);
  // Idempotent for NaN, +/-0 and +/-Infinity.
  if (x === 0 || !NUMBER_IS_FINITE(x)) return x;
  return %Math_asinh(x);
}


// ES6 draft 09-27-13, section 20.2.2.3.
function MathAcosh(x) {
  if (!IS_NUMBER(x)) x = NonNumberToNumber(x);
  if (x < 1) return NAN;
  // Idempotent for NaN and +Infinity.
  if (!NUMBER_IS_FINITE(x)) return x;
  return %Math_acosh(x);
}


// ES6 draft 09-27-13, section 20.2.2.7.
function MathAtanh(x) {
  if (!IS_NUMBER(x)) x = NonNumberToNumber(x);
  // Idempotent for +/-0.
  if (x === 0) return x;
  // Returns NaN for NaN and +/- Infinity.
  if (!NUMBER_IS_FINITE(x)) return NAN;
  return %Math_atanh(x);
}


function ExtendMath() {
  %CheckIsBootstrapping();

  // Set up the non-enumerable functions on the Math object.
  InstallFunctions($Math, DONT_ENUM, $Array(
    "sign", MathSign,
    "trunc", MathTrunc,
    "sinh", MathSinh,
    "cosh", MathCosh,
    "tanh", MathTanh,
    "asinh", MathAsinh,
    "acosh", MathAcosh,
    "atanh", MathAtanh
  ));
}

ExtendMath();
