declare module "azul-tiles" {
    export { GameState } from "azul-tiles/dist/state.js";
    export { Move, Tile } from "azul-tiles/dist/azul.js";
    export { PlayerBoard } from "azul-tiles/dist/playerboard.js";
    export { State } from "azul-tiles/dist/state.js";

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

    export class AIOpts {
        constructor();

        // Required properties
        searchMethod: SearchMethod;
        pruningType: PruningType;
        sortMethod: SortMethod;

        // Optional properties
        timeout?: number;
        optimal?: boolean;
        print?: boolean;

        // Optional configuration object
        config?: {
            movePruning?: boolean;
            quickEval?: boolean;
            forecast?: number;
            firstTileValue?: number;
            negativeScore?: boolean;
        };
    }

    export enum SearchMethod {
        Random,
        Minimax,
        TIME
    }

    export enum PruningType {
        None,
        AlphaBeta
    }

    export enum SortMethod {
        None,
        Score,
        BUBBLE_EFFICIENT
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
