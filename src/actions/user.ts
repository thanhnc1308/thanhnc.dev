'use server';

import userModel, { User } from '@/db/models/user.model';
import dbConnect from '@/db/mongodb';
import { z } from 'zod';

const fetchUserById = async (userId: string): Promise<User | null> => {
  try {
    await dbConnect();

    const _user = await userModel.findById(userId).exec();

    if (!_user) {
      return null;
    }

    return _user;
  } catch (e) {
    console.error('fetchUserById', e);
    return null;
  }
};

const findUserByEmail = async (email: string): Promise<User | null> => {
  try {
    await dbConnect();
    const _user = await userModel.findOne({ email }).exec();

    if (!_user) {
      return null;
    }

    return _user;
  } catch (e) {
    console.error('fetchUserById', e);
    return null;
  }
};

const UserSchema = z.object({
  id: z.string(),
  name: z.string({
    invalid_type_error: 'Name must be a string.',
    required_error: 'Name is required.',
  }),
  email: z.string(),
  password: z
    .string({
      invalid_type_error: 'Name must be a string.',
      required_error: 'Name is required.',
    })
    .optional(),
  avatar: z
    .string({
      invalid_type_error: 'Name must be a string.',
      required_error: 'Name is required.',
    })
    .optional(),
  role: z.string(),
});
const CreateGuestSchema = UserSchema.omit({ id: true });
const UpdateGuestSchema = UserSchema.omit({ id: true });

type CreateUserRequest = {
  name: string;
  email: string;
  password?: string;
  avatar?: string;
  role: string;
};

const createUser = async (user: CreateUserRequest) => {
  const validatedFields = CreateGuestSchema.safeParse(user);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create User.',
    };
  }

  try {
    await dbConnect();
    await userModel.create(validatedFields.data);
  } catch (e) {
    console.error('createUser', e);
    return {
      message: 'Internal Server Error. Failed to Create User.',
    };
  }
};

type UpdateUserRequest = {
  name: string;
  email: string;
  role: string;
};

const updateUserById = async (userId: string, newUser: UpdateUserRequest) => {
  const validatedFields = UpdateGuestSchema.safeParse(newUser);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update User.',
    };
  }

  try {
    await dbConnect();
    await userModel.findByIdAndUpdate(userId, validatedFields.data);
  } catch (e) {
    console.error('updateUserById', e);
    return {
      message: 'Internal Server Error. Failed to Update User.',
    };
  }
};

export { fetchUserById, createUser, updateUserById, findUserByEmail };
