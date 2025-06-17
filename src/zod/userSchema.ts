import { z } from "zod";

const userSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  displayName: z.string(),
  uid: z.string(),
})

export default userSchema