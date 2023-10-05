import { playersGetByGroup } from "./playersGetByGroup";


export async function playerGetGroupAndTeam(group: string, team: string) {
    try {
        const storage = await playersGetByGroup(group); // pega todos os jogadores pelo grupo

        const players = storage.filter(player => player.team === team) // quem e do time que quer filtrar (tima A ou time b, etc)

        return players

    } catch (error) {
        throw error;
    }

} 