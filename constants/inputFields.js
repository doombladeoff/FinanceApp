export const fields = [
    {
        key: 'username-field',
        name: 'userName',
        title: 'Username',
        placeholder: 'Name Surname',
        secureTextEntry: false,
        pattern: /^[A-Za-z0-9_]+$/i,
        errorMessage: 'Invalid username'
    },
    {
        key: 'email-field',
        name: 'email',
        title: 'Email',
        placeholder: 'example@mail.com',
        secureTextEntry: false,
        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        errorMessage: 'Invalid email address'
    },
    {
        key: 'password-field',
        name: 'password',
        title: 'Password',
        placeholder: '********',
        secureTextEntry: true,
        pattern: /^.{6,}$/,
        errorMessage: 'Password must be at least 6 characters long'
    },
    {
        key: 'confirm-password-field',
        name: 'confirmPassword',
        title: 'Confirm Password',
        placeholder: '********',
        secureTextEntry: true,
        pattern: /^.{6,}$/,
        errorMessage: 'Password must be at least 6 characters long'
    }
]

export const LoginFields = fields.filter(field => field.name === 'email' || field.name === 'password');