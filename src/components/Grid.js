import React from "react";

const Grid = ({ world, changeWorld }) => {
    const changeStatus = (i, j) => {
        const data = world;
        data[i][j] = !world[i][j];
        changeWorld(data);
    }
    const loadGrid = () => {
        const response = [];
        world.forEach((rows, i) => {
            const tr = [];
            rows.forEach((status, j) => {
                tr.push(<td key={`cell${i}-${j}`} className={status ? 'alive' : 'dead'} onClick={() => changeStatus(i, j)}/>)
            });
            response.push(<tr key={`tr${i}`}>{tr}</tr>);
        });
        return response;
    };
        
    return (
        <div>
            <table>
                <tbody>
                    {loadGrid()}
                </tbody>
            </table>
        </div>
    );
}
export default Grid;
