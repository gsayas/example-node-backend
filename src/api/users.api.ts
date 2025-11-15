import { Request, Response } from "express";

interface User {
  username: string;
  email: string;
}

async function getUsers(): Promise<User[]> {
  return new Promise((resolve) => {
    // delay 3 seconds (3000ms)
    setTimeout(() => {
      const users: User[] = [
        { username: "john", email: "john@test.com" },
        { username: "jane", email: "jane@test.com" },
      ];
      resolve(users);
    }, 3000);
  });
}

export async function handleGetUsers(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
