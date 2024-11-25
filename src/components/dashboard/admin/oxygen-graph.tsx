import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Simulate fetching data from a database
async function fetchDepartmentData() {
    // Simulated dynamic database response
    return Promise.resolve([
        { department: 'pediatrics', data: [80, 90, 85, 95], color: '#FF5733' },
        { department: 'radiology', data: [30, 35, 40, 45], color: '#33FF57' },
        { department: 'pharmacy', data: [50, 55, 60, 65], color: '#3357FF' },
        // Add more departments as needed
    ]);
}

function OxygenGraph() {
    const [chartData, setChartData] = useState([]);
    const [visibleDepartments, setVisibleDepartments] = useState(new Set<string>());
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5; // Number of points to display per page

    useEffect(() => {
        async function loadData() {
            const data = await fetchDepartmentData();
            setChartData(data);
            setVisibleDepartments(new Set(data.map(item => item.department)));
        }
        loadData();
    }, []);

    // Transform data for Recharts
    const transformedData = chartData.length > 0 ? chartData[0].data.map((_, index) => {
        const entry: any = { name: `Point ${index + 1}` };
        chartData.forEach((item) => {
            entry[item.department] = item.data[index];
        });
        return entry;
    }) : [];

    // Calculate the current data slice for pagination
    const paginatedData = transformedData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    // Toggle visibility of a department
    const toggleDepartmentVisibility = (department: string) => {
        setVisibleDepartments(prev => {
            const newSet = new Set(prev);
            if (newSet.has(department)) {
                newSet.delete(department);
            } else {
                newSet.add(department);
            }
            return newSet;
        });
    };

    // Handle page change
    const handlePageChange = (direction: 'next' | 'prev') => {
        setCurrentPage(prev => direction === 'next' ? prev + 1 : Math.max(prev - 1, 0));
    };

    return (
        <div>
            <h2>Oxygen Levels by Department</h2>
            <div>
                {chartData.map(item => (
                    <label key={item.department} style={{ marginRight: '10px' }}>
                        <input
                            type="checkbox"
                            checked={visibleDepartments.has(item.department)}
                            onChange={() => toggleDepartmentVisibility(item.department)}
                        />
                        {item.department}
                    </label>
                ))}
            </div>
            <ResponsiveContainer width="100%" className='w-[700px]' height={400}>
                <BarChart
                    className='bg-white min-w-[900px]'
                    data={paginatedData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {chartData.map((item) => (
                        visibleDepartments.has(item.department) && (
                            <Bar
                                key={item.department}
                                dataKey={item.department}
                                fill={item.color}
                            />
                        )
                    ))}
                </BarChart>
            </ResponsiveContainer>
            <div>
                <button onClick={() => handlePageChange('prev')} disabled={currentPage === 0}>Previous</button>
                <button onClick={() => handlePageChange('next')} disabled={(currentPage + 1) * itemsPerPage >= transformedData.length}>Next</button>
            </div>
        </div>
    );
}

export default OxygenGraph;
