import { Text, TextInput } from "react-native";

export const InputWithTitle = ({
                                   title,
                                   placeholder,
                                   secureTextEntry,
                                   setEmail,
                                   setPassword,
                                   setConfirmPassword,
                                   setUsername,
                                   style
                               }) => {
    return (
        <>
            <Text style={{ fontSize: 14, color: '#68717a' }}>{title}</Text>
            <TextInput
                autoCapitalize={'none'}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                style={style}
                onChangeText={(text) => {
                    if (title === 'Email') setEmail(text)
                    if (title === 'Password') setPassword(text)
                    if (title === 'Confirm Password') setConfirmPassword(text)
                    if (title === 'Username') setUsername(text)
                }}
            />
        </>
    )
}