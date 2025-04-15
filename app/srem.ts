import { readFileSync } from "fs";
import { run } from "./runtime/runner";

run(readFileSync(process.argv[2], { encoding: "utf-8" }));
