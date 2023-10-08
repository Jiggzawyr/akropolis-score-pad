import{ useState } from "react";
import { ScoreTable } from "@/models/score";
import ScorepadRow from "./ScorepadRow";
import { scoreTableStart } from "./startData";

const Scorepad = () => {

    const [scoreTable, setScoreTable] = useState<ScoreTable>(scoreTableStart);

    const handleOnChange = (rowIndex: number, blockIndex: number, field: string, value: string) => {
        let val: any;
        if(field == "player"){
            val = value;
        } else {
            if(value ===  '') val = 0;
            val = parseInt(value); 
            if(val > 999) val = 999;
        }
        setScoreTable( (prevData: ScoreTable) => {
            let newData: ScoreTable = {...prevData};
            switch(field){
                case "stars": newData.scoreRows[rowIndex].scoreBlocks[blockIndex].stars = val; break;
                case "tiles": newData.scoreRows[rowIndex].scoreBlocks[blockIndex].tiles = val; break;
                case "stones": newData.scoreRows[rowIndex].scoreStone = val; break;
                case "player": newData.scoreRows[rowIndex].player = val; break;
            };
            if(field == "player") return newData;
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
        <div className="m-auto flex justify-center p-4">
            <div className="w-[100px]">
                <div className="border-b-8 border-r-8 border-dashed border-slate-700">
                    <img src="/players.png" className="h-[60px] m-auto p-[5px]"/>
                </div>
                <div className="border-r-8 border-dashed border-slate-700">
                    <div className="border-b-2 border-black">
                        <img src="/tiles/house.png" className="h-[80px] m-auto p-[2px]"/>
                    </div>
                </div>
                <div className="border-r-8 border-dashed border-slate-700">
                    <div className="border-b-2 border-black">
                        <img src="/tiles/market.png" className="h-[80px] m-auto p-[2px]"/>
                    </div>
                </div>
                <div className="border-r-8 border-dashed border-slate-700">
                    <div className="border-b-2 border-black">
                        <img src="/tiles/barrack.png" className="h-[80px] m-auto p-[2px]"/>
                    </div>
                </div>
                <div className="border-r-8 border-dashed border-slate-700">
                    <div className="border-b-2 border-black">
                        <img src="/tiles/temple.png" className="h-[80px] m-auto p-[2px]"/>
                    </div>
                </div>
                <div className="border-r-8 border-dashed border-slate-700">
                    <div className="border-b-2 border-black">
                        <img src="/tiles/garden.png" className="h-[80px] m-auto p-[2px]"/>
                    </div>
                </div>
                <div className="border-r-8 border-dashed border-slate-700">
                    <div className="border-b-2 border-black">
                        <img src="/stone.png" className="h-[60px] m-auto p-[2px]"/>
                    </div>
                </div>
                <div className="text-center">
                    <div className="border-r-8 border-dashed border-slate-700 h-[60px]">
                        =
                    </div>
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