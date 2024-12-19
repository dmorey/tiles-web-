declare module "azul-tiles" {
    export { GameState } from "azul-tiles/dist/state.js";
    export { Move, Tile } from "azul-tiles/dist/azul.js";
    export { PlayerBoard } from "azul-tiles/dist/playerboard.js";
    export { State } from "azul-tiles/dist/state.js";

    export interface PlayerInterface {
        getMove(gamestate: GameState): Move;
        type: PlayerType;
    }

    export enum PlayerType {
        HUMAN,
        AI
    }

    export interface AIOpts {
        searchMethod: SearchMethod;
        pruningType: PruningType;
        sortMethod: SortMethod;
    }

    export enum SearchMethod {
        Random,
        Minimax
    }

    export enum PruningType {
        None,
        AlphaBeta
    }

    export enum SortMethod {
        None,
        Score
    }

    export class AI implements PlayerInterface {
        type: PlayerType;
        constructor(opts?: AIOpts);
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
        constructor();
        addTileToFactory(factoryId: number, tile: Tile): boolean;
        completeFactoryFilling(): boolean;
        tilebag: Array<Tile>;
        factory: Array<Array<Tile>>;
        firstTile: boolean;
        playerBoards: Array<PlayerBoard>;
        activePlayer: number;
        availableMoves: Array<Move>;
        winner: Array<number>;
        state: State;
        seed: number;
        playMove(move: Move): void;
        nextTurn(): void;
        newGame(numPlayers: number): void;
        endRound(): boolean;
    }

    export enum State {
        turn = "turn",
        playerTurns = "playerTurns",
        roundEnd = "roundEnd",
        gameEnd = "gameEnd"
    }
}
