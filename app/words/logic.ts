import { BoolType, Type } from "../types";

const eq = <T extends Type>(first: T, second: T) => {
  return [new BoolType(first.toJs() === second.toJs())];
};

const less = <T extends Type>(first: T, second: T) => {
  return [new BoolType(first.toJs() < second.toJs())];
};

const greater = <T extends Type>(first: T, second: T) => {
  return [new BoolType(first.toJs() > second.toJs())];
};

const lesseq = <T extends Type>(first: T, second: T) => {
  return [new BoolType(first.toJs() <= second.toJs())];
};

const greatereq = <T extends Type>(first: T, second: T) => {
  return [new BoolType(first.toJs() >= second.toJs())];
};

const and = <T extends Type>(first: T, second: T) => {
  return [new BoolType(first.toJs() && second.toJs())];
};

const or = <T extends Type>(first: T, second: T) => {
  return [new BoolType(first.toJs() || second.toJs())];
};

export default { eq, less, greater, lesseq, greatereq, and, or };
