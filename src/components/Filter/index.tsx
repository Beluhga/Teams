import * as S from './styles';
import { TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & S.FilterStyleProps & {
    title: string;
}

export function Filter({title, isActive = false, ...rest}: Props){
    return(
        <S.Container isActive={isActive} {...rest}>
            <S.Title>{title}</S.Title>
        </S.Container>
    )
}
