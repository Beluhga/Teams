import AsyncStorage from "@react-native-async-storage/async-storage";
import { playersGetByGroup } from "./playersGetByGroup"
import { PLAYER_COLLECTION } from "@storage/storageConfig";


export async function playerRemoveByGroup(group: string, playerName: string) {
    try {

        const storage = await playersGetByGroup(group);

        const filtered = storage.filter(player => player.name !== playerName) // filtra todo mundo menoso que deseja deleta
        const players = JSON.stringify(filtered);

        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, players);
        
    } catch (error) {
        throw error
    }

}