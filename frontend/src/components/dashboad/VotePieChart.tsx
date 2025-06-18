import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

export default function VotePieChart({ voted, notVoted }: { voted: number, notVoted: number }) {
    const data = {
        labels: ['โหวตแล้ว', 'ยังไม่ได้โหวต'],
        datasets: [
            {
                data: [voted, notVoted],
                backgroundColor: ['#ec4899', '#a3a3a3'],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="w-full max-w-xs mx-auto">
            <Pie data={data} />
        </div>
    );
} 