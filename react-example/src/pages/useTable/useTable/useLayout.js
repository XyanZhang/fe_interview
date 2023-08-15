import { useCallback } from 'react';

const useLayout = () => {
    const useHeaderRowProps = useCallback((row) => {
        return {
            key: ['row', row.index].join('_'),
            style: {
                display: 'flex',
            },
        };
    }, []);

    const useHeaderProps = useCallback((column) => {
        return {
            key: ['header', column.id].join('_'),
        };
    }, []);

    const useRowProps = useCallback((row) => {
        return {
            key: ['row', row.index].join('_'),
            style: {
                display: 'flex',
            },
        };
    }, []);

    const useCellProps = useCallback((cell) => {
        return {
            key: ['cell', cell.column.id].join('_'),
        };
    }, []);

    return {
        useHeaderRowProps,
        useHeaderProps,
        useRowProps,
        useCellProps,
    };
};

export default useLayout;
