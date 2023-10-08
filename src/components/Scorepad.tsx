import{ useState } from "react";
import { ScoreTable } from "@/models/score";
import ScorepadColumn from "./ScorepadColumn";
import { scoreTableStart } from "./startData";

const Scorepad = () => {

    const [scoreTable, setScoreTable] = useState<ScoreTable>(scoreTableStart);

    const handleOnChange = (columnIndex: number, blockIndex: number, field: string, value: string) => {
        let val: any;
        if(field == "player"){
            val = value;
        } else {
            if(value ===  '') val = 0;
            val = parseInt(value); 
            const maxVal = field == "stars" ? 19 : 999
            if(val > maxVal) val = maxVal;
        }
        setScoreTable( (prevData: ScoreTable) => {
            let newData: ScoreTable = {...prevData};
            switch(field){
                case "stars": newData.scorepadColumns[columnIndex].scoreBlocks[blockIndex].stars = val; break;
                case "tiles": newData.scorepadColumns[columnIndex].scoreBlocks[blockIndex].tiles = val; break;
                case "stones": newData.scorepadColumns[columnIndex].scoreStone = val; break;
                case "player": newData.scorepadColumns[columnIndex].player = val; break;
            };
            if(field == "player") return newData;
            if(field != "stones") newData.scorepadColumns[columnIndex].scoreBlocks[blockIndex].total = 
                newData.scorepadColumns[columnIndex].scoreBlocks[blockIndex].stars * newData.scorepadColumns[columnIndex].scoreBlocks[blockIndex].tiles;
            newData.scorepadColumns[columnIndex].scoreTotal = 
                newData.scorepadColumns[columnIndex].scoreStone + newData.scorepadColumns[columnIndex].scoreBlocks.reduce(
                    (sum, scoreBlock) => sum + scoreBlock.total, 0
                )
            return newData;
        });
    }

    const [focused, setFocused] = useState<any>(null);

    const handleOnFocus = (target: any) => {
        if (focused === target) return;
        setFocused(target);
        setTimeout(function () { target.select(); }, 5);
    }

    return (
        <div className="m-auto flex justify-center p-4">
            <div className="w-[80px]">
                <div className="border-b-8 border-r-8 border-dashed border-slate-700">
                    <div className="flex items-center  h-[40px]">
                        <img src="/players.png" className="max-h-[90%] m-auto p-[5px]"/>
                    </div>
                </div>
                <div className="border-r-8 border-dashed border-slate-700">
                    <div className="flex items-center border-b-2 border-black h-[60px]">
                        <img src="/tiles/house.png" className="max-h-[90%] m-auto"/>
                    </div>
                </div>
                <div className="border-r-8 border-dashed border-slate-700">
                    <div className="flex items-center  border-b-2 border-black h-[60px]">
                        <img src="/tiles/market.png" className="max-h-[90%] m-auto"/>
                    </div>
                </div>
                <div className="border-r-8 border-dashed border-slate-700">
                    <div className="flex items-center  border-b-2 border-black h-[60px]">
                        <img src="/tiles/barrack.png" className="max-h-[90%] m-auto"/>
                    </div>
                </div>
                <div className="border-r-8 border-dashed border-slate-700">
                    <div className="flex items-center  border-b-2 border-black h-[60px]">
                        <img src="/tiles/temple.png" className="max-h-[90%] m-auto"/>
                    </div>
                </div>
                <div className="border-r-8 border-dashed border-slate-700">
                    <div className="flex items-center  border-b-2 border-black h-[60px]">
                        <img src="/tiles/garden.png" className="max-h-[90%] m-auto"/>
                    </div>
                </div>
                <div className="border-r-8 border-dashed border-slate-700">
                    <div className="flex items-center  border-b-2 border-black h-[40px]">
                        <img src="/stone.png" className="max-h-[90%] m-auto"/>
                    </div>
                </div>
                <div className="text-center">
                    <div className="flex justify-center items-center border-r-8 border-dashed border-slate-700 h-[40px]">
                        =
                    </div>
                </div>
            </div>
            {
                scoreTable?.scorepadColumns.map( (elem, index) => 
                    <ScorepadColumn 
                        scoreColumn={elem} 
                        columnIndex={index} 
                        handleOnChange={handleOnChange} 
                        key={"row-"+index}
                        handleOnFocus={handleOnFocus}
                    ></ScorepadColumn>
                )
            }
        </div>
    )

}

export default Scorepad;