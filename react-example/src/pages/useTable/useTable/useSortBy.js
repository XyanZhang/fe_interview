import { useState, useCallback } from 'react';

const pinyinCompare = (leftArg, rightArg) => {
    const left = String(leftArg || '').trim();
    const right = String(rightArg || '').trim();
    if (left === right) {
        return 0;
    }
    if (!left || !right) {
        return left.length - right.length;
    }
    return left.localeCompare(right, 'zh-Hans-CN', {
        numeric: true,
    });
};

const useSortBy = (props) => {
    // sortType 0: 关闭排序功能; 1: 正-反 排序; 2: 正-反-默认 排序
    const {
        columns,
        sortType = 1
    } = props;

    const [sortBy, setSortBy] = useState({});

    // flag 'asc|desc|reset'
    const toggleSortBy = useCallback(
        (column) => (flag) =>
            setSortBy((lastSortBy) => {
                let newSortBy;
                if (sortType === 0) {
                    return lastSortBy;
                }
                if (flag === 'asc' || flag === 'desc') {
                    newSortBy = {
                        id: column.id,
                        reverse: flag === 'desc',
                    };
                } else if (flag === 'reset') {
                    newSortBy = {};
                } else if (lastSortBy.id && column.id === lastSortBy.id) {
                    if (!lastSortBy.reverse) {
                        newSortBy = {
                            id: column.id,
                            reverse: true,
                        };
                    } else if (sortType === 2) {
                        newSortBy = {};
                    } else {
                        newSortBy = {
                            id: column.id,
                            reverse: false,
                        };
                    }
                } else {
                    newSortBy = {
                        id: column.id,
                        reverse: false,
                    };
                }
                return newSortBy;
            }),
        [sortType]
    );

    const getSortByToggleProps = useCallback(
        (column) => () => ({
            onClick: column.canSort
                ? (e) => {
                      e.persist();
                      column.toggleSortBy();
                  }
                : undefined,
            style: {
                cursor: column.canSort ? 'pointer' : undefined,
            },
            title: '点击排序',
            sortable: !!(column.canSort && sortType !== 0),
            sorting: sortBy.id === column.id,
            sortReverse: !!sortBy.reverse,
        }),
        [sortBy, sortType]
    );

    const useColumns = useCallback(
        (cols) =>
            cols.map((column) => {
                const newColumn = {};
                Object.assign(newColumn, column, {
                    toggleSortBy: column.canSort
                        ? toggleSortBy(newColumn)
                        : null,
                    getSortByToggleProps: getSortByToggleProps(newColumn),
                });
                return newColumn;
            }),
        [getSortByToggleProps, toggleSortBy]
    );

    const useRows = useCallback(
        (rows) => {
            if (sortBy.id) {
                const sortColumn = columns.find(
                    (column) => column.id === sortBy.id
                );
                if (sortColumn) {
                    const { sortMethod = pinyinCompare, sortAccessor } = sortColumn;
                    const sortedRows = [...rows].sort((rowA, rowB) => {
                        let valueA = rowA.values[sortBy.id];
                        let valueB = rowB.values[sortBy.id];
                        if (sortAccessor) {
                            valueA = sortAccessor(valueA, rowA);
                            valueB = sortAccessor(valueB, rowB);
                        }
                        return (
                            sortMethod(valueA, valueB, rowA, rowB) *
                            (sortBy.reverse ? -1 : 1)
                        );
                    });
                    sortedRows.forEach((row, index) => {
                        Object.assign(row, {
                            index,
                        });
                    });
                    return sortedRows;
                }
            }
            rows.forEach((row, index) => {
                Object.assign(row, {
                    index,
                });
            });
            return rows;
        },
        [columns, sortBy.id, sortBy.reverse]
    );

    return {
        useColumns,
        useRows,
        sortBy,
    };
};

export default useSortBy;
