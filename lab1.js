const express = require('express');
const handler = require('./handler');
const crud = express();

crud.use("/getData", handler.getData);
crud.use('/get/:id', handler.get);
crud.use('/insert/:id/:param', handler.insert);
crud.use("/update/:id/:param", handler.update);
crud.use("/delete/:id", handler.delete);
crud.listen(1234, () => {
    console.log('Run CRUD');
})