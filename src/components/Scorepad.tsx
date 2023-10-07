import{ useEffect, useState } from "react";
import { ScoreTable } from "@/models/score";
import ScorepadRow from "./ScorepadRow";
import { scoreTableStart } from "./startData";

const Scorepad = () => {

    const [scoreTable, setScoreTable] = useState<ScoreTable>(scoreTableStart);

    const handleOnChange = (rowIndex: number, blockIndex: number, field: string, value: string) => {
        console.log("TEST");
        let val: number;
        if(value ===  '') val = 0;
        val = parseInt(value); 
        if(val > 999) val = 999;
        setScoreTable( (prevData: ScoreTable) => {
            let newData: ScoreTable = {...prevData};
            switch(field){
                case "stars": newData.scoreRows[rowIndex].scoreBlocks[blockIndex].stars = val; break;
                case "tiles": newData.scoreRows[rowIndex].scoreBlocks[blockIndex].tiles = val; break;
                case "stones": newData.scoreRows[rowIndex].scoreStone = val; break;
            };
            if(field != "stones") newData.scoreRows[rowIndex].scoreBlocks[blockIndex].total = 
                newData.scoreRows[rowIndex].scoreBlocks[blockIndex].stars * newData.scoreRows[rowIndex].scoreBlocks[blockIndex].tiles;
            newData.scoreRows[rowIndex].scoreTotal = 
                newData.scoreRows[rowIndex].scoreStone + newData.scoreRows[rowIndex].scoreBlocks.reduce(
                    (sum, scoreBlock) => sum + scoreBlock.total, 0
                )
            return newData;
        });
    }

    return (
        <div className="m-auto flex justify-center bg-[url('/img/background.img)]">
            <div>
                Test
                <div>
                    BLUE
                </div>
                <div>
                    YELLOW
                </div>
                <div>
                    RED
                </div>
                <div>
                    PURPLE
                </div>
                <div>
                    GREEN
                </div>
                <div>
                    =
                </div>
            </div>
            {
                scoreTable?.scoreRows.map( (elem, index) => 
                    <ScorepadRow 
                        scoreRows={elem} 
                        rowIndex={index} 
                        handleOnChange={handleOnChange} 
                        key={"row-"+index}
                    ></ScorepadRow>
                )
            }
        </div>
    )

}

export default Scorepad;