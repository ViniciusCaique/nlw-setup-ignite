import { TouchableOpacity, Dimensions, TouchableOpacityProps } from "react-native";
import clsx from "clsx";

import { generateProgressPercentage } from "../utils/generate-progress-percentage";

const week_days = 7
const screenHorizontalPadding = (32 * 2) / 5

export const dayMarginBetween = 8
export const daySize = (Dimensions.get('screen').width / week_days) - (screenHorizontalPadding + 5)

interface Props extends TouchableOpacityProps {
    amountOfHabits?: number,
    amountOfCompleted?: number,
    date: Date,

}

export function HabitDay({ amountOfHabits = 0, amountOfCompleted = 0, date, ...rest }: Props){

    const amountAccomplishedPercentage = amountOfHabits > 0 ? generateProgressPercentage(amountOfHabits, amountOfCompleted) : 0

    return(
        <TouchableOpacity 
            className={clsx("rounded-lg border-2 m-1", {
                ["bg-zinc-900 border-zinc-800"] : amountAccomplishedPercentage === 0,
                ["bg-violet-900 border-violet-800"] : amountAccomplishedPercentage > 0 && amountAccomplishedPercentage < 20,
                ["bg-violet-800 border-violet-700"] : amountAccomplishedPercentage >= 20 && amountAccomplishedPercentage < 40,
                ["bg-violet-700 border-violet-600"] : amountAccomplishedPercentage >= 40 && amountAccomplishedPercentage < 60,
                ["bg-violet-600 border-violet-500"] : amountAccomplishedPercentage >= 60 && amountAccomplishedPercentage < 80,
                ["bg-violet-500 border-violet-400"] : amountAccomplishedPercentage >= 80
            })}
            style={{ width: daySize, height: daySize }}
            activeOpacity={0.7}
            {...rest}
        />
    )
}