import React from 'react';
import './styles.less';
import TrackViewer from './TrackViewer';
import config from './config';
import data from './data';

const rows = JSON.parse(data);

export default function TableUse() {
    return <TrackViewer {...config} rows={rows} />;
}
