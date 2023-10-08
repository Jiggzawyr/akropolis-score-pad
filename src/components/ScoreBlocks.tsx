import { ScoreBlock } from "@/models/score";

const ScoreBlock = ( {scoreBlock, rowIndex, blockIndex, handleOnChange}: {scoreBlock: ScoreBlock, rowIndex: number, blockIndex: number, handleOnChange: any} ) => {

    return (
        <div className="border-b-2 border-r-2 border-black">
            <div className="h-[80px]">
                <div className="flex h-1/2">
                    <div className="w-[40%]">
                        <input
                            type="number" min="0" max="999" step="1"
                            className="
                                bg-[url('/star.png')] 
                                bg-contain 
                                bg-no-repeat 
                                bg-center 
                                text-center 
                                h-full
                                w-full
                            "
                            defaultValue={scoreBlock.stars} 
                            value={scoreBlock.stars}
                            onChange={ e => handleOnChange(rowIndex, blockIndex, "stars", e.target.value,)} 
                        />
                    </div>
                    <div className="w-[20%] text-center p-1">
                        X
                    </div>
                    <div className="w-[40%]">
                        <input
                            type="number" min="0" max="999" step="1"
                            className="
                                bg-[url('/hexagon.png')] 
                                bg-contain 
                                bg-no-repeat 
                                bg-center 
                                text-center 
                                h-full
                                w-full
                            "
                            defaultValue={scoreBlock.tiles} 
                            value={scoreBlock.tiles}
                            onChange={ e => handleOnChange(rowIndex, blockIndex, "tiles", e.target.value)} 
                        />
                    </div>
                </div>
                <div className="flex h-1/2">
                    <div className="w-2/5 text-center p-[4px]">
                        =
                    </div>
                    <div className="w-3/5 text-center p-[4px]">
                        {scoreBlock.total}
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ScoreBlock;