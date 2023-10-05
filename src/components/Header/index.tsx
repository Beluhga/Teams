import { useNavigation } from "@react-navigation/native";
import * as S  from "./styles";
import logoImg from '@assets/logo.png'

type Props ={
    showBackButton?: boolean;
}

export function Header({showBackButton = false}: Props){
    const navigation = useNavigation();

    function CriarGoBack(){
        navigation.navigate('groups');
    }


    return(
        <S.Container>

           {
            showBackButton &&
            <S.BackButton onPress={CriarGoBack}>
             <S.BackIcon />
            </S.BackButton>

           }

            <S.Logo source={logoImg} />
        </S.Container>
    )
}