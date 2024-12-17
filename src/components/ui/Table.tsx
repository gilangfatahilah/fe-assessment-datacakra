import { Edit, Eye, Loader, Trash } from "lucide-react";
export interface Column<T> {
  header: string;
  accessor: keyof T;
}

interface Props<T> {
  columns: Column<T>[];
  data: T[];
  loading: boolean;
  onActionView?: (data: T) => void;
  onActionEdit: (data: T) => void;
  onActionDelete: (data: T) => void;
}

const Table = <T extends object>({
  columns,
  data,
  loading,
  onActionView,
  onActionEdit,
  onActionDelete,
}: Props<T>) => {
  return (
    <div className="overflow-x-auto rounded-lg">
      <table className="min-w-full border-collapse rounded-md">
        <thead className="bg-primary/50">
          <tr>
            <th className="border border-secondary px-4 py-2 text-left text-sm font-medium text-secondary-foreground">
              No
            </th>
            {columns.map((column) => (
              <th
                key={column.header}
                className="border border-secondary px-4 py-2 text-left text-sm font-medium text-secondary-foreground"
              >
                {column.header}
              </th>
            ))}

            <th className="border border-secondary px-4 py-2 text-center text-sm font-medium text-secondary-foreground">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-background">
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className="border border-secondary px-4 py-2 text-sm text-foreground">
                  {rowIndex + 1}
                </td>
                {columns.map((column) => (
                  <td
                    key={column.header}
                    className="border border-secondary px-4 py-2 text-sm text-foreground"
                  >
                    {row[column.accessor] as React.ReactNode}
                  </td>
                ))}

                <td className="border border-secondary px-4 py-2 text-sm text-foreground">
                  <div className="flex justify-center items-center gap-2">
                    {onActionView && (
                      <Eye
                        className="text-primary cursor-pointer hover:text-primary/80 size-5"
                        onClick={() => onActionView(row)}
                      />
                    )}
                    <Edit
                      className="text-primary cursor-pointer hover:text-primary/80 size-5"
                      onClick={() => onActionEdit(row)}
                    />
                    <Trash
                      className="text-destructive cursor-pointer hover:text-destructive/80 size-5"
                      onClick={() => onActionDelete(row)}
                    />
                  </div>
                </td>
              </tr>
            ))
          ) : loading ? (
            <td colSpan={columns.length + 2} className="w-full h-12">
              <Loader className="animate-spin mx-auto" />
            </td>
          ) : (
            <tr>
              <td
                colSpan={columns.length + 2}
                className="border border-background px-4 py-2 text-center text-muted-foreground"
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
