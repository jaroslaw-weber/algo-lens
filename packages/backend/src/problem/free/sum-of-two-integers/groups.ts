import { GroupMetaData } from '@algo-lens/problem-template';

export const groups: GroupMetaData = [
  {
    id: 'bitwise-loop',
    title: 'Bitwise Addition Loop',
    // Assuming 'BINARY' type exists for grouping binary representations, otherwise use 'SIMPLE'
    type: 'BINARY',
    variables: ['a', 'b', 'carry_step', 'a_bin', 'b_bin', 'carry_bin'], // Include both decimal and binary
  },
];
