import GoogleFit, { Scopes } from 'react-native-google-fit';

export interface StepData {
  startDate: string;
  endDate: string;
  steps: number;
}

export async function getStepsFromGoogleFit(
  startDate: string,
  endDate: string,
): Promise<StepData> {
  const options = { scopes: [Scopes.FITNESS_ACTIVITY_READ] };

  const authResult = await GoogleFit.authorize(options);
  if (!authResult.success) throw new Error('Google Fit 권한 거부됨');

  const res = await GoogleFit.getDailyStepCountSamples({ startDate, endDate });
  const steps =
    res.find(r => r.source === 'com.google.android.gms:estimated_steps')
      ?.steps || [];

  return {
    startDate,
    endDate,
    steps: steps.reduce((acc, s) => acc + s.value, 0),
  };
}
