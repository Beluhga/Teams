import { Header } from '@components/Header'
import * as S from './styles'
import { HightLight } from '@components/Highlight'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { groupCreate } from '@storage/group/groupCreate'
import { AppError } from '@utils/AppError'
import { Alert } from 'react-native'

export function NewGroup(){
    const [group, setGroup] = useState('');

    const navigation = useNavigation();

    async function CriarNew() {
    try {
        if(group.trim().length === 0){ // trim() para não contar os espacos em branco na string
            return Alert.alert('Novo Grupo', 'Informe o nome da turma.')
        }
        
        await groupCreate(group);
        navigation.navigate('players', {group: group});
    }
     catch(error){
        if(error instanceof AppError){
            Alert.alert('Novo Grupo', error.message)
        } else {
            Alert.alert('Novo Grupo', 'Não foi possível criar um novo grupo.')
            console.log(error)
        }
      }
    }


    return(
        <S.Container>
            <Header showBackButton />

            <S.Content>
                <S.Icon />
                <HightLight 
                    title="Nova Turma"
                    subtitle='crie a turma para adicionar as pessoas'
                />

                <Input 
                 placeholder='Nome da turma'
                 onChangeText={setGroup}
                />

                <Button 
                    title='Criar'
                    style={{marginTop: 20}}
                    onPress={CriarNew}
                />
            </S.Content>
        </S.Container>
    )
}