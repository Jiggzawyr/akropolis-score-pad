import { ScoreBlock as ScoreBlockModel, HandleOnChange, HandleOnFocus } from "@/models/score";

const ScoreBlock = ({
    scoreBlock,
    columnIndex,
    blockIndex,
    isLastColumn,
    handleOnChange,
    handleOnFocus,
}: {
    scoreBlock: ScoreBlockModel;
    columnIndex: number;
    blockIndex: number;
    isLastColumn: boolean;
    handleOnChange: HandleOnChange;
    handleOnFocus: HandleOnFocus;
}) => {
    return (
        <div>
            <div className="h-[60px]">
                <div className="flex h-1/2">
                    <div className="w-[40%]">
                        <input
                            type="number"
                            min="0"
                            max="19"
                            step="1"
                            aria-label="Stars"
                            className="bg-[#eeeced] bg-[url('/star.png')] bg-contain bg-no-repeat bg-center text-center h-full w-full"
                            value={scoreBlock.stars}
                            onChange={e =>
                                handleOnChange(columnIndex, blockIndex, "stars", e.target.value)
                            }
                            onFocus={e => handleOnFocus(e.target)}
                        />
                    </div>
                    <div className="flex justify-center items-center w-[20%] text-center">
                        X
                    </div>
                    <div
                        className={
                            "w-[40%] " +
                            (isLastColumn ? "" : "border-r-2 border-black")
                        }
                    >
                        <input
                            type="number"
                            min="0"
                            max="999"
                            step="1"
                            aria-label="Tiles"
                            className="bg-[#eeeced] bg-[url('/hexagon.png')] bg-contain bg-no-repeat bg-center text-center h-full w-full"
                            value={scoreBlock.tiles}
                            onChange={e =>
                                handleOnChange(columnIndex, blockIndex, "tiles", e.target.value)
                            }
                            onFocus={e => handleOnFocus(e.target)}
                        />
                    </div>
                </div>
                <div
                    className={
                        "flex justify-center items-center h-[50%] border-b-2 border-black " +
                        (isLastColumn ? "" : "border-r-2")
                    }
                >
                    <div className="w-[40%] text-center">=</div>
                    <div className="w-[60%] text-center">{scoreBlock.total}</div>
                </div>
            </div>
        </div>
    );
};

export default ScoreBlock;
