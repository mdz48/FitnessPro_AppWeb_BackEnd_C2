import { Router } from 'express';
import { getUsers, createUser, updateUser, deleteUser, loginUser, getExercises, updateExercise, addMyList, getMyList, deleteFromMyList, getUserByMail } from '../controllers/userController';
// import { authMiddleware } from '../../shared/middlewares/auth';

const userRoutes: Router = Router();

userRoutes.post('/login', loginUser);

userRoutes.get('/', getUsers);
userRoutes.get('/:iduser/exercises', getExercises);	
// userRoutes.get('/:iduser',getUserById);
userRoutes.get('/:mail',getUserByMail);
userRoutes.post('/', createUser);
userRoutes.post('/:iduser/mylist', addMyList);
userRoutes.get('/:iduser/mylist', getMyList);
userRoutes.put('/:iduser/exercises', updateExercise);
userRoutes.put('/:iduser', updateUser); 
userRoutes.delete('/:iduser', deleteUser);
userRoutes.delete('/:iduser/:idexercise/mylist', deleteFromMyList);

export default userRoutes;