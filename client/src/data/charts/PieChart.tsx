import React, { useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend } from 'chart.js/auto';
import { Container } from '@mui/system';

interface ChartInterface {
    chartData: any;
}

const options = {
    maintainAspectRatio: false,
    legend: {
        display: true, // You can adjust the legend settings
        position: 'top' // Position of the legend
    }
}

export default function PieChart({ chartData }: ChartInterface) {
    //Hooks & Contexts
    ChartJS.register(
        Tooltip,
        Legend
    )

    const [chart,setChart] = React.useState<any>([]);

    useEffect(() => {
        if(chartData){
            setChart(chartData);
        }
    },[chartData]);

    useEffect(() => {
        setData({
            labels: chart.map((item: any) => item.author),
            datasets: [{
                label: 'Number of Books by Author',
                data: chart.map((item: any) => item.total),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
                borderWidth: 1
            }]
        });
    },[chart]);

    const [data, setData] = React.useState<any>({
        labels: chart.map((item: any) => item.author),
        datasets: [{
            label: 'Number of Books by Author',
            data: chart.map((item: any) => item.total),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor:  'rgb(255, 99, 132)',
            borderWidth: 1
        }]
    });
    return (
        <Container sx={{ height: { md: 240 } }}>{<Pie data={data} options={options} />}</Container>
    )
}
