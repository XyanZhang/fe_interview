import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import * as Rx from 'rxjs';
import { takeUntil, throttleTime } from 'rxjs/operators';

const useResizer = (props) => {
    const { columns } = props;

    const curX = useRef();
    const subscription = useRef();
    // 各column指定的基本width和，总宽度减去这个和，就是flex-grow分配的宽度
    const baseWidth = useMemo(
        () => columns.reduce((pre, current) => pre + current.width, 0),
        [columns]
    );

    // 初始化各列的grow值，统一和为100，方便后面计算
    const [columnGrowArr, setColumnGrowArr] = useState(() => {
        const initalGrowTotal = columns.reduce(
            (pre, current) => pre + (current.grow || 0),
            0
        );
        return columns.map((value) => {
            let result = (value.grow / initalGrowTotal) * 100;
            if (Number.isNaN(result)) {
                result = 0;
            }
            return result;
        });
    });

    useEffect(
        () => () => {
            if (subscription.current) {
                subscription.current.unsubscribe();
            }
        },
        []
    );

    const tableRef = useRef();
    const useTableProps = useCallback(
        () => ({
            ref: tableRef,
        }),
        []
    );

    const calculateWidth = useCallback(
        (index, pageX) => {
            setColumnGrowArr((lastGrowArr) => {
                // 计算要拖动的宽度百分比
                const w = tableRef.current.offsetWidth - baseWidth;
                const offset = pageX - curX.current;
                let percentage = (offset / w) * 100;
                // 获取当前列表宽度
                const finalGrowArr = [...lastGrowArr];

                if (offset > 0) {
                    // 向右
                    // 寻找右侧可以被缩小的列
                    for (let i = index + 1; i < columns.length; i++) {
                        if (columns[i].canResize) {
                            if (percentage > finalGrowArr[i]) {
                                percentage -= finalGrowArr[i];
                                finalGrowArr[index] += finalGrowArr[i];
                                finalGrowArr[i] = 0;
                            } else {
                                finalGrowArr[i] -= percentage;
                                finalGrowArr[index] += percentage;
                                break;
                            }
                        }
                    }
                } else if (offset < 0) {
                    const realPercentage = Math.max(percentage, -finalGrowArr[index]);
                    for (let i = index + 1; i < columns.length; i++) {
                        if (columns[i].canResize) {
                            finalGrowArr[i] -= realPercentage;
                            finalGrowArr[index] += realPercentage;
                            break;
                        }
                    }
                }
                curX.current = pageX;
                return finalGrowArr;
            });
        },
        [baseWidth, columns]
    );

    const useHeaderProps = useCallback(
        (column) => ({
            style: {
                width: column.width,
                flexGrow: column.canResize ? columnGrowArr[column.index] : 0,
            },
        }),
        [columnGrowArr]
    );

    const useCellProps = useCallback(
        (cell) => ({
            style: {
                width: cell.column.width,
                flexGrow: cell.column.canResize
                    ? columnGrowArr[cell.column.index]
                    : 0,
            },
        }),
        [columnGrowArr]
    );

    const getResizerProps = useCallback(
        (column) => () => ({
            onMouseDown: (event) => {
                event.preventDefault();
                curX.current = event.pageX;
                if (subscription.current) {
                    subscription.current.unsubscribe();
                }
                subscription.current = Rx.fromEvent(document, 'mousemove')
                    .pipe(takeUntil(Rx.fromEvent(document, 'mouseup')))
                    .pipe(throttleTime(12))
                    .subscribe((ev) => {
                        ev.preventDefault();
                        calculateWidth(column.index, ev.pageX);
                    });
            },
        }),
        [calculateWidth]
    );

    const useColumns = useCallback(
        (cols) =>
            cols.map((col) => ({
                ...col,
                getResizerProps: getResizerProps(col),
            })),
        [getResizerProps]
    );

    return {
        useTableProps,
        useHeaderProps,
        useCellProps,
        useColumns,
    };
};

export default useResizer;
