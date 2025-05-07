import bcrypt from 'bcryptjs'

export const hashPassword = function(plainPassword:string){
    return bcrypt.hash(plainPassword,10) 
} 