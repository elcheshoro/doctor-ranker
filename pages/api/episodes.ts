import Express from 'express';

import postHandler from '../../src/api/episodes/get.handler';

const episodes = async (
  req: Express.Request<any, any, any, { site: string }>,
  res: Express.Response,
) => {
  try {
    switch (req.method) {
      case 'GET':
        await postHandler(req, res);
        return null;
      default:
        return res.status(405).send('Invalid method');
    }
  } catch (e) {
    res.status(500).send();
    return null;
  }
};

export default episodes;
