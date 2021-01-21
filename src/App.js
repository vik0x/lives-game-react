import React, { useEffect, useState } from 'react';
import './App.css';
import Controls from './components/Controls';
import Grid from './components/Grid';
import {initCols, initRows, initSpeed} from './settings';

const App = () => {
    const [age, setAge] = useState(0);
    const [speed, setSpeed] = useState(initSpeed);
    const [cols, setCols] = useState(initCols);
    const [rows, setRows] = useState(initRows);
    const [world, setWorld] = useState([]);
    const [playing, setPlaying] = useState(false);
    const [refresh, setRefresh] = useState(1);

    const changeWorld = (items) => {
        setWorld(items);
        setRefresh(refresh+1);
    }
    const clearWorld = () => {
        const newWorld = world.map((row) => row.map((cell) => false));
        setWorld(newWorld);
        setRefresh(refresh+1);
    }
    useEffect(() => {
        if (!playing) {
            return null;
        }
        const speedValue = 1000 - (speed * 10);
        const newWorld = world.map((wRow, ri) => wRow.map((cell, ci) => {
            const initI = ri === 0 ? ri : ri -1;
            const endI = ri === rows - 1 ? ri : ri + 1;
            const initJ = ci === 0 ? ci : ci -1;
            const endJ = ci === cols - 1 ? ci : ci + 1;
            
            let count = 0;
            
            for (let i = initI; i <= endI; i++) {
                for (let j = initJ; j <= endJ; j++) {
                    if (!(ri === i && ci === j) && world[i][j] === true) {
                        count = count + 1;
                    }
                }
            }

            return count === 3 || (count === 2 && cell);
        }));

        setWorld(newWorld);

        setTimeout(() => {
            setAge(age+1);
        }, speedValue < 1 ? 1 : speedValue);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [age, speed, playing, refresh]);

    useEffect(() => {
        const data = [];
        for (let i = 0; i < rows; i++) {
            data.push([]);
            for (let j = 0; j < cols; j++) {
                data[i].push(false);
            }
        }
        setWorld(data);
    }, [cols, rows]);

    return (
        <div className="bg-dark">
            {age}
            <Controls
                cols={cols}
                rows={rows}
                speed={speed}
                playing={playing}
                changeSpeed={(e) => setSpeed(e)}
                changeCols={(e) => setCols(e)}
                clearWorld={() => clearWorld()}
                changePlaying={() => setPlaying(!playing)}
                changeRows={(e) => setRows(e)} />
            <Grid world={world} changeWorld={(e) => changeWorld(e)} />
        </div>
    );
}
export default App;
