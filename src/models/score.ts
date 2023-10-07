export interface ScoreBlock {
    stars: number;
    tiles: number;
    total: number;
}

export interface ScoreRow {
    player: string;
    scoreBlocks: ScoreBlock[];
    scoreStone: number
    scoreTotal: number
    
}

export interface ScoreTable {
    scoreRows: ScoreRow[];
}