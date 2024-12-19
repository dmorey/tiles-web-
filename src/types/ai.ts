import { GameState, Move, PlayerType } from "azul-tiles";

export { PlayerType };
export interface PlayerInterface {
    getMove(gamestate: GameState): Move;
    type: PlayerType;
    id: number;
    name: string;
}

// Local implementations of AI-related types
export enum SearchMethod {
    Random = 0,
    Minimax = 1,
    TIME = 2
}

export enum PruningType {
    None = 0,
    AlphaBeta = 1
}

export enum SortMethod {
    None = 0,
    Score = 1,
    BUBBLE_EFFICIENT = 2
}

export interface AIConfig {
    movePruning?: boolean;
    quickEval?: boolean;
    forecast?: number;
    firstTileValue?: number;
    negativeScore?: boolean;
}

export interface AIOpts {
    searchMethod: SearchMethod;
    pruningType: PruningType;
    sortMethod: SortMethod;
    timeout?: number;
    optimal?: boolean;
    config?: AIConfig;
}
