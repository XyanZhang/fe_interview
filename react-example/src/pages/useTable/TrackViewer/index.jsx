import React from 'react';
import useTable, {
    useDragger,
    useLayout,
    useResizer,
    useSelect,
    useSortBy,
} from '../useTable';

const HeaderRow = ({ headers, ...rest }) => {
    return (
        <div className="headerRow" {...rest}>
            {headers.map((header, index) => {
                const {
                    sorting,
                    sortReverse,
                    sortable,
                    ...titleProps
                } = header.column.getSortByToggleProps();
                return (
                    <div
                        className={`header${sortable ? ' sortable' : ''}${
                            sorting ? ' sorting' : ''
                        }`}
                        {...header.getHeaderProps()}
                    >
                        <div className="title" {...titleProps}>
                            <div>{header.renderHeader()}</div>
                        </div>
                        {sortable ? (
                            <div className="sortIcn">
                                {sorting ? (sortReverse ? '⬇︎' : '⬆︎') : '⬍'}
                            </div>
                        ) : null}
                        {index < headers.length - 1 && header.column.canSort ? (
                            <div
                                className="resize"
                                {...header.column.getResizerProps()}
                            />
                        ) : null}
                    </div>
                );
            })}
        </div>
    );
};

const Row = ({
    index,
    data,
    res,
    cells,
    selected,
    type,
    doSelect,
    ...rest
}) => {
    return (
        <div
            className={`row${selected ? ' selected' : ''}${
                index % 2 === 0 ? ' dark' : ''
            }`}
            {...rest}
        >
            {cells.map((cell) => (
                <div className="cell" {...cell.getCellProps()}>
                    {cell.renderCell()}
                </div>
            ))}
        </div>
    );
};

export default function NormalTrackViewer(props) {
    const {
        headers,
        getTableProps,
        getTableBodyProps,
        getHeaderRowProps,
        getRowProps,
        getRowCells,
        rows = [],
    } = useTable(
        {
            ...props,
            rows: props.rows,
        },
        useLayout,
        useResizer,
        useSelect,
        useSortBy
        // useDragger
    );

    return (
        <div className="table" {...getTableProps()}>
            <HeaderRow {...getHeaderRowProps()} headers={headers} />
            <div className="body" {...getTableBodyProps()}>
                {rows.map((row, index) => {
                    return (
                        <Row
                            {...getRowProps(row)}
                            index={index}
                            cells={getRowCells(row)}
                        />
                    );
                })}
            </div>
        </div>
    );
}
