
const sql = require('mssql');
var fs = require('fs');

imageDBConfig = {
    user: 'sa',
    password: '123',
    server: 'server',
    database: 'pic1001',
    "options": {
        "encrypt": false,
        "enableArithAbort": true
    },
    stream: false,
    port: 1433,
}

const createFile = (fSignData, filename) => {
    try {
        let imageBuffer;
        
        // تشخیص خودکار فرمت
        if (typeof fSignData === 'string') {
            // اگر شامل JFIF یا هدر JPEG است
            if (fSignData.includes('JFIF') || fSignData.charCodeAt(0) === 0xFF) {
                imageBuffer = Buffer.from(fSignData, 'binary');
            } 
            // اگر Base64 است
            else if (fSignData.startsWith('data:')) {
                const base64Data = fSignData.split(',')[1];
                imageBuffer = Buffer.from(base64Data, 'base64');
            }
            // اگر Hex است
            else if (/^[0-9a-fA-F]+$/.test(fSignData)) {
                imageBuffer = Buffer.from(fSignData, 'hex');
            }
            // پیش‌فرض: باینری
            else {
                imageBuffer = Buffer.from(fSignData, 'binary');
            }
        } else {
            // اگر از قبل بافر است
            imageBuffer = fSignData;
        }

        fs.writeFileSync(filename, imageBuffer);
        console.log(`file ${filename} saved. file size: ${imageBuffer.length} byte)`);
        
        // بررسی هدر
        const header = imageBuffer.subarray(0, 8).toString('hex');
        console.log(`file header: ${header}`);
        
        return true;
    } catch (error) {
        console.error('error in create : ', error);
        return false;
    }
}


const recoverPic = async() =>{
    let result = await new Promise(async (resolve, reject) => {
        var sqlQuery = `SELECT TOP 10 [Radif],[HesabNo],[KindHesab],[fSign],[filename],[lChang]  FROM [PIC1001].[dbo].[HesabPic]`;
        try {
            await sql.connect(imageDBConfig);
            const resultDB = await sql.query(sqlQuery);
            for(let i=0 ; i < resultDB.recordset.length; i++){
                const fSignData = resultDB.recordset[i].fSign;
                const filename = resultDB.recordset[i].filename;
                createFile(fSignData, `pics/pic${i}.jpg`)
            }
            resolve(1);
            sql.close();
        } catch (error) {
            console.log(error)
        }
    });
    return result;
}

recoverPic();