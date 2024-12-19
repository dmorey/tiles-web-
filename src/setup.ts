import { AI, GameState, Move, MultiAI, PlayerBoard, PlayerType } from "azul-tiles";
import { SearchMethod, PruningType, SortMethod, AIOpts, PlayerInterface } from "./types/ai";
import { Human } from "./game";

export function add_player(type: string): void {
    // Get element that holds players
    const players = document.getElementById("players") as HTMLElement;
    // if (players.children.length == 2) {
    //     alert("Sorry, only 2 player games currently supported");
    //     return;
    // }

    // Create id
    const player_id = players.children.length + 1;

    var player_template;
    switch (type) {
        case "human":
            player_template = document.getElementById("human-player-template") as HTMLElement;
            break;
        case "ai":
            player_template = document.getElementById("ai-player-template") as HTMLElement;
            break;
        case "ai-advanced":
            return;
            break;
    }
    const player = player_template?.cloneNode(true) as HTMLElement;
    player.classList.add("player");
    player.classList.add("flex-row");
    player.id = "player-" + player_id;

    // Add event listeners to remove player
    player.getElementsByClassName("remove-button")[0].addEventListener("click", (event) => {
        const target = event.target as HTMLElement;
        target.parentElement?.parentElement?.remove();
    });

    // Modify header
    const player_title = player.getElementsByClassName("player-title")[0] as HTMLElement;
    player_title.innerHTML = "Player " + player_id;
    players.append(player);
    //  player_header.after(player)
}

export function get_options() {}

export function get_players(): Array<PlayerInterface> {
    // array to hold players for game creation
    const players: Array<PlayerInterface> = [];
    const players_elem = document.getElementById("players") as HTMLElement;
    [...players_elem.children].forEach((player, id) => {
        const player_data = new FormData(player as HTMLFormElement);
        switch (player_data.get("player-type")) {
            case "human":
                var name = player_data.get("name") as string;
                if (name == "") {
                    name = player.getElementsByClassName("player-title")[0].innerHTML;
                }
                const human = new Human(id, name);
                human.type = PlayerType.HUMAN;
                players.push(human);
                break;

            case "ai":
                players.push(process_ai_player(player_data, id));
                break;
        }
    });
    return players;
}

export function validate_players(players: Array<PlayerInterface>): {
    valid: boolean;
    message: string;
} {
    // if (players.length != 2) {
    //     return { valid: false, message: "Game requires 2 players" };
    // }
    return { valid: true, message: "" };
}

export function validate_options(): {
    valid: boolean;
    message: string;
} {
    return { valid: true, message: "" };
}

const AI_LEVEL = [10, 100, 1000];

function process_ai_player(data: FormData, id: number): PlayerInterface {
    const level = parseInt(data.get("level") as string);
    const type = data.get("personality") as string;

    const opts: AIOpts = {
        searchMethod: SearchMethod.TIME,
        pruningType: PruningType.AlphaBeta,
        sortMethod: SortMethod.BUBBLE_EFFICIENT,
        timeout: AI_LEVEL[level],
        optimal: true,
        config: {
            movePruning: true,
            quickEval: true,
            forecast: 0.1,
            firstTileValue: 1.5,
            negativeScore: false
        }
    };

    let name = "A.I ";
    if (type === "random") {
        opts.searchMethod = SearchMethod.Random;
        name += "(Random)";
    } else if (type === "minimax") {
        opts.searchMethod = SearchMethod.Minimax;
        name += "(Minimax)";
    } else {
        name += "(Time)";
    }

    // Create AI instance with proper configuration
    const ai = new AI(opts);
    ai.type = PlayerType.AI;
    ai.id = id;
    ai.name = name;
    return ai;
}

// Add even listener to create a new player
document.getElementById("add-player-button")?.addEventListener("click", () => {
    // Get type
    const select = document.getElementById("add-new-type") as HTMLSelectElement;
    const type_string = select.value;
    add_player(type_string);
});
