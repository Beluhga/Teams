import { TouchableOpacityProps } from "react-native"
import * as S from './styles'
import {MaterialIcons} from '@expo/vector-icons'

type Props = TouchableOpacityProps & {
 icone: keyof typeof MaterialIcons.glyphMap;
 type?: S.ButtonIconTypeStyleProps
}

export function ButtonIcon({icone, type = 'PRIMARY', ...rest}: Props) {
    return(
        <S.Container {...rest}>
            <S.Icon name={icone} type={type} />

        </S.Container>

    )
}