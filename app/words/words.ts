import { Type, types_to_js } from "../types";
import logic from "./logic";
import math from "./math";

const words: { [key: string]: (...args: any[]) => void | Type[] } = {};

//math
words["+"] = math.plus;
words["sum"] = words["+"];

words["-"] = math.minus;
words["sub"] = words["-"];

words["*"] = math.multiply;
words["mul"] = words["*"];

words["/"] = math.divide;
words["div"] = words["/"];

words["sin"] = math.sine;
words["cos"] = math.cosine;
words["exp"] = math.exp;
words["floor"] = math.floor;
words["ceil"] = math.ceil;
words["log"] = math.log;

//logic
words["="] = logic.eq;
words["=="] = logic.eq;
words["==="] = logic.eq;

words["<"] = logic.less;
words["<="] = logic.lesseq;

words[">"] = logic.greater;
words[">="] = logic.greatereq;

words["and"] = logic.and;
words["&&"] = logic.and;

words["or"] = logic.or;
words["||"] = logic.or;

//utils
words["."] = (...args: Type[]) =>
  console.log(
    types_to_js(args)
      .map((v) => v.toString())
      .join(" ")
  );

words["print"] = words["."];

export default words;
