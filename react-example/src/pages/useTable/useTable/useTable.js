import { useRef, useMemo, useCallback } from 'react';
import { applyHooks, flexRender, applyPropHooks } from './utils';

const decorateColumn = (column, i) => {
    let { id } = column;
    const { Header } = column;
    if (!id && typeof Header === 'string') {
        id = Header;
    }
    if (!id) {
        throw new Error('A column id is required!');
    }
    return {
        Header: '',
        Cell: (cell) => cell.value,
        show: true,
        ...column,
        id,
        index: i,
    };
};

const emptyArray = [];

const useTable = (props, ...plugins) => {
    const {
        columns: userColumns = emptyArray,
        rows: userRows = emptyArray,
        rowPrimary = 'id',
        ...rest
    } = props;

    const api = useRef({
        ...rest,
    });

    const columns = useMemo(() => {
        return userColumns.map((column, i) => {
            let col = column;
            col = decorateColumn(col, i);
            return col;
        });
    }, [userColumns]);

    api.current.columns = columns;

    const rows = useMemo(() => {
        return userRows.filter(Boolean).map((userRow, index) => {
            let itemIndex = index;
            const row = {
                data: userRow,
                index,
                itemIndex,
                api: api.current,
                primaryValue: userRow[rowPrimary],
                key: userRow[rowPrimary],
                values: columns.reduce(
                    (map, column) => {
                        const rowData = userRow || {};
                        let value = rowData[column.id];
                        if (column.accessor) {
                            value = column.accessor(rowData, index);
                        }
                        Object.assign(map, {
                            [column.id]: value,
                        });
                        return map;
                    },
                    {
                        primary: userRow[rowPrimary],
                    }
                ),
            };
            return row;
        });
    }, [columns, rowPrimary, userRows]);

    api.current.rows = rows;

    const hooksArray = {
        useColumns: [],
        useRows: [],
        useTableProps: [],
        useTableBodyProps: [],
        useHeaderRowProps: [],
        useRowProps: [],
        useHeaderProps: [],
        useCellProps: [],
    };

    plugins.filter(Boolean).forEach((plugin) => {
        const ret = plugin(api.current);
        Object.entries(ret).forEach(([key, value]) => {
            if (hooksArray[key]) {
                hooksArray[key].push(value);
            } else {
                api.current[key] = value;
            }
        });
    });

    api.current.columns = applyHooks(
        hooksArray.useColumns,
        columns,
        api.current
    );

    const finalColumns = api.current.columns;

    api.current.getTableProps = () =>
        applyPropHooks(hooksArray.useTableProps, api.current);

    api.current.getTableBodyProps = () =>
        applyPropHooks(hooksArray.useTableBodyProps, api.current);

    api.current.getHeaderRowProps = () =>
        applyPropHooks(hooksArray.useHeaderRowProps, api.current);

    api.current.getRowProps = (row) =>
        applyPropHooks(hooksArray.useRowProps, row, api.current);

    const getHeaderProps = useCallback(
        (column) => () =>
            applyPropHooks(hooksArray.useHeaderProps, column, api.current),
        [hooksArray.useHeaderProps]
    );

    const renderHeader = useCallback(
        (column) => (userProps = {}) =>
            flexRender(column.Header, {
                ...api.current,
                column,
                ...userProps,
            }),
        []
    );

    api.current.headers = useMemo(
        () =>
            finalColumns.map((column) => {
                const header = {};
                return Object.assign(header, {
                    column,
                    getHeaderProps: getHeaderProps(column),
                    renderHeader: renderHeader(column),
                });
            }),
        [finalColumns, getHeaderProps, renderHeader]
    );

    const getCellProps = useCallback(
        (cell) => () =>
            applyPropHooks(hooksArray.useCellProps, cell, api.current),
        [hooksArray.useCellProps]
    );

    const renderCell = useCallback(
        (cell) => (userProps = {}) =>
            flexRender(cell.column.Cell, {
                ...api.current,
                ...cell,
                ...userProps,
            }),
        []
    );

    api.current.rows = applyHooks(hooksArray.useRows, rows, api.current);

    api.current.getRowCells = useMemo(() => {
        return (row) => {
            Object.assign(row, {
                cells: finalColumns.map((column) => {
                    const cell = {};
                    return Object.assign(cell, {
                        column,
                        row,
                        value: row.values[column.id],
                        getCellProps: getCellProps(cell),
                        renderCell: renderCell(cell),
                    });
                }),
            });
            return row.cells;
        };
    }, [finalColumns, getCellProps, renderCell]);

    return api.current;
};

export default useTable;
