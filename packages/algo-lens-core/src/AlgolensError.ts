export class AlgolensError extends Error {
  code: string;

  constructor(p: { message: string; code: string }) {
    super(p.message);
    this.code = p.code;
  }
}
