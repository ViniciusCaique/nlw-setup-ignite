
import * as Progress from '@radix-ui/react-progress';
import { useState } from 'react';


interface ProgressBarProps {
    progress: number
}

export function Progressbar(props: ProgressBarProps) {

    const progressStyle = {
        width: `${props.progress}%`
    }

    return(
        <Progress.Root className='h-3 rounded-xl bg-zinc-700 w-full mt-4'>
            <Progress.Indicator 
                className='h-3 rounded-xl bg-violet-600 transition-all' 
                aria-label='Progresso de hábitos completados nesse dia'
                style={progressStyle}
            />
        </Progress.Root>
    )
}