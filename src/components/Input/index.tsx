import {TextInputProps, TextInput} from 'react-native'
import * as S from './styles';
import { useTheme } from 'styled-components/native';

type Props = TextInputProps & { // para perde o foco do input
    inputRef?: React.RefObject<TextInput>;
}

export function Input({inputRef, ...rest}: Props){
    const { COLORS } = useTheme()

    // ou theme.COLORS.GRAY_300
    
    return (
        <S.Container 
            ref={inputRef}
            placeholderTextColor={COLORS.GRAY_300}
         {...rest}
        />
    )
}