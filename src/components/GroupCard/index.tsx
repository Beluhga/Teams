import * as S from "./styles"
import {TouchableOpacityProps} from 'react-native'

type Props = TouchableOpacityProps & {
    title: string
}

// ...rest = qualquer outra propriedade que não foi deixado explicito, vai ser transferido ro container
export function GroupCard({title, ...rest}: Props) {
    return(
        <S.Container {...rest}>
            <S.Icon />

            <S.Title>
                {title}
            </S.Title>

        </S.Container>
    )
}