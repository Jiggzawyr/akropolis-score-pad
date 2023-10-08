import { ScoreRow } from "@/models/score";
import ScoreBlock from "./ScoreBlocks";

const ScorepadRow = ( {scoreRows, rowIndex,  handleOnChange}: {scoreRows: ScoreRow, rowIndex: number, handleOnChange: any} ) => {
    
    return (
        <div className="w-[140px]">
            <div className="border-b-8 border-dashed border-slate-700">
                <input
                    type="text" maxLength={12}
                    className="bg-[url('/img/background2.jpg')] text-center h-[60px] w-full"
                    value={scoreRows.player}
                    onChange={ e => handleOnChange(rowIndex, null, "player", e.target.value)} 
                />
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
            <div className="border-b-2 border-r-2 border-black ">
                <div className="h-[60px] text-center">
                    <input
                        type="number" min="0" max="999" step="1"
                        className="m-auto text-center w-2/5 h-1/2 mt-[15px]"
                        defaultValue={scoreRows.scoreStone}
                        value={scoreRows.scoreStone}
                        onChange={ e => handleOnChange(rowIndex, null, "stones", e.target.value)} 
                    />
                </div>
            </div>
            <div className="border-2 text-center h-[60px]">
                {scoreRows.scoreTotal}
            </div>
        </div>
    )

}

export default ScorepadRow;