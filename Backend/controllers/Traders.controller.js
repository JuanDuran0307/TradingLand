const mongoose = require("mongoose");


const TradersSchema = mongoose.Schema(
    {
    nombre: {
        type: String,
        required:true,
        trim:true,
    },
    edad: {
        type: Number,
        required:true,
        trim:true,
    },
    nacionalidad: {
        type: String,
        required:true,
        trim:true,
    },
    presupuesto: {
    type: String,
    required:true,
    trim:true,
    }
    },
    {
        timestamps: true,
    }
);


const Traders = mongoose.model("traders", TradersSchema);


const getTraders = async (req,res)=>{
    const traders = await Traders.find();
    res.json(traders);
};
    
const deleteTraders = async (req,res)=>{
    try {
        await Traders.deleteOne({_id:req.params.id});
        res.status(204).send();
    } catch (error) {
        res.status(404);
        res.send({error:"no se elimino el cliente"});
        
    }

};

const insertTrader = async (req,res)=>{
    const traders = new Traders(req.body);
    try {
        const nuevTrader = await traders.save();
        res.json(nuevoTrader);
    } catch (error) {
        console.log(error);
    }
    
};

const updateTraders = async (req,res)=>{
    try {
        const Trader = await Traders.findOne({_id:req.params.id});
        if (req.body.nombre) {
            Trader.nombre = req.body.nombre;
        }
        if (req.body.edad){
            Trader.edad = req.body.edad;
        }
        if ( req.body.nacionalidad){
            Trader.nacionalidad = req.body.nacionalidad;
        }
        if ( req.body.presupuesto){
            Trader.presupuesto = req.body.presupuesto;
        }
        await Trader.save();
        res.send(Trader);
    } catch (error) {
        
    }
    
};

module.exports = {
    getTraders,
    deleteTraders,
    insertTrader,
    updateTraders
}