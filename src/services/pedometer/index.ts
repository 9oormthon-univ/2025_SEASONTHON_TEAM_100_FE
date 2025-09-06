import { Platform } from 'react-native';
import { getStepsFromGoogleFit } from './googleFit';
import { getStepsFromHealthKit } from './healthKit';
import type { StepData } from './healthKit';

export async function getSteps(
  startDate: string,
  endDate: string,
): Promise<StepData> {
  if (Platform.OS === 'android') {
    return getStepsFromGoogleFit(startDate, endDate);
  }
  return getStepsFromHealthKit(startDate, endDate);
}
