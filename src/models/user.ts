import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

interface IUser {
	email: string,
	name: string,
	password: string,
	pictures: Array<{
		url: string,
		public_id: string,
	}>,
	description: string,
	verified: boolean,
};

const userSchema = new Schema<IUser>({
	email: { type: String, required: true },
	name: String,
	password: { type: String, required: true },
	pictures: Array,
	description: String,
	verified: { type: Boolean, default: false },
});

userSchema.pre('save', async function (next) {
	let user = this;

	if (user) {
		user.password = await bcrypt.hash(user.password, 10);
	}

	next();
});

const User = model<IUser>('user', userSchema, 'users');

export default User;
