import bcryptjs from "bcryptjs";
export const isPasswordMatched = async (
  plainTextPassword: string,
  hashedPassword: string,
) => {
  const isMatched = await bcryptjs.compare(plainTextPassword, hashedPassword);
  return isMatched;
};
