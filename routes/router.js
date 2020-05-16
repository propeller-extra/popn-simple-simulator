"use strict";

var express = require('express');
var router = express.Router();
var connection = require('../connection.js');

router.get('/', (req, res) => {
    res.render('top.ejs');
});

router.get('/top', (req, res) => {
    res.render('top.ejs');
});

router.get('/index', (req, res, next) => {

    connection.query(
        'SELECT id, name, CAST(p_9keys_data AS UNSIGNED) FROM p_9keys_table',
        (error, results) => {

            var allTableItems = results;
            var newTableItems = [];

            var newID = -1;

            allTableItems.forEach(element => {

                var includedBtns = extractBitFlags(element["CAST(p_9keys_data AS UNSIGNED)"]);

                newTableItems.push({id: element.id, name: element.name, includedBtns: includedBtns});

                var elementID = parseInt(element.id);
                newID = Math.max(newID, elementID);
            });

            newID++;

            res.render('index.ejs', { items: newTableItems, textboxNewID: newID });            
        }
    );
// コーディングがブサイクすぎるｗｗｗ
});

function extractBitFlags(bitState) {

    var bitFlags = [];

    console.log("bitState: " + bitState);

    for (var i = 0; i < 9; i++){
        var searchFlag = 0b1 << i;
        if (bitState & searchFlag) {
            bitFlags.push(i + 1);
        }
    }

    console.log("bitFlags: " + bitFlags);

    return bitFlags;
}

router.post('/create', (req, res, next) => {
/*
    console.log(req.body);
    console.log(req.body.P_DataName);
    console.log(req.body.P_DataBit);

    var dataName = req.body.P_DataName;
    var btnBitFlag = req.body.P_DataBit;

    //ここでエラー処理

    connection.query(
        'SELECT CAST(p_9keys_data AS UNSIGNED) FROM p_9keys_table',

        //SELECT 指定
        //p_9keys_data
        //CAST(p_9keys_data AS UNSIGNED)
        //CONV(p_9keys_data, 16, 10)

        (error, results) => {

            console.log('btnBitFlag: ' + btnBitFlag);

            console.log(results);

            results.forEach(result => {
                var item = Object.values(result);
                console.log("item: " + item);

                //var itemNum = parseInt(item, 10);
                //console.log("itemNum: " + itemNum);

                var n2 = parseInt(btnBitFlag, 10);

                console.log("<T>item: " + typeof (item));
                //console.log("<T>itemNum: " + typeof (itemNum));
                console.log("<T>btnBitFlag: " + typeof (n2));
                //console.log(itemNum == n2);


                // 重複エラー
                //if (num == btnBitFlag) {
                //    console.log('error occurs.')
                //    res.redirect('/index');
                //}

            });
            next();
        }
    );
*/
//DEBUG用
    next();
    
}, (req, res, next) => {
        console.log('CREATE, 関数2個目突入');

        var dataName = req.body.P_DataName;
        var btnBitFlagString = req.body.P_DataBit;
        var btnBitFlagNum = parseInt(btnBitFlagString);
        
        console.log("CREATE, dataName: " + dataName);
        console.log("CREATE, btnBitFlagNum: " + btnBitFlagNum);
        console.log("CREATE, <T>btnBitFlagNum: " + typeof (btnBitFlagNum));
        console.log("/n");

        connection.query(
            'INSERT INTO p_9keys_table SET ?', {
                name: dataName,
                p_9keys_data: btnBitFlagNum
            },
            (error, results) => {
                if (error) throw error;
                console.log('post /create: ' + results);
                res.redirect('/index');
            }
        );
    }
);

router.get('/read', (req, res) => {

    console.log(Object.values(req.query)[0]);
    var id = Object.values(req.query)[0];

    /*
    connection.query(
        '',
        (error, results) => {
            console.log(results);
            res.render('/index');
        }
    );
    */
    
    // データベースからIDに該当する行を探す
    // 該当したやつをviewにそれぞれ打ち込む
    // ラストはres.render('なにか')?  <- /indexの時とは違う動作にしなきゃなので確定
    // get /index 時にviewのデータ名のところも変更する必要あるね　ボタンの方も変更する必要あるな


    res.redirect('/index');
});

// デバッグも兼ねてるから今はこのままでいい。（今は全データ削除処理）
router.post('/delete', (req, res) => {
    connection.query(
        'TRUNCATE TABLE p_9keys_table',
        (error, results) => {
            console.log('post /delete: ' + results);
            res.redirect('/index');
        }
    );
});


module.exports = router;