import Express from 'express';
import getData from '../helpers/getData';

const postHandler = async (
  _: Express.Request,
  res: Express.Response,
) => {
  try {
    const data = await getData();
    console.log('GOT ALL DATA')
    res.json(data);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
};

export default postHandler;
