import React from "react";

const setSpeedfn = (value, old) => {
    if (value === '') {
        return value;
    }
    const newVal = Number.parseInt(value, 10);
    const oldVal = Number.parseInt(old, 10);
    if (Number.isNaN(newVal)) {
        if (Number.isNaN(oldVal)) {
            return 0;
        }
        return oldVal;
    }
    return newVal;
}

const Controls = ({cols, rows, speed, playing, changeCols, changeRows, changeSpeed, changePlaying, clearWorld}) => {
    return (
        <div className="control-wrapper">
            <label>Fields</label><input onChange={(e) => changeCols(e.target.value)} value={cols}/>
            <label>Rows</label><input onChange={(e) => changeRows(e.target.value)} value={rows}/>
            <button onClick={() => changeSpeed(setSpeedfn(speed-1, speed))}>-</button>
            <input value={speed} onChange={(e) => changeSpeed(setSpeedfn(e.target.value, speed))}/>
            <button onClick={() => changeSpeed(setSpeedfn(speed+1, speed))}>+</button>
            <button onClick={() => changePlaying()}>{playing ? 'Stop' : 'Play'}</button>
            <button onClick={() => clearWorld()}>Clear</button>
        </div>
    );
}
export default Controls;
