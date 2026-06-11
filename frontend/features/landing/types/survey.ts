import type { ApiResponse } from "@/types";

export type SurveyUserType = "client" | "skilled_worker" | "both";
export type SurveyInterest = "yes" | "maybe" | "no";

export interface SurveyResponsePayload {
  name: string;
  email?: string;
  mobile?: string;
  location: string;
  user_type: SurveyUserType;
  needed_services?: string[];
  finding_worker_pain_point?: string;
  workbridge_likelihood?: number;
  important_feature?: string;
  offered_service_skill?: string;
  years_experience?: number;
  service_area?: string;
  online_profile_interest?: SurveyInterest;
  inquiries_bookings_interest?: SurveyInterest;
  trust_concerns_feedback?: string;
  desired_features_feedback?: string;
  concerns_suggestions?: string;
  source?: string;
  website?: string;
}

export interface SurveySubmissionData {
  id: number;
  user_type: SurveyUserType;
  submitted_at: string;
}

export type SurveyResponseApiResponse = ApiResponse<SurveySubmissionData>;
