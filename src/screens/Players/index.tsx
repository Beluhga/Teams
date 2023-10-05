import { useState, useEffect, useRef } from 'react'
import { Alert, FlatList, TextInput } from 'react-native'
import * as S from './styles'
import { Header } from '@components/Header'
import { HightLight } from '@components/Highlight'
import { ButtonIcon } from '@components/ButtonIcon'
import { Input } from '@components/Input'
import { Filter } from '@components/Filter'
import { PlayerCard } from '@components/PlayerCard'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'
import { useNavigation, useRoute } from '@react-navigation/native'
import { AppError } from '@utils/AppError'
import { playerAddByGroup } from '@storage/player/playerAddByGroup'
import { playerGetGroupAndTeam } from '@storage/player/playerGetByGroupAndTeam'
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO'
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup'
import { groupRemoveByName } from '@storage/group/groupRemoveByName'
import { Loading } from '@components/Loading'

type RouteParams = {
    group: string;
}

export function Players(){
    const [isLoading, setIsLoading] = useState(true);
    const [newPlayerName, setNewPlayerName] = useState('')
    const [team, setTeam] = useState('Time A') // armazena o time selecionado
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

    const navigation = useNavigation();

    const route = useRoute();
    const { group } = route.params as RouteParams;

    const novoNomePlayerInputRef = useRef<TextInput>(null); 

    async function aoClicarAddPlayer(){
        if (newPlayerName.trim().length === 0){
            return Alert.alert('Nova Pessoa', 'Informe o nome da pessoa para adicionar')
        }
        const newPlayer = {
            name: newPlayerName,
            team,
        }

        try {
            await playerAddByGroup(newPlayer, group)

            novoNomePlayerInputRef.current?.blur(); 
           
            setNewPlayerName('') 
            buscarJogadoresPorTime(); 

        } catch(error){
            if(error instanceof AppError) {
                Alert.alert('Nova Pessoa', error.message);
            } else {
                console.log(error);
                Alert.alert('Nova pessoa', 'Não foi possivel adicionar' )
            }
        }
    }

    async function buscarJogadoresPorTime() {
        try {
            setIsLoading(true);

            const JogadoresPorTime = await playerGetGroupAndTeam(group, team)

            setPlayers(JogadoresPorTime);
           
        } catch (error){
        console.log(error);
            Alert.alert('Pessoas', 'Não foi possível carregar as pessoas do time')
        } finally {
            setIsLoading(false)
        }

    }

    async function aoCLicaRemovePlayer(playerName: string){ // remover player
        try {
            await playerRemoveByGroup(group, playerName ); // nome da pessoa e o grupo que ela esta
            buscarJogadoresPorTime();

        } catch (error) {
            Alert.alert('Remove pessoa', 'Não foi possivel remover essa pessoa.')
        }
    }

    async function groupRemove() {
        try {
            await groupRemoveByName(group);
            navigation.navigate('groups')

        } catch (error){
            console.log(error);
            Alert.alert('Remove Grupo', 'Não foi possível remover o grupo.')
        }
    }

    async function aoClicarRemoveGroup() {
        Alert.alert(
            'Remover',
            'Deseja remover o grupo?',
            [
                {text: 'Não', style: 'cancel'},
                {text: 'Sim', onPress: () => groupRemove()}
            ]
        )
    }

    useEffect(() => {
        buscarJogadoresPorTime(); 
    }, [team]); 
    

    return(
        <S.Container>
            <Header showBackButton />

            <HightLight 
                title={group}
                subtitle='adicione a galera e separe os times'
            />
            <S.Form>

            <Input 
                inputRef={novoNomePlayerInputRef} 
                onChangeText={setNewPlayerName}
                value={newPlayerName} 
                placeholder='Nome da pessoa'
                autoCorrect={false}
                onSubmitEditing={aoClicarAddPlayer} 
                returnKeyType='done'
            />

            <ButtonIcon 
                icone="add"
                onPress={aoClicarAddPlayer}
             />
            </S.Form>

            <S.HeaderList>

            <FlatList 
                data={['Time A', 'Time B']}
                keyExtractor={item => item}
                renderItem={({item}) => (
                    <Filter
                        title={item}
                        isActive={item === team}
                        onPress={() => setTeam(item)}
                    />

                )}
                horizontal
            />
                <S.NumbersOfPlayers>
                    {players.length}
                </S.NumbersOfPlayers>
            </S.HeaderList>

            {
                    isLoading ? <Loading /> :

            <FlatList
                data={players}
                keyExtractor={item => item.name}
                renderItem={({item}) => (
                    <PlayerCard 
                    name={item.name}
                    onRemove={() => aoCLicaRemovePlayer(item.name)} />
                )}
                ListEmptyComponent={() => (
                    <ListEmpty message='Não há pessoas nesse time' 
                    />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    {paddingBottom: 100},
                    players.length === 0 && { flex: 1}
                ]} />           
            }
                <Button 
                    title="Remove turma"
                    type='SECONDARY'
                    onPress={aoClicarRemoveGroup}
                />
        </S.Container>
    )
}