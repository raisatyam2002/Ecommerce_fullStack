import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};
export const comparePassword = async (
  password: string,
  hashPassword: string
) => {
  return bcrypt.compare(password, hashPassword);
};
