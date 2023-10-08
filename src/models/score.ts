export interface ScoreBlock {
    stars: number;
    tiles: number;
    total: number;
}

export interface ScorepadColumn {
    player: string;
    scoreBlocks: ScoreBlock[];
    scoreStone: number
    scoreTotal: number
    
}

export interface ScoreTable {
    scorepadColumns: ScorepadColumn[];
}