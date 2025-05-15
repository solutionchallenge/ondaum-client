import { http } from "../fetch";

export interface DiagnosisQuestion {
  index: number;
  question: string;
  answers: {
    score: number;
    text: string;
  }[];
}

interface GetDiagnosisParams {
  paper_id: string;
}

export const getDiagnosis = async ({
  paper_id,
}: GetDiagnosisParams): Promise<{
  name: string;
  guides: string;
  questions: DiagnosisQuestion[];
  results: {
    min: number;
    max: number;
    name: string;
    description: string;
    critical: boolean;
  }[];
  scoring: {
    min: number;
    max: number;
  };
}> => {
  const { response } = await http.get<{
    name: string;
    guides: string;
    questions: DiagnosisQuestion[];
    results: {
      min: number;
      max: number;
      name: string;
      description: string;
      critical: boolean;
    }[];
    scoring: {
      min: number;
      max: number;
    };
  }>(`/diagnosis-papers/${paper_id}`);
  return response;
};

interface DiagnosisResultRequest {
  diagnosis: string;
  result_score: number;
  total_score: number;
  result_name: string;
  result_critical: boolean;
  result_description: string;
}

export const postDiagnosisResult = async (
  result: DiagnosisResultRequest
): Promise<{ id: string; success: boolean }> => {
  const { response } = await http.post<{ id: string; success: boolean }>(
    "/diagnoses",
    result
  );
  return response;
};

interface DiagnosisResultResponse {
  diagnosis: string;
  result_critical: boolean;
  result_description: string;
  result_name: string;
  result_score: number;
  total_score: number;
}

export const getDiagnosisResult = async (
  diagnosis_id: string
): Promise<DiagnosisResultResponse> => {
  const { response } = await http.get<DiagnosisResultResponse>(
    `/diagnoses/${diagnosis_id}`
  );
  return response;
};
