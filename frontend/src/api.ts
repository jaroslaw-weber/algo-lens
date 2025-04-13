import ky from 'ky';
import type { Problem } from './types';

const be = ky.create({ prefixUrl: process.env.BACKEND_URL });

export async  function getProblemList() {
  const result = await be.get<Problem[]>('/problems');
  return result.json();
}

export async function getProblem(id: string) {
  const result = await be.get<Problem>(`/problems/${id}`);
  return result.json();
}
