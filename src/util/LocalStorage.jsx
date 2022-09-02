export const saveLocalStorage = (chave, valor) =>{
    localStorage.setItem(chave,JSON.stringify(valor))
}

export const searchLocalStorage = (chave) => {
    return JSON.parse(localStorage.getItem(chave))

}

export const removeLocalStorage = (chave) => {
    localStorage.removeItem(chave)
}

export const removeAllLocalStorage = () => {
    localStorage.clear()
}