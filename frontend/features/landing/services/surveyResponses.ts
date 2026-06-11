import api from "@/services/api";
import type {
  SurveyResponseApiResponse,
  SurveyResponsePayload,
} from "@/features/landing/types/survey";

export const surveyResponseService = {
  async submit(
    payload: SurveyResponsePayload
  ): Promise<{ data: SurveyResponseApiResponse }> {
    return api.post("/survey-responses", payload);
  },
};
