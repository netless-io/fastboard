"use strict";

/**
 * Browser-safe shim for protobufjs optional module loading.
 * Returning null preserves protobufjs fallback behavior without using eval.
 */
module.exports = function inquire() {
  return null;
};
