import { GroupMetadata } from "algo-lens-core/src/types";


export const groups: GroupMetadata[] = [
	{
	  name: "profit",
	  label: "Potential Profit Calculation",
	  description:
		"The potential profit from buying at the minimum price and selling at the current price.",
    emoji: "💰",
	},
	{
	  name: "smaller",
	  label: "Profit Comparison with Previous Minimum",
	  description:
		"The potential profit from buying at the minimum price and selling at the current price minus the minimum price found so far.",
    emoji: "🤔",
	},
	{
	  name: "loop",
	  label: "Current Day in Price Analysis Loop",
	  description: "The current day being considered (prices[i]).",
    emoji: "🗓️",
	},
  ]