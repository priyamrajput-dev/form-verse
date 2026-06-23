import {
  createUserWithEmailAndPassword,
  type CreateUserWithEmailAndPasswordType,
  generateUserTokenPayload,
  type GenerateUserTokenPayloadType,
} from "./model";
import { db, eq } from "@repo/database";
import { userTable } from "@repo/database/models/user";
import bcrypt from "bcryptjs";
import * as JWT from "jsonwebtoken";
import { env } from "../env";
export default class UserService {
  private async getUserByEmail(email: string) {
    const result = await db.select().from(userTable).where(eq(userTable.email, email));
    if (!result || result.length === 0) return null;
    return result[0];
  }

  private async generateUserToken(payload: GenerateUserTokenPayloadType) {
    const { id } = await generateUserTokenPayload.parseAsync(payload);

    const token = JWT.sign(id, env.JWT_SCERET);
    return { token };
  }

  public async createUserWithEmailAndPassword(payload: CreateUserWithEmailAndPasswordType) {
    //validate the payload
    //check email is exist in db
    //hash pass
    //insert a user in db
    //create jwt token, set it in the cookie
    //return

    const { fullName, email, password } = await createUserWithEmailAndPassword.parseAsync(payload);

    const existingUser = await this.getUserByEmail(email);
    if (existingUser) throw new Error("User with this email already exist");

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await db
      .insert(userTable)
      .values({ fullName, email, passwordHash })
      .returning({ id: userTable.id });

    if (!result || result.length === 0 || !result[0]?.id)
      throw new Error("Something went wrong while creating the user");

    const { token } = await this.generateUserToken({ id: result[0].id });

    return {
      id: result[0].id,
      token,
    };
  }
}
