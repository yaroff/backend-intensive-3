// Instruments
import { app } from './server';
import { getPort } from './utils';

const PORT = getPort();

app.listen(PORT, () => {
    console.log(`Server API is up on port ${PORT}`);
});
