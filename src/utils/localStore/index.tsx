// Guardar usuario en localStorage
export const saveAuthData = (
    email: string,
    role: string,
    name: string,
    avatar: string,
    documents: string,
    dateBirth: string,
    genero: string,
    country: string,
    city: string,
    password: string,
    _id: string
) => {
    const authData = {
        email,
        role,
        name,
        avatar,
        documents,
        dateBirth,
        genero,
        country,
        city,
        password,
        _id,
        isAuthenticated: true,
    };
    localStorage.setItem("authData", JSON.stringify(authData));
    console.log("Guardado en localStorage:", authData);
};


// Eliminar usuario de localStorage (Logout)
export const removeAuthData = () => {
    localStorage.removeItem("authData");
    localStorage.removeItem("bots");
    localStorage.removeItem("users");
};

// Verificar si hay usuario autenticado
export const getAuthData = () => {
    const data = localStorage.getItem("authData");
    return data ? JSON.parse(data) : null;
};
