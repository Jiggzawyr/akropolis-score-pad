import { useState, useCallback, useEffect } from "react";
import {
    ScoreTable,
    ScoreField,
    HandleOnChange,
    HandleOnFocus,
} from "@/models/score";
import ScorepadColumn from "./ScorepadColumn";
import {
    createEmptyPlayer,
    createEmptyTable,
    scoreTableStart,
} from "./startData";

const STORAGE_KEY = "akropolis-scorepad";
const MIN_PLAYERS = 1;
const MAX_PLAYERS = 4;

const loadFromStorage = (): ScoreTable | null => {
    if (typeof window === "undefined") return null;
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        return JSON.parse(raw) as ScoreTable;
    } catch {
        return null;
    }
};

const saveToStorage = (data: ScoreTable) => {
    if (typeof window === "undefined") return;
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
        // localStorage full or unavailable — silently ignore
    }
};

const parseNumberInput = (value: string, max: number): number => {
    if (value === "") return 0;
    const parsed = parseInt(value, 10);
    if (isNaN(parsed)) return 0;
    return Math.min(parsed, max);
};

const Scorepad = () => {
    const [scoreTable, setScoreTable] = useState<ScoreTable>(scoreTableStart);
    const [mounted, setMounted] = useState(false);

    // Load from localStorage after mount (avoids SSR/client hydration mismatch)
    useEffect(() => {
        const saved = loadFromStorage();
        if (saved) setScoreTable(saved);
        setMounted(true);
    }, []);

    // Save to localStorage on every change (only after initial load)
    useEffect(() => {
        if (mounted) saveToStorage(scoreTable);
    }, [scoreTable, mounted]);

    const handleOnChange: HandleOnChange = useCallback(
        (columnIndex, blockIndex, field, value) => {
            setScoreTable(prevData => {
                // Deep clone to avoid mutating previous state
                const newData: ScoreTable = JSON.parse(JSON.stringify(prevData));
                const column = newData.scorepadColumns[columnIndex];

                if (field === "player") {
                    column.player = value;
                    return newData;
                }

                const maxVal = field === "stars" ? 19 : 999;
                const val = parseNumberInput(value, maxVal);

                if (field === "stones") {
                    column.scoreStone = val;
                } else if (blockIndex !== null) {
                    if (field === "stars") {
                        column.scoreBlocks[blockIndex].stars = val;
                    } else if (field === "tiles") {
                        column.scoreBlocks[blockIndex].tiles = val;
                    }
                    column.scoreBlocks[blockIndex].total =
                        column.scoreBlocks[blockIndex].stars *
                        column.scoreBlocks[blockIndex].tiles;
                }

                column.scoreTotal =
                    column.scoreStone +
                    column.scoreBlocks.reduce((sum, b) => sum + b.total, 0);

                return newData;
            });
        },
        []
    );

    const handleOnFocus: HandleOnFocus = useCallback(target => {
        setTimeout(() => target.select(), 5);
    }, []);

    const handleAddPlayer = useCallback(() => {
        setScoreTable(prevData => {
            if (prevData.scorepadColumns.length >= MAX_PLAYERS) return prevData;
            const newData: ScoreTable = JSON.parse(JSON.stringify(prevData));
            newData.scorepadColumns.push(
                createEmptyPlayer(newData.scorepadColumns.length + 1)
            );
            return newData;
        });
    }, []);

    const handleRemovePlayer = useCallback(() => {
        setScoreTable(prevData => {
            if (prevData.scorepadColumns.length <= MIN_PLAYERS) return prevData;
            const newData: ScoreTable = JSON.parse(JSON.stringify(prevData));
            newData.scorepadColumns.pop();
            return newData;
        });
    }, []);

    const handleClear = useCallback(() => {
        setScoreTable(createEmptyTable(scoreTable.scorepadColumns.length));
    }, [scoreTable.scorepadColumns.length]);

    const playerCount = scoreTable.scorepadColumns.length;
    const lastColumnIndex = playerCount - 1;

    return (
        <div className="m-auto p-4">
            <div className="flex justify-center items-center gap-2 mb-4">
                <button
                    onClick={handleRemovePlayer}
                    disabled={playerCount <= MIN_PLAYERS}
                    className="w-8 h-8 rounded bg-slate-700 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-600 active:bg-slate-500 text-lg font-bold leading-none"
                    aria-label="Remove player"
                >
                    &minus;
                </button>
                <span className="text-white text-sm min-w-[80px] text-center">
                    {playerCount} player{playerCount !== 1 ? "s" : ""}
                </span>
                <button
                    onClick={handleAddPlayer}
                    disabled={playerCount >= MAX_PLAYERS}
                    className="w-8 h-8 rounded bg-slate-700 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-600 active:bg-slate-500 text-lg font-bold leading-none"
                    aria-label="Add player"
                >
                    +
                </button>
                <button
                    onClick={handleClear}
                    className="ml-4 px-3 h-8 rounded bg-red-800 text-white hover:bg-red-700 active:bg-red-600 text-sm font-bold"
                    aria-label="Clear all scores"
                >
                    New Game
                </button>
            </div>
            <div className="flex justify-center overflow-x-auto">
                <div className="min-w-fit">
                    <div className="flex">
                        <div className="w-[80px] shrink-0">
                            <div className="border-b-8 border-r-8 border-dashed border-slate-700">
                                <div className="flex justify-center items-center h-[40px]">
                                    <img
                                        src="/players.png"
                                        alt="Players"
                                        className="max-h-[90%] m-auto p-[5px]"
                                    />
                                </div>
                            </div>
                            <div className="border-r-8 border-dashed border-slate-700">
                                <div className="flex justify-center items-center border-b-2 border-black h-[60px]">
                                    <img
                                        src="/tiles/house.png"
                                        alt="House"
                                        className="max-h-[90%] m-auto"
                                    />
                                </div>
                            </div>
                            <div className="border-r-8 border-dashed border-slate-700">
                                <div className="flex justify-center items-center border-b-2 border-black h-[60px]">
                                    <img
                                        src="/tiles/market.png"
                                        alt="Market"
                                        className="max-h-[90%] m-auto"
                                    />
                                </div>
                            </div>
                            <div className="border-r-8 border-dashed border-slate-700">
                                <div className="flex justify-center items-center border-b-2 border-black h-[60px]">
                                    <img
                                        src="/tiles/barrack.png"
                                        alt="Barrack"
                                        className="max-h-[90%] m-auto"
                                    />
                                </div>
                            </div>
                            <div className="border-r-8 border-dashed border-slate-700">
                                <div className="flex justify-center items-center border-b-2 border-black h-[60px]">
                                    <img
                                        src="/tiles/temple.png"
                                        alt="Temple"
                                        className="max-h-[90%] m-auto"
                                    />
                                </div>
                            </div>
                            <div className="border-r-8 border-dashed border-slate-700">
                                <div className="flex justify-center items-center border-b-2 border-black h-[60px]">
                                    <img
                                        src="/tiles/garden.png"
                                        alt="Garden"
                                        className="max-h-[90%] m-auto"
                                    />
                                </div>
                            </div>
                            <div className="border-r-8 border-dashed border-slate-700">
                                <div className="flex justify-center items-center border-b-2 border-black h-[40px]">
                                    <img
                                        src="/stone.png"
                                        alt="Stone"
                                        className="max-h-[90%] m-auto"
                                    />
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="flex justify-center items-center border-r-8 border-dashed border-slate-700 h-[40px]">
                                    =
                                </div>
                            </div>
                        </div>
                        {scoreTable.scorepadColumns.map((elem, index) => (
                            <ScorepadColumn
                                scoreColumn={elem}
                                columnIndex={index}
                                isLastColumn={index === lastColumnIndex}
                                handleOnChange={handleOnChange}
                                handleOnFocus={handleOnFocus}
                                key={"row-" + index}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Scorepad;
