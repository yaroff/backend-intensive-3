import express from 'express';

import { get, post } from './handlers';
import { getByHash } from './hash';

// Utils
import { limiter, validator } from '../../utils';

// Schemas
import { createUser } from '../../schemas';

export const router = express.Router();

router.get('/', [ limiter(2, 1000 * 60) ], get);
router.post('/', [ validator(createUser) ], post);

router.get('/:userHash', getByHash);
// router.put('/:userHash', updateByHash);

export { router as users };
