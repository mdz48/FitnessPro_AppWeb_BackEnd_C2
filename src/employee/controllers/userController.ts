import { Request, Response } from 'express';
import { userService } from '../services/userService';
import { User } from '../models/User';

export const loginUser= async (req: Request, res: Response) => {
  const { mail, password } = req.body;
  try {
    const token = await userService.login(mail, password);

    if (!token) {
      res.status(401).json({ message: 'Invalid full mail or password' });
    }else{
      res.status(200).json({ token });
    }

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    if(users){
      res.status(201).json(users);
    }else{
      res.status(404).json({ message: 'Sin registros' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const employee = await userService.getUserById(parseInt(req.params.employee_id, 10));
    if(employee){
      res.status(201).json(employee);
    }else{
      res.status(404).json({ message: 'No se encontró el usuario' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { relation } = req.body;
    console.log(relation);    
    const newUser = await userService.addUser(req.body as User);
    const exercises = await userService.addExcercise(relation, newUser.iduser);
    if(newUser && exercises){
      res.status(201).json(newUser);
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getExercises = async (req: Request, res: Response) => {
  try {
    const exercises = await userService.getAllExercises(parseInt(req.params.iduser, 10));
    res.status(201).json(exercises);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await userService.modifyUser(parseInt(req.params.employee_id, 10), req.body);
    if(updatedUser){
      res.status(201).json(updatedUser);
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deleted = await userService.deleteUser(parseInt(req.params.employee_id, 10));
    if(deleted){
      res.status(201).json({ message: 'Se eliminó el usuario.' });
    }else{
      res.status(404).json({ message: 'Algo salio mal' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
