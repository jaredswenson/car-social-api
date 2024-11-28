import User from "../models/user";
import { UserNotFoundError } from "../errors/user";
import { executeWithRetry } from "../clients/database/openHouseDatabase";

export const getUser = async (personUuid: string): Promise<User> => {
  const user = await executeWithRetry(async () => {
    return await User.findOne({
      where: {
        brivity_person_uuid: personUuid,
        deleted: false,
      },
    });
  });

  if (!user) {
    throw new UserNotFoundError(`User not found for personUuid: ${personUuid}`);
  }

  return user;
};
