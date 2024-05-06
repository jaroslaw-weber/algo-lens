import { climbStairsProblem } from "./climbingStairs";
import { houseRobberProblem } from "./houseRobber";
import {sample} from "lodash";

export const problems = [houseRobberProblem, climbStairsProblem];

export const getRandomProblem = () => sample(problems)