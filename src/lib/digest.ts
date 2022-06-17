import bcrypt from "bcrypt";
import { promisify } from "util";

export const encryptBcrypt = async (text: string): Promise<string> => {
  const hash = promisify(bcrypt.hash);
  const result = await hash(text, 10);
  return result;
};

export const validateBcrypt = async (
  text: string,
  hash: string
): Promise<boolean> => {
  const compare = promisify(bcrypt.compare);
  const result = await compare(text, hash);
  return result;
};
