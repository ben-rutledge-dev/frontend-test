import "./Table.css";

interface Row {
  id: string;
}

export interface Column<T extends Row> {
  key: string;
  label: string;
  render: (row: T) => React.ReactNode;
}

interface TableProps<T extends Row> {
  data: T[];
  columns: Column<T>[];
}

function Table<T extends Row>({ data, columns }: TableProps<T>) {
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
                    {column.render(row)}
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
