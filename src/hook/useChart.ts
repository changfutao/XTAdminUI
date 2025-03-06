import * as echarts from 'echarts';
import { RefObject, useEffect, useRef, useState } from 'react';

const useChart = (): [RefObject<HTMLDivElement | null>, echarts.EChartsType | undefined] => {
    const chartRef = useRef<HTMLDivElement>(null)
    const [chartInstance, setchartInstance] = useState<echarts.EChartsType>()
    useEffect(() => {
        setchartInstance(echarts.init(chartRef.current as HTMLElement))
    }, [])
    return [chartRef ,chartInstance]
}  

export default useChart