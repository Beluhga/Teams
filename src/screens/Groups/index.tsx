import {useState, useEffect, useCallback} from 'react';
import { Header } from '@components/Header';
import * as S from './styles';
import { HightLight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { Alert, FlatList } from 'react-native';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { groupsGetAll } from '@storage/group/groupsGetAll';
import { Loading } from '@components/Loading';


export function Groups() {
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>([]);

  const navigation = useNavigation();

  function CriarNovoGrupo(){
    navigation.navigate('new')
  }

  async function BuscarGroups(){
    try{
      setIsLoading(true)

      const data = await groupsGetAll();
      setGroups(data) 

    } catch(error){
      console.log(error)
      Alert.alert('Turmas', 'Não foi possível carregar as turmas')
    } finally {
      setIsLoading(false)
    }
  }

  function manusearGrupo(group: string){ // abrir turmas
    navigation.navigate('players', { group})
  }

  useFocusEffect(useCallback(() => { 
    BuscarGroups();

  },[])) 

  return (
    <S.Container>
      <Header />
      <HightLight
        title='Turmas'
        subtitle='Jogue com sua turma'
       />
       {
        isLoading ? <Loading /> :
      
       <FlatList 
        data={groups}
        keyExtractor={item => item}
        renderItem={({item}) => (
        <GroupCard 
          title={item}
          onPress={() => manusearGrupo(item)}
          />
          )}
          contentContainerStyle={groups.length === 0 && {flex: 1}}
          ListEmptyComponent={() => <ListEmpty message='Que tal cadastrar a primeira turma?' />}
       />

      }

       <Button
        title="Criar nova turma"
        onPress={CriarNovoGrupo}
        />

    </S.Container>
  );
}

