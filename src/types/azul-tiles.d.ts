declare module "azul-tiles" {
    export { GameState, State } from "azul-tiles/dist/state.js";
    export { Move, Tile } from "azul-tiles/dist/azul.js";
    export { PlayerBoard } from "azul-tiles/dist/playerboard.js";

    export interface PlayerInterface {
        getMove(gamestate: GameState): Move;
        type: PlayerType;
        id: number;
        name: string;
    }

    export enum PlayerType {
        HUMAN,
        AI
    }

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

    export class AIOpts {
        searchMethod: SearchMethod;
        pruningType: PruningType;
        sortMethod: SortMethod;
        timeout?: number;
        optimal?: boolean;
        config?: {
            movePruning?: boolean;
            quickEval?: boolean;
            forecast?: number;
            firstTileValue?: number;
            negativeScore?: boolean;
        };
    }

    export class AI implements PlayerInterface {
        constructor(opts: AIOpts);
        id: number;
        name: string;
        type: PlayerType;
        getMove(gamestate: GameState): Move;
    }

    export class MultiAI implements PlayerInterface {
        type: PlayerType;
        constructor(opts?: AIOpts);
        getMove(gamestate: GameState): Move;
    }
}

declare module "azul-tiles/dist/state.js" {
    import { Move, Tile } from "azul-tiles/dist/azul.js";
    import { PlayerBoard } from "azul-tiles/dist/playerboard.js";

    export class GameState {
        constructor(gamestate?: GameState, move?: Move);

        // Properties
        tilebag: Array<Tile>;
        factory: Array<Array<Tile>>;
        firstTile: Tile;
        playerBoards: Array<PlayerBoard>;
        availableMoves: Array<Move>;
        playedMoves: Array<Move>;
        nPlayers: number;
        round: number;
        turn: number;
        activePlayer: number;
        startingPlayer: number;
        previousPlayer: number;
        winner: Array<number>;
        state: State;
        seed: string;

        // Methods
        newGame(nPlayers: number): void;
        newRound(): void;
        nextTurn(): void;
        addTileToFactory(factoryId: number, tile: Tile): boolean;
        areFactoriesFilled(): boolean;
        completeFactoryFilling(): boolean;
        endRound(): boolean;
        getMoves(): Array<Move>;
        playMove(move: Move): void;
        createFactories(): void;
        evalScore(): number;
        clone(): GameState;
    }

    export enum State {
        turn = "turn",
        playerTurns = "playerTurns",
        roundEnd = "roundEnd",
        gameEnd = "gameEnd"
    }
}
