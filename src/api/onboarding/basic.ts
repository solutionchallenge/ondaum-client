import { GENDERS } from "../../services/onboarding/basic/constant";
import { http } from "../fetch";

export type GenderTypes = keyof typeof GENDERS;

export const updateUserPrivacy = async (
  birthday: string,
  gender: string
): Promise<{ success: boolean; created: boolean }> => {
  const { response } = await http.put<{ success: boolean; created: boolean }>(
    `/user/privacy`,
    {
      birthday,
      gender,
    }
  );
  return response;
};
