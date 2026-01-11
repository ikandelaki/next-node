import './Table.css';

export type DataType = {
    [key: string]: string | number;
}

export type ColumnType = {
    id: string,
    label: string
}

export type TableType = {
    data: DataType[],
    columns: ColumnType[]
}

const Table = ({ data, columns }: TableType) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.id}>
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column) => (
              <td key={column.id}>
                {row[column.id]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
