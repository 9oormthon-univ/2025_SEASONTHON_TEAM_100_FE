import { View, Button, StyleSheet } from 'react-native';
import { useStepCounter } from '../hooks/useStepCounter';
import StepCard from '../components/StepCard';

export default function HomeScreen() {
  const { steps, loading, refresh } = useStepCounter();

  return (
    <View style={styles.container}>
      <StepCard steps={steps} loading={loading} />
      <Button title="새로고침" onPress={refresh} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
});
