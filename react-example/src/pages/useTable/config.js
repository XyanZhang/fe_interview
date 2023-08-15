import React from 'react';

const doFormatNumber = (number) => (number < 10 ? '0' : '') + number;
const styles = {
    en: { m: ':', s: '' },
    cn: { m: '分', s: '秒' },
};
const dur2time = (dura, lang) => {
    const style = styles[lang] || styles.en;
    // 简单处理下精度误差
    const duration = parseInt(dura.toFixed(10), 10) || 0;
    if (!duration) return `00${style.m}00${style.s}`;
    const sec = Math.floor(duration % 60),
        mnu = Math.floor(duration / 60);
    return doFormatNumber(mnu) + style.m + doFormatNumber(sec) + style.s;
};

export default {
    columns: [
        {
            Header: '',
            id: 'num',
            canResize: false,
            width: 50,
            grow: 0,
            canSort: false,
            canFilter: false,
            Cell: ({ row }) => {
                const { index } = row;
                return index < 9 ? `0${index + 1}` : index + 1;
            },
        },
        {
            Header: '',
            id: 'oper',
            canResize: false,
            width: 62,
            grow: 0,
            canSort: false,
            canFilter: false,
            Cell: () => {
                return (
                    <>
                        <span role="img" aria-label="love">
                            💟
                        </span>
                        <span role="img" aria-label="download">
                            ⏬
                        </span>
                    </>
                );
            },
        },
        {
            Header: '音乐标题',
            id: 'name',
            accessor: (data) => data.name,
            canResize: true,
            width: 200,
            grow: 4,
            canSort: true,
            canFilter: true,
            Cell: ({ value }) => value,
        },
        {
            Header: '歌手',
            id: 'ar',
            accessor: (data) => data.artists,
            sortAccessor: (artists) => (artists[0] || {}).name || '',
            width: 100,
            grow: 2,
            canResize: true,
            canSort: true,
            filterKey: 'name',
            canFilter: true,
            Cell: ({ value }) => value.map((artist) => artist.name).join('/'),
        },
        {
            Header: '专辑',
            id: 'al',
            accessor: (data) => data.album,
            sortAccessor: (album) => album.name,
            width: 100,
            grow: 2,
            canResize: true,
            canSort: true,
            filterKey: 'name',
            canFilter: true,
            Cell: ({ value }) => value.name,
        },
        {
            Header: '时长',
            id: 'dt',
            accessor: (data) => data.duration,
            sortMethod: (left, right) => left - right,
            width: 100,
            grow: 2,
            canSort: true,
            canResize: true,
            Cell: ({ value = 0 }) => dur2time(value / 1000),
        },
    ],
    sortType: 2,
};
