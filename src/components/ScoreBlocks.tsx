import { ScoreBlock } from "@/models/score";

const ScoreBlock = ( {scoreBlock, rowIndex, blockIndex, handleOnChange}: {scoreBlock: ScoreBlock, rowIndex: number, blockIndex: number, handleOnChange: any} ) => {

    return (
        <div>
            <div>
                Stars:
                <input
                    type="number" min="0" max="999" step="1"
                    defaultValue={scoreBlock.stars} 
                    value={scoreBlock.stars}
                    onChange={ e => handleOnChange(rowIndex, blockIndex, "stars", e.target.value,)} 
                >
                </input>
            </div>
            <div>
                Tiles:
                <input
                    type="number" min="0" max="999" step="1"
                    defaultValue={scoreBlock.tiles} 
                    value={scoreBlock.tiles}
                    onChange={ e => handleOnChange(rowIndex, blockIndex, "tiles", e.target.value)} 
                >
                </input>
            </div>
            <div>
                Total:
                <span>
                    {scoreBlock.total}
                </span>
            </div>
        </div>
    )

}

export default ScoreBlock;