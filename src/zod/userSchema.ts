import { z } from "zod";

const userSchema = z.object({
  uid: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  displayName: z.string(),
})

export default userSchema