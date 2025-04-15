export function types_to_js(types: Type[]) {
  const val: Type[] = [];

  types.forEach((v) => {
    val.push(v.toJs());
  });

  return val;
}

export class Type<ValType = any> {
  value: ValType;

  constructor(val: ValType) {
    this.value = val;
  }

  public toJs() {
    return this.value;
  }
}

export class StringType extends Type<string> {}

export class NumberType extends Type<number> {}

export class WordType extends Type<string> {}

export class ArrayType extends Type<Array<Type>> {
  public toJs() {
    return types_to_js(this.value);
  }
}

export class BoolType extends Type<boolean> {}
