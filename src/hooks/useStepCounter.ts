import { useEffect, useState, useCallback } from 'react';
import { getSteps } from '../services/pedometer';

export function useStepCounter() {
  const [steps, setSteps] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchSteps = useCallback(async () => {
    setLoading(true);
    try {
      const startDate = new Date(new Date().setHours(0, 0, 0, 0)).toISOString();
      const endDate = new Date().toISOString();
      const result = await getSteps(startDate, endDate);
      setSteps(result.steps);
    } catch (e) {
      console.warn('걸음 수 불러오기 실패', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSteps();
  }, [fetchSteps]);

  return { steps, loading, refresh: fetchSteps };
}
