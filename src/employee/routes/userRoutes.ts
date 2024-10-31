import { Router } from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser, loginUser, getExercises } from '../controllers/userController';
// import { authMiddleware } from '../../shared/middlewares/auth';

const userRoutes: Router = Router();

userRoutes.post('/login', loginUser);

userRoutes.get('/', getUsers);
userRoutes.get('/:iduser/exercises', getExercises);	
userRoutes.get('/:iduser',getUserById);
userRoutes.post('/', createUser);
userRoutes.put('/:iduser', updateUser); 
userRoutes.delete('/:iduser', deleteUser);

export default userRoutes;