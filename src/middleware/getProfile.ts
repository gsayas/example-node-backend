import { Request, Response, NextFunction } from "express";
import { Profile as ProfileModel } from "../model";

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const { Profile } = req.app.get("models") as { Profile: typeof ProfileModel };
  const profile = await Profile.findOne({
    where: { id: req.get("profile_id") || 0 },
  });
  if (!profile) return res.status(401).end();
  (req as any).profile = profile;
  next();
};
