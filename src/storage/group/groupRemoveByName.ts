import AsyncStorage from "@react-native-async-storage/async-storage";
import { groupsGetAll } from "./groupsGetAll"
import { GROUP_COLLECTION, PLAYER_COLLECTION } from "@storage/storageConfig";


export async function groupRemoveByName(groupDeleted: string) {
    try {

        const storagedGroups = await groupsGetAll();
        const groups = storagedGroups.filter(group => group !== groupDeleted); // mostra todos os grupos, menos o que esta sendo deletado

        await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups)); // atualiza o grupo, sem o que foi deletado

        await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupDeleted}`) // remove o grupo por completo.

    } catch (error) {
        throw error
    }
}