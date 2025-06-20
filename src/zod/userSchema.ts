import { z } from "zod";

const userSchema = z.object({
  id: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  displayName: z.string(),
})

export default userSchema