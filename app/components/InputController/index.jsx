import { Controller } from "react-hook-form";
import { Text, TextInput } from "react-native";

export const InputController = ({ control, name, pattern, requiredMessage, ...inputProps }) => {
    const { title } = inputProps
    return (
        <Controller
            control={control}
            name={name}
            rules={{
                required: { value: true, message: requiredMessage },
                pattern,
            }}
            render={({ field: { onChange, value } }) => (
                <>
                    <Text style={{ fontSize: 14, color: '#68717a' }}>{title}</Text>
                    <TextInput
                        {...inputProps}
                        onChangeText={onChange}
                        value={value}
                    />
                </>
            )}
        />
    );
};