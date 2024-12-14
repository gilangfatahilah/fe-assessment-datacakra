
type UserRegisterFormData = {
    username: string,
    email: string,
    password: string,
    password_confirmation: string
}

type UserLoginFormData = {
    email: string,
    password: string,
}

export async function register(previousState: unknown, formData: FormData) {
    const data = Object.fromEntries(formData.entries()) as UserRegisterFormData;
    await new Promise((resolve => setTimeout(resolve, 3000)))

    if (data.password !== data.password_confirmation) {
        return {
            data,
            error: "password doesn't match !",
        }
    }
}

export async function login(previousState: unknown, formData: FormData) {
    const data = Object.fromEntries(formData.entries()) as UserLoginFormData;
    await new Promise((resolve => setTimeout(resolve, 3000)))

    return {
        data, error: null
    }
}

export async function logout() {
    // todo: make some logic
}