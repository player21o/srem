import { ArrayType, BoolType, Type, WordType } from "../types";
import words from "../words/words";
import { parse, convert_type } from "./parser";

//run runs the whole file, converting each line into a stack and executing it
//execute executes a stack

type DefinedWords = { [word: string]: { params: string[]; stack: Type[] } };

export function run(data: string) {
  const defined_words: DefinedWords = {};

  data.split("\n").forEach((line) => {
    let stack: Type[] = [];

    parse(line).forEach((literal) => {
      const type = convert_type(literal.trim());

      stack.push(type);
    });

    execute(stack, defined_words);
  });
}

function execute(init_stack: Type[], defined: DefinedWords) {
  const default_words: { [key: string]: any } = words;

  default_words["eval"] = (array: Type) => {
    execute(array.value, defined);
  };

  default_words["if"] = <T extends Type>(
    condition: T,
    if_true: T,
    if_false: T
  ) => {
    if (
      if_true instanceof ArrayType &&
      if_false instanceof ArrayType &&
      condition instanceof BoolType
    ) {
      const defined_scope = structuredClone(defined);

      return condition.value
        ? execute(if_true.value, defined_scope)
        : execute(if_false.value, defined_scope);
    } else {
      return [];
    }
  };

  default_words["def"] = (word: WordType, ...params: Type[]) => {
    let string_params: string[] = [];

    for (let i = 0; i < params.length - 1; i++) {
      if (!(params[i] instanceof WordType)) {
        string_params = [];
        break;
      } else {
        string_params.push(params[i].value);
      }
    }

    if (
      word instanceof WordType &&
      params[params.length - 1] instanceof ArrayType
    ) {
      defined[word.value] = {
        stack: params[params.length - 1].value,
        params: string_params,
      };
    }
  };

  default_words["return"] = (data: ArrayType[]) => {
    if (data instanceof ArrayType) {
      return data;
    }
  };

  let stack: Type[] = [];

  init_stack.forEach((val) => {
    if (val instanceof WordType) {
      if (val.value in default_words) {
        const return_data = default_words[val.value](...stack);

        if (return_data instanceof Array) {
          stack = [...return_data];
        }
      } else if (val.value in defined) {
        const dw = defined[val.value]; //defined_word

        const return_data: any = execute(
          dw.stack.map((word) =>
            dw.params.includes(word.value)
              ? stack[dw.params.indexOf(word.value)]
              : word
          ),
          defined
        );

        if (return_data instanceof Array) {
        }
      } else {
        stack.push(new WordType(val.value.replace("/", "")));
      }
    } else {
      stack.push(val);
    }
  });
}
