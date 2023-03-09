import { Request, Response } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

let secret: string = process.env.JWT_SECRET || crypto.randomBytes(4).toString('hex');

async function signUp (req: Request, res: Response) {
	try {
		const { email, password } = req.body;

		const userUsingEmail = await User.findOne({ email });

		if (userUsingEmail) {
			return res.sendStatus(409).end()
		}

		if (password.length < 7) {
			return res.sendStatus(401).end();
		}

		const newUser = new User({
			email,
			password,
		});
		await newUser.save();

		const token = jwt.sign({ email }, secret);

		res.cookie('token', token, { expires: new Date(Date.now() + 1000 * 60 * 60) });
		return res.end();
	} catch (err) {
		console.log(err);
	}
}


async function logIn (req: Request, res: Response) {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });

		if (user === null) {
			return res.sendStatus(404).end();
		}

		let passwordMatches = await bcrypt.compare(password, user.password);

		if (!passwordMatches) {
			return res.sendStatus(401).end();
		}

		const token = jwt.sign({ email }, secret);

		res.cookie('token', token, { expires: new Date(Date.now() + 1000 * 60 * 60) });
		return res.end();
	} catch (err) {
		console.log(err);
	}
}

export {
	signUp,
	logIn,
};
