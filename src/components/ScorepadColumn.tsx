import { ScorepadColumn as ScorepadColumnModel, HandleOnChange, HandleOnFocus } from "@/models/score";
import ScoreBlock from "./ScoreBlocks";

const ScorepadColumn = ({
    scoreColumn,
    columnIndex,
    isLastColumn,
    handleOnChange,
    handleOnFocus,
}: {
    scoreColumn: ScorepadColumnModel;
    columnIndex: number;
    isLastColumn: boolean;
    handleOnChange: HandleOnChange;
    handleOnFocus: HandleOnFocus;
}) => {
    return (
        <div className="w-[120px]">
            <div className="border-b-8 border-dashed border-slate-700">
                <input
                    type="text"
                    maxLength={12}
                    aria-label="Player name"
                    className="bg-[url('/img/background2.jpg')] text-center h-[40px] w-full"
                    value={scoreColumn.player}
                    onChange={e =>
                        handleOnChange(columnIndex, null, "player", e.target.value)
                    }
                    onFocus={e => handleOnFocus(e.target)}
                />
            </div>
            <div>
                {scoreColumn.scoreBlocks.map((elem, index) => (
                    <ScoreBlock
                        scoreBlock={elem}
                        columnIndex={columnIndex}
                        blockIndex={index}
                        isLastColumn={isLastColumn}
                        handleOnChange={handleOnChange}
                        handleOnFocus={handleOnFocus}
                        key={"block-" + index}
                    />
                ))}
            </div>
            <div>
                <div
                    className={
                        "flex justify-center items-center h-[40px] text-center border-b-2 border-black " +
                        (isLastColumn ? "" : "border-r-2")
                    }
                >
                    <input
                        type="number"
                        min="0"
                        max="999"
                        step="1"
                        aria-label="Stone bonus"
                        className="m-auto text-center w-[40%] h-[75%] bg-[#eeeced]"
                        value={scoreColumn.scoreStone}
                        onChange={e =>
                            handleOnChange(columnIndex, null, "stones", e.target.value)
                        }
                        onFocus={e => handleOnFocus(e.target)}
                    />
                </div>
            </div>
            <div
                className={
                    "flex justify-center items-center text-center h-[40px] p-[5px] font-bold text-lg " +
                    (isLastColumn ? "" : "border-r-2 border-black")
                }
            >
                {scoreColumn.scoreTotal}
            </div>
        </div>
    );
};

export default ScorepadColumn;
