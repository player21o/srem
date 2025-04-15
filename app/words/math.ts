import { NumberType, StringType, Type } from "../types";

const plus = <T extends Type>(first: T, second: T) => {
  if (first instanceof StringType || second instanceof StringType) {
    return [new StringType(first.value.toString() + second.value.toString())];
  } else if (first instanceof NumberType && second instanceof NumberType) {
    return [new NumberType(first.value + second.value)];
  } else {
    return [];
  }
};

const minus = <T extends Type>(first: T, second: T) => {
  if (first instanceof StringType || second instanceof StringType) {
    return [];
  } else if (first instanceof NumberType && second instanceof NumberType) {
    return [new NumberType(first.value - second.value)];
  } else {
    return [];
  }
};

const multiply = <T extends Type>(first: T, second: T) => {
  console.log(first, second);
  if (first instanceof StringType || second instanceof StringType) {
    return [];
  } else if (first instanceof NumberType && second instanceof NumberType) {
    return [new NumberType(first.value * second.value)];
  } else {
    return [];
  }
};

const divide = <T extends Type>(first: T, second: T) => {
  if (first instanceof StringType || second instanceof StringType) {
    return [];
  } else if (first instanceof NumberType && second instanceof NumberType) {
    return [new NumberType(first.value / second.value)];
  } else {
    return [];
  }
};

const sine = <T extends Type>(val: T) => {
  if (val instanceof NumberType) {
    return [new NumberType(Math.sin(val.value))];
  } else {
    return [];
  }
};

const cosine = <T extends Type>(val: T) => {
  if (val instanceof NumberType) {
    return [new NumberType(Math.cos(val.value))];
  } else {
    return [];
  }
};

const exp = <T extends Type>(val: T) => {
  if (val instanceof NumberType) {
    return [new NumberType(Math.exp(val.value))];
  } else {
    return [];
  }
};

const round = <T extends Type>(val: T) => {
  if (val instanceof NumberType) {
    return [new NumberType(Math.round(val.value))];
  } else {
    return [];
  }
};

const floor = <T extends Type>(val: T) => {
  if (val instanceof NumberType) {
    return [new NumberType(Math.floor(val.value))];
  } else {
    return [];
  }
};

const ceil = <T extends Type>(val: T) => {
  if (val instanceof NumberType) {
    return [new NumberType(Math.ceil(val.value))];
  } else {
    return [];
  }
};

const log = <T extends Type>(val: T) => {
  if (val instanceof NumberType) {
    return [new NumberType(Math.log(val.value))];
  } else {
    return [];
  }
};

export default {
  plus,
  minus,
  multiply,
  divide,
  exp,
  round,
  floor,
  ceil,
  sine,
  cosine,
  log,
};
