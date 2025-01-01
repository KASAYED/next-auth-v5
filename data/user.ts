import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};

// export const getUserById = async (id: string): Promise<User | null> => {
//   const user = await db.user.findUnique({ where: { id } });

//   return user;
// };

// export async function getUserById(userId: string) {
//   const user = await db.user.findFirst({
//     where: { id: userId },
//   });
//   if (!user) throw new Error('User not found');
//   return user;
// }
