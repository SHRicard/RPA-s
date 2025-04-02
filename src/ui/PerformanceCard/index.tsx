import { useEffect, useState } from 'react';
import { CChartDoughnut } from '@coreui/react-chartjs';
import { CCard, CCardBody, CCardHeader } from '@coreui/react';
import { theme } from '../../theme';

const generateRandomData = (min: number, max: number) =>
    Array(15).fill(0).map(() => Math.floor(Math.random() * (max - min + 1)) + min);

interface IPerformanceCard {
    title: string;
    completeRate: number;
    intervalTime: number;
}

export const PerformanceCard = ({ title, completeRate, intervalTime }: IPerformanceCard) => {
    const [completionRate, setCompletionRate] = useState(generateRandomData(completeRate, 100));

    useEffect(() => {
        const interval = setInterval(() => {
            setCompletionRate(generateRandomData(completeRate, 100));
        }, intervalTime);

        return () => clearInterval(interval);
    }, [completeRate, intervalTime]);

    const latestCompletionRate = completionRate[completionRate.length - 1];
    const pendingRate = 100 - latestCompletionRate;

    return (
        <CCard className="text-center">
            <CCardHeader className="py-2">{title}</CCardHeader>
            <CCardBody className="p-3 d-flex flex-column align-items-center">
                <div style={{ width: '150px', height: '150px' }}>
                    <CChartDoughnut
                        data={{
                            labels: ['Completado', 'Pendiente'],
                            datasets: [{
                                backgroundColor: [theme.colorPrimary, theme.colorSecondary],
                                data: [latestCompletionRate, pendingRate],
                            }],
                        }}
                        options={{
                            maintainAspectRatio: true,
                            plugins: {
                                tooltip: { enabled: false },
                            },
                            hover: { mode: undefined },
                            interaction: { mode: "index" },
                            events: [],
                        }}
                    />
                </div>

                {/* Etiquetas con colores y valores */}
                <div className="mt-3 d-flex justify-content-center gap-3">
                    <div className="d-flex align-items-center gap-2">
                        <span style={{ width: '12px', height: '12px', backgroundColor: theme.colorPrimary, display: 'inline-block', borderRadius: '3px' }}></span>
                        <span>{latestCompletionRate}%</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        <span style={{ width: '12px', height: '12px', backgroundColor: theme.colorSecondary, display: 'inline-block', borderRadius: '3px' }}></span>
                        <span>{pendingRate}%</span>
                    </div>
                </div>
            </CCardBody>
        </CCard>
    );
};
