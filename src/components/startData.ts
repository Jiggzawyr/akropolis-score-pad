import { ScoreBlock, ScorepadColumn, ScoreTable } from "@/models/score";

export const createEmptyBlock = (): ScoreBlock => ({
    stars: 0,
    tiles: 0,
    total: 0,
});

export const createEmptyPlayer = (index: number): ScorepadColumn => ({
    player: `Player ${index}`,
    scoreBlocks: [
        createEmptyBlock(),
        createEmptyBlock(),
        createEmptyBlock(),
        createEmptyBlock(),
        createEmptyBlock(),
    ],
    scoreStone: 0,
    scoreTotal: 0,
});

export const createEmptyTable = (playerCount: number): ScoreTable => ({
    scorepadColumns: Array.from({ length: playerCount }, (_, i) =>
        createEmptyPlayer(i + 1)
    ),
});

export const scoreTableStart: ScoreTable = createEmptyTable(4);
