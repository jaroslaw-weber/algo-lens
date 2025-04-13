export interface Problem {
  id: string;
  title: string;
  code: string;
  state:{
	max:number
  }
}

export interface ProblemState {
  breakpoint: number;
  // Define the shape of the problem state here
}
