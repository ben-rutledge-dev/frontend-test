import "./Table.css";

export interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
}

function Table<T extends { id: number }>({ data, columns }: TableProps<T>) {
  return (
    <div className="tableWrapper">
      <table className="table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={String(column.key)} className="th">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row) => (
              <tr key={row.id} className="tr">
                {columns.map((column) => (
                  <td key={String(column.key)} className="td">
                    {column.render
                      ? column.render(row[column.key], row)
                      : String(row[column.key])}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="noData">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
