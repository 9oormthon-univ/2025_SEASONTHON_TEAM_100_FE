import AppleHealthKit, {
  HealthInputOptions,
  HealthKitPermissions,
} from 'react-native-health';

export interface StepData {
  startDate: string;
  endDate: string;
  steps: number;
}

const permissions: HealthKitPermissions = {
  permissions: {
    read: [AppleHealthKit.Constants.Permissions.Steps],
    write: [],
  },
};

export function getStepsFromHealthKit(
  startDate: string,
  endDate: string,
): Promise<StepData> {
  return new Promise((resolve, reject) => {
    AppleHealthKit.initHealthKit(permissions, err => {
      console.log(err);
      if (err) return reject(err);

      const options: HealthInputOptions = { startDate, endDate };

      AppleHealthKit.getStepCount(options, (error, results) => {
        if (error) return reject(error);

        resolve({
          startDate,
          endDate,
          steps: results?.value || 0,
        });
      });
    });
  });
}
