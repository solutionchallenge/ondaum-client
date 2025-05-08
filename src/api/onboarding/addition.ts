import { CONCERNS } from "../../services/onboarding/additional/concern/constants";
import { EMOTIONS } from "../../services/onboarding/additional/emotion/constants";
import { http } from "../fetch";

export type EmotionTypes = keyof typeof EMOTIONS;
export type ConcernTypes = keyof typeof CONCERNS;
export const updateUserAddition = async (
  concerns: string[],
  emotions: string[]
): Promise<{ success: boolean; created: boolean }> => {
  const { response } = await http.put<{ success: boolean; created: boolean }>(
    `/user/addition`,
    {
      concerns,
      emotions,
    }
  );
  return response;
};

export const getEmotion = async (): Promise<{
  supported_emotions: EmotionTypes;
}> => {
  const { response } = await http.get<{ supported_emotions: EmotionTypes }>(
    "/_schema/supported-emotions"
  );
  return response;
};
