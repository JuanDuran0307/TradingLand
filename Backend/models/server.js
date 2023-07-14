const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");

const conectarDB= async () =>{
    try {
        const connectionDB= await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const url = `Conectado a Mongodb en server ${connectionDB.connection.host}- en puerto ${connectionDB.connection.port}`
        console.log(url);
    } catch (error) {
        console.log(`${error.message}`);
        process.exit(1);
    }
};






class Server {
    constructor(){
        this.app = express();
        
        this.port = process.env.PORT;
        this.usuariosPath = "/traders";
        /* conexion */
        conectarDB();
        /* middlewares */
        this.middlewares();
        /* Routing */
        this.routes();


    }
    middlewares(){
        /* cors */
        this.app.use(cors());
        /* Public Directory */
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.usuariosPath, require('../routes/Traders.routes.js'));
    }

    listenn(){
        this.app.listen(this.port, ()=>{
            console.log(`server running on port : ${this.port}`);
        })
    }
}
module.exports = Server;