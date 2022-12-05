import { parse } from "yaml";
import { join } from "path";
import { readFileSync } from "fs";

const setNodeEnv = (path: string) => {
  const file = readFileSync(path, "utf8");
  const env = parse(file);
  process.env = { ...process.env, ...env };
};

// 配置环境变量
setNodeEnv(join(process.cwd(), "env.yaml"));
