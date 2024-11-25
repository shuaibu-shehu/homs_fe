import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

interface Column {
    header: string;
    accessor: string;
    render?: (value: unknown) => React.ReactNode;
}

interface ReusableTableProps<T> {
    columns: Column[];
    data: T[];
}

const CustomeTable = <T extends Record<string, unknown>>({ columns, data }: ReusableTableProps<T>) => {
    return (
        <Table className="w-full bg-white border-collapse">
            <TableHeader className="bg-custome-green-200 text-custome-green-300">
                <TableRow>
                    {columns.map((column, index) => (
                        <TableHead key={index} className="text-custome-green-300 px-4 py-2">
                            {column.header}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((row: T, rowIndex) => (
                    <TableRow key={rowIndex} className="hover:bg-gray-50">
                        {columns.map((column, colIndex) => (
                            <TableCell key={colIndex} className="px-4 py-2">
                                {column.render
                                    ? column.render(row)
                                    : String(row[column.accessor as keyof T])}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default CustomeTable;