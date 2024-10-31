import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { User } from '../models/User';
import { Exercise } from '../models/Exercise';

export class UserRepository {

  public static async findAll(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM user', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const users: User[] = results as User[];
          resolve(users);
        }
      });
    });
  }

  public static async findById(iduser: number): Promise<User | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM user WHERE iduser = ?', [iduser], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const users: User[] = results as User[];
          resolve(users[0]);
        }
      });
    });
  }

  public static async findByMail(mail: string): Promise<User | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM user WHERE mail = ?', [mail], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const users: User[] = results as User[];
          if (users.length > 0) {
            resolve(users[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createUser(user: User): Promise<User> {
    const query = 'INSERT INTO user (mail, password, height, weight, sex) VALUES (?, ?, ?, ?, ?)';
    console.log(user);
    return new Promise((resolve, reject) => {
      connection.execute(query, [user.mail, user.password, user.height, user.weight, user.sex], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdUserId = result.insertId;
          const createdUser: User = { ...user, iduser: createdUserId };
          resolve(createdUser);
        }
      });
    });
  }

  public static async createExercise(exercise: Exercise): Promise<Exercise> {
    const query = 'INSERT INTO user_exercise (user, exercise) VALUES (?, ?)';
    return new Promise((resolve, reject) => {
      connection.execute(query, [exercise.user, exercise.exercise], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdExerciseId = result.insertId;
          const createdExercise: Exercise = { ...exercise, iduser_exercise: createdExerciseId };
          resolve(createdExercise);
        }
      });
    });
  }

  public static async findAllExercises(iduser: number): Promise<Exercise[]> {
    const query = 'SELECT * FROM user_exercise WHERE user = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [iduser], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results as Exercise[]);
        }
      });
    });
  }

  public static async updateUser(iduser: number, userData: User): Promise<User | null> {
    const query = 'UPDATE user SET mail = ?, password = ?, height = ?, weight = ?, sex = ? WHERE iduser = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [userData.mail, userData.password, userData.height, userData.weight, userData.sex, iduser], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedUser: User = { ...userData, iduser: iduser };
            resolve(updatedUser);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteUser(iduser: number): Promise<boolean> {
    const query = 'DELETE FROM user WHERE iduser = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [iduser], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            resolve(true); 
          } else {
            resolve(false); 
          }
        }
      });
    });
  }

}