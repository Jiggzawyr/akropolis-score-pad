import { ScoreRow } from "@/models/score";
import ScoreBlock from "./ScoreBlocks";

const ScorepadRow = ( {scoreRows, rowIndex,  handleOnChange}: {scoreRows: ScoreRow, rowIndex: number, handleOnChange: any} ) => {
    
    return (
        <div>
            <div>
                {scoreRows.player}
            </div>
            <div>
            {
                scoreRows?.scoreBlocks.map( (elem, index) => 
                    <ScoreBlock 
                        scoreBlock={elem} 
                        rowIndex={rowIndex} 
                        blockIndex={index} 
                        handleOnChange={handleOnChange}
                        key={'block-'+index}
                    ></ScoreBlock>
                )
            }
            </div>
            <div>
                Stones:
                <input
                    type="number" min="0" max="999" step="1"
                    defaultValue={scoreRows.scoreStone}
                    value={scoreRows.scoreStone}
                    onChange={ e => handleOnChange(rowIndex, null, "stones", e.target.value)} 
                >
                </input>
            </div>
            <div>
                Total:
                <span>
                    {scoreRows.scoreTotal}
                </span>
            </div>
        </div>
    )

}

export default ScorepadRow;