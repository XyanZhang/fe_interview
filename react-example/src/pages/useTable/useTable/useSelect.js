import { useState, useRef, useCallback } from 'react';

const ctrlKeyName = 'metaKey';

const useSelect = (props) => {
    const { rows: topRows } = props;

    const [selectedRows, setSelectedRows] = useState(() => new Set());
    const selectPivot = useRef();

    const selectAll = useCallback(() => {
        setSelectedRows(new Set(topRows.map((r) => r.primaryValue)));
    }, [topRows]);

    const clearAll = useCallback(() => {
        setSelectedRows(new Set());
    }, []);

    const doSelect = useCallback((row, forceSelected, clear) => {
        setSelectedRows((currentSelectedRows) => {
            let nextSelectedRows;
            if (clear) {
                nextSelectedRows = new Set();
            } else {
                nextSelectedRows = new Set(currentSelectedRows);
            }
            const currentSelected = currentSelectedRows.has(row.primaryValue);
            const nextSelected =
                forceSelected == null ? !currentSelected : forceSelected;
            if (nextSelected) {
                // 免于更新
                if (currentSelected && currentSelectedRows.size === 1) {
                    return currentSelectedRows;
                }
                nextSelectedRows.add(row.primaryValue);
            } else {
                nextSelectedRows.delete(row.primaryValue);
            }
            return nextSelectedRows;
        });
    }, []);

    const doSelectRowsBetween = useCallback((first, second, forceSelected) => {
        const indexA = first.index;
        const indexB = second.index;
        const begin = Math.min(indexA, indexB);
        const end = Math.max(indexA, indexB);
        const { rows } = first.api;
        const newSelectedRows = new Set();
        for (let i = begin; i <= end; i++) {
            newSelectedRows.add(rows[i].primaryValue);
        }
        setSelectedRows((currentSelectedRows) => {
            const currentFirstSelected = currentSelectedRows.has(
                first.primaryValue
            );
            const nextSelected =
                forceSelected == null ? currentFirstSelected : forceSelected;
            if (nextSelected) {
                return new Set([...currentSelectedRows, ...newSelectedRows]);
            }
            return new Set(
                [...currentSelectedRows].filter((x) => !newSelectedRows.has(x))
            );
        });
    }, []);

    const handleMouseUp = useCallback(
        (row) => (event) => {
            const { button, [ctrlKeyName]: ctrlKey, shiftKey } = event;
            if (!ctrlKey && !shiftKey && button === 0) {
                doSelect(row, true, true);
                selectPivot.current = row;
            }
        },
        [doSelect]
    );

    const handleMouseDown = useCallback(
        (row) => (event) => {
            const { button, [ctrlKeyName]: ctrlKey, shiftKey } = event;
            if (button !== 0) {
                return;
            }
            // 无键盘辅助键
            if (!ctrlKey && !shiftKey) {
                doSelect(row, true, true);
                selectPivot.current = row;
            }
            if (ctrlKey && shiftKey) {
                doSelectRowsBetween(selectPivot.current, row);
            } else if (ctrlKey) {
                doSelect(row);
                selectPivot.current = row;
            } else if (shiftKey) {
                clearAll();
                doSelectRowsBetween(selectPivot.current, row, true);
            }
        },
        [clearAll, doSelect, doSelectRowsBetween]
    );

    const handleSelect = useCallback(
        (row) => (forceSelected, clearBeforeSelect) =>
            doSelect(row, forceSelected, clearBeforeSelect),
        [doSelect]
    );

    const useRowProps = useCallback(
        (row) => ({
            onMouseDown: handleMouseDown(row),
            onMouseUp: handleMouseUp(row),
            doSelect: handleSelect(row),
            selected: selectedRows.has(row.primaryValue),
        }),
        [handleMouseDown, handleMouseUp, handleSelect, selectedRows]
    );

    return {
        useRowProps,
        selectAll,
        clearAllSelect: clearAll,
        doSelect: handleSelect,
        selectedRows,
    };
};

export default useSelect;
