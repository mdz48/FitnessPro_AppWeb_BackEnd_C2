import { UserRepository } from "../repositories/UserRepository";
import { User } from "../models/User";
// import { DateUtils } from "../../shared/utils/DateUtils";
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Exercise } from "../models/Exercise";

dotenv.config();

// const secretKey = process.env.SECRET || "";
// const saltRounds = 10;

export class userService {

    public static async login(mail: string, password: string) {
        try {
            const user = await this.getUserByMail(mail);
            if (!user) {
                return null;
            }
            if (user.password !== password) {
                return null;
            }
            // const passwordMatch = await bcrypt.compare(password, user.password);

           
            // const payload = {
            //     iduser: user.iduser,
            //     mail: user.mail
            // }
            return await user;

        } catch (error: any) {
            throw new Error(`Error al logearse: ${error.message}`);
        }

    }

    public static async getAllUsers(): Promise<User[]> {
        try {
            return await UserRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error al obtener usuarios: ${error.message}`);
        }
    }

    public static async getUserById(iduser: number): Promise<User | null> {
        try {
            return await UserRepository.findById(iduser);
        } catch (error: any) {
            throw new Error(`Error al encontrar usuario: ${error.message}`);
        }
    }

    public static async getUserByMail(mail: string): Promise<User | null> {
        try {
            return await UserRepository.findByMail(mail);
        } catch (error: any) {
            throw new Error(`Error al encontrar usuario: ${error.message}`);
        }
    }

    public static async addUser(user: User) {
        try {
            return await UserRepository.createUser(user);
        } catch (error: any) {
            throw new Error(`Error al crear usuario: ${error.message}`);
        }
    }

    public static async addExcercise(relation: Array<string>, iduser: number) {
        try {
            const promises = relation.map((exercise: string) => {
                const exercises: Exercise = {
                  user: iduser,
                  exercise: exercise
                };
                return UserRepository.createExercise(exercises);
            });
            return await Promise.all(promises);
        } catch (error: any) {
            throw new Error(`Error al crear ejercicio: ${error.message}`);
        }
    }

    public static async modifyUser(iduser: number, userData: User) {
        try {
            const userFinded = await UserRepository.findById(iduser);

            if (userFinded) {
                if (userData.mail) {
                    userFinded.mail = userData.mail;
                }
                if (userData.password) {
                    userFinded.password = userData.password;
                }
            } else {
                return null;
            }
            return await UserRepository.updateUser(iduser, userFinded);
        } catch (error: any) {
            throw new Error(`Error al modificar usuario: ${error.message}`);
        }
    }

    public static async deleteUser(iduser: number): Promise<boolean> {
        try {
            return await UserRepository.deleteUser(iduser);
        } catch (error: any) {
            throw new Error(`Error al eliminar usuario: ${error.message}`);
        }
    }

}