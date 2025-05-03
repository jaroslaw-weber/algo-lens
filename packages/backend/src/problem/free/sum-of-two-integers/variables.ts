import { VariableMetaData } from '@algo-lens/problem-template';

export const variables: VariableMetaData = {
  // Decimal values
  a: { label: 'A (Current Sum)', type: 'SIMPLE', },
  b: { label: 'B (Current Carry)', type: 'SIMPLE', },
  carry_step: { label: 'Carry (Calculated in Step)', type: 'SIMPLE', }, // Carry before left shift
  sum: { label: 'Final Sum', type: 'SIMPLE', }, // Final result in 'a'

  // Binary representations (assuming visualizer components exist)
  a_bin: { label: 'A (Binary)', type: 'BINARY', },
  b_bin: { label: 'B (Binary)', type: 'BINARY', },
  carry_bin: { label: 'Carry (Binary)', type: 'BINARY', },
};
