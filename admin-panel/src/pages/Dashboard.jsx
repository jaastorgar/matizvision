import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
    { name: 'Usuarios', value: 150 },
    { name: 'Citas Pendientes', value: 20 },
    { name: 'Productos Vendidos', value: 75 }
];

const Dashboard = () => {
    return (
        <div>
            <h2>Dashboard</h2>
            <BarChart width={500} height={300} data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
        </div>
    );
};

export default Dashboard;