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
  diagnosis_id: string;
}

export const getDiagnosis = async ({
  diagnosis_id,
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
  }>(`/diagnosis-papers/${diagnosis_id}`);
  return response;
};
