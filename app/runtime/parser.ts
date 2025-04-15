import {
  ArrayType,
  BoolType,
  NumberType,
  StringType,
  WordType,
} from "../types";

export function parse(data: string) {
  const result: string[] = [""];

  let inString = false;
  let inArray = false;
  let inEscape = false;
  let arrLevel = 0;

  let quote = "";

  for (let i = 0; i < data.length; i++) {
    const char = data.charAt(i);

    if (!inEscape) {
      if (char == " " && !inString && !inArray) {
        inString = false;
        inArray = false;
        result.push("");
      } else if ((char == '"' || char == "'") && !inArray) {
        if (!inString && !inArray) {
          inString = true;
          quote = char;
          result.push(char);
        } else if (char == quote) {
          result[result.length - 1] += char;
          inString = false;
        } else {
          result[result.length - 1] += char;
        }
      } else if (char == "[" && !inString) {
        if (!inArray) {
          inArray = true;
          result.push(char);
          arrLevel += 1;
        } else {
          result[result.length - 1] += char;
          arrLevel += 1;
        }
      } else if (char == "]" && !inString) {
        if (inArray) {
          arrLevel -= 1;
          result[result.length - 1] += char;

          if (arrLevel == 0) inArray = false;
        } else {
          result[result.length - 1] += char;
        }
      } else if (char == "\\") {
        inEscape = true;
      } else {
        result[result.length - 1] += char;
      }
    } else {
      if (char == "n") {
        result[result.length - 1] += "\n";
      } else {
        result[result.length - 1] += char;
      }

      inEscape = false;
    }
  }

  return result.filter((v) => v.length > 0);
}

export function convert_type(data: string) {
  if (data.charAt(0) == "[" && data.charAt(data.length - 1) == "]") {
    const val = new ArrayType([]);

    parse(data.slice(1, data.length - 1)).forEach((literal) => {
      val.value.push(convert_type(literal));
    });

    return val;
  } else if (
    (data.charAt(0) == '"' || data.charAt(0) == "'") &&
    (data.charAt(data.length - 1) == '"' || data.charAt(data.length - 1) == "'")
  ) {
    return new StringType(
      data
        .slice(1, data.length - 1)
        .replaceAll("\\n", "\n")
        .replaceAll("\\", "")
    );
  } else if (/[+-]?([0-9]*[.])?[0-9]+/g.test(data)) {
    return new NumberType(Number(data));
  } else if (data == "true" || data == "false") {
    return new BoolType(Boolean(data));
  } else {
    return new WordType(data);
  }
}
