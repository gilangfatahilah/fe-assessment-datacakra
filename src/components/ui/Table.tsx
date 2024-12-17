import React from "react";

export interface Column<T> {
  header: string;
  accessor: keyof T;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
}

const Table = <T extends object>({ columns, data }: TableProps<T>) => {
  return (
    <div className="overflow-x-auto rounded-lg">
      <table className="min-w-full border-collapse rounded-md">
        <thead className="bg-primary/50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.header}
                className="border-y border-secondary px-4 py-2 text-left text-sm font-medium text-secondary-foreground"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-background">
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column) => (
                  <td
                    key={column.header}
                    className="border border-secondary px-4 py-2 text-sm text-foreground"
                  >
                    {row[column.accessor] as React.ReactNode}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="border border-gray-300 px-4 py-2 text-center text-gray-500"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
