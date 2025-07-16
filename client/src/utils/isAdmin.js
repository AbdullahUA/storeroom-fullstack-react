const isAdmin = (user) => {
    return user && user.role === 'ADMIN';
}

export default isAdmin;