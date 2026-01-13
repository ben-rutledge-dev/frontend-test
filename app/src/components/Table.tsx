import "./Table.css";

interface DataColumn<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

interface ActionColumn<T> {
  label: string;
  render(value: T, row: T): React.ReactNode;
}

export type Column<T> = DataColumn<T> | ActionColumn<T>;

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
              <th
                key={"key" in column ? String(column.key) : "_actions"}
                className="th"
              >
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
                  <td
                    key={"key" in column ? String(column.key) : "_actions"}
                    className="td"
                  >
                    {"key" in column
                      ? column.render
                        ? column.render(row[column.key], row)
                        : String(row[column.key])
                      : column.render(row, row)}
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
