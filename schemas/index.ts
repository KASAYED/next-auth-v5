import * as z from "zod";
import { UserRole } from "@prisma/client";

export const SettingsSchema = z
  .object({
    name: z.string().optional(),
    isTwoFactorEnabled: z.boolean().optional(),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.string().email().optional(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .optional()
      .or(z.literal("")),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters")
      .optional()
      .or(z.literal("")),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    }
  );

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

// .refine(
//   (data) => {
//     // Only check if password exists and is not empty
//     if (data.password?.trim() && !data.newPassword?.trim()) {
//       return false;
//     }
//     return true;
//   },
//   {
//     message: "New password is required!",
//     path: ["newPassword"],
//   }
// )
// .refine(
//   (data) => {
//     // Only check if newPassword exists and is not empty
//     if (data.newPassword?.trim() && !data.password?.trim()) {
//       return false;
//     }
//     return true;
//   },
//   {
//     message: "Password is required!",
//     path: ["password"],
//   }

// export const SettingsSchema = z
//   .object({
//     name: z.string().optional(),
//     isTwoFactorEnabled: z.boolean().optional(),
//     role: z.enum([UserRole.ADMIN, UserRole.USER]),
//     email: z.string().email().optional(),
//     password: z
//       .string()
//       .min(6, "Password must be at least 6 characters")
//       .optional()
//       .or(z.literal("")),
//     newPassword: z
//       .string()
//       .min(6, "New password must be at least 6 characters")
//       .optional()
//       .or(z.literal("")),
//   })
//   .refine(
//     (data) => {
//       // Allow both empty
//       if (!data.password && !data.newPassword) return true;
//       // Require both if either is provided
//       if (data.password && data.newPassword) return true;
//       return false;
//     },
//     {
//       message: "Both current and new password are required to change password",
//       path: ["newPassword"],
//     }
//   )
//   .refine(
//     (data) => {
//       // Only check if password exists and is not empty
//       if (data.password?.trim() && !data.newPassword?.trim()) {
//         return true;
//       }
//       return true;
//     },
//     {
//       message: "New password is required!",
//       path: ["newPassword"],
//     }
//   );
