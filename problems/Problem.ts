export interface Problem<Input, State> {
	code: string;
	getInput: () => Input;
	title: string;
	func: (t: Input) => State[];
}