// server/auth/index.ts
import { getServerSession } from "next-auth";
import { authOptions } from "./config";

export const getSession = () => getServerSession(authOptions);


export { authOptions };
