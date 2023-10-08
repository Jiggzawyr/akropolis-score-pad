import { ScorepadColumn } from "@/models/score";
import ScoreBlock from "./ScoreBlocks";

const ScorepadColumn = ( {scoreColumn, columnIndex,  handleOnChange, handleOnFocus}: {
    scoreColumn: ScorepadColumn, columnIndex: number, handleOnChange: any, handleOnFocus: any
} ) => {
    return (
        <div className="w-[120px]">
            <div className="border-b-8 border-dashed border-slate-700">
                <input
                    type="text" maxLength={12}
                    className="bg-[url('/img/background2.jpg')] text-center h-[40px] w-full"
                    value={scoreColumn.player}
                    onChange={ e => handleOnChange(columnIndex, null, "player", e.target.value)} 
                    onFocus={ e => handleOnFocus(e.target)}
                />
            </div>
            <div>
            {
                scoreColumn?.scoreBlocks.map( (elem, index) => 
                    <ScoreBlock 
                        scoreBlock={elem} 
                        columnIndex={columnIndex} 
                        blockIndex={index} 
                        handleOnChange={handleOnChange}
                        handleOnFocus={handleOnFocus}
                        key={'block-'+index}
                    ></ScoreBlock>
                )
            }
            </div>
            <div>
                <div 
                    className={"flex justify-center items-center h-[40px] text-center border-b-2 border-black " + (columnIndex == 3 ? "" : "border-r-2")}
                >
                    <input
                        type="number" min="0" max="999" step="1"
                        className="m-auto text-center w-[40%] h-[75%] bg-[#eeeced]"
                        value={scoreColumn.scoreStone}
                        onChange={ e => handleOnChange(columnIndex, null, "stones", e.target.value)} 
                        onFocus={ e => handleOnFocus(e.target)}
                    />
                </div>
            </div>
            <div 
                className={"flex justify-center items-center text-center h-[40px] p-[5px] " + (columnIndex == 3 ? "" : "border-r-2 border-black")}
            >
                {scoreColumn.scoreTotal}
            </div>
        </div>
    )

}

export default ScorepadColumn;