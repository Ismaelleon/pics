import express, { Express } from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import router from './routes/index';

dotenv.config()

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use('/', router);

app.listen(port, () => {
	console.log(`app running on port ${port}`);
});
