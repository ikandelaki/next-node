import Link from 'next/link';
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
    columns: ColumnType[],
    className?: string,
    shouldRenderLink?: boolean
}

const Table = ({ data, columns, className, shouldRenderLink }: TableType) => {
  const renderLink = (rowIndex: number) => {
    if (!shouldRenderLink || data[rowIndex].id === undefined || data[rowIndex].id === null) {
      return null;
    }

    return (
      <td className='hover:underline'>
        <Link href={ `menus/${data[rowIndex].id.toString()}` }>Edit</Link>
      </td>
    );
  }

  return (
    <table className={ className }>
      <thead>
        <tr>
          { columns.map((column) => (
            <th key={ column.id }>
              { column.label }
            </th>
          )) }
          { shouldRenderLink && <th>Actions</th> }
        </tr>
      </thead>
      <tbody>
        { data.map((row, rowIndex) => (
          <tr key={ rowIndex }>
            { columns.map((column) => (
              <td key={ column.id }>
                { row[column.id] }
              </td>
            )) }
            { renderLink(rowIndex) }
          </tr>
        )) }
      </tbody>
    </table>
  );
};

export default Table;
