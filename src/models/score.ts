export interface ScoreBlock {
    stars: number;
    tiles: number;
    total: number;
}

export interface ScorepadColumn {
    player: string;
    scoreBlocks: ScoreBlock[];
    scoreStone: number;
    scoreTotal: number;
}

export interface ScoreTable {
    scorepadColumns: ScorepadColumn[];
}

export type ScoreField = "stars" | "tiles" | "stones" | "player";

export type HandleOnChange = (
    columnIndex: number,
    blockIndex: number | null,
    field: ScoreField,
    value: string
) => void;

export type HandleOnFocus = (target: HTMLInputElement) => void;
