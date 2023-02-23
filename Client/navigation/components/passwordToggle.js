export const PasswordInput = ({
    value,
    onChange,
    label,
    showPassword,
    setShowPassword
}) => {
    return (
        <View>
            <TextInput
                style={globalStyles.input}
                placeholder={label}
                secureTextEntry={!showPassword}
                value={value}
                onChangeText={onChange}
            />
            <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: 10, top: 10 }}
            >
                <FontAwesome
                    name={showPassword ? 'eye-slash' : 'eye'}
                    size={24}
                    color="black"
                />
            </TouchableOpacity>
        </View>
    );
};
