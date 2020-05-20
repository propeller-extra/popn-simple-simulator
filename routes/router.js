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
    console.log("get /index");

    renderIndex(req, res, next, -1);
});

router.get('/index/:id', (req, res, next) => {
    console.log("get /index/:id: " + req.params.id);

    renderIndex(req, res, next, req.params.id);
});

function renderIndex(req, res, next, ReadID) {

    // viewのテーブルに表示される全データをデータベースから取得
    connection.query(
        'SELECT id, name, CAST(p_9keys_data AS UNSIGNED) FROM p_9keys_table',
        (error, results) => {
            if (error) throw error;

            var newTableItems = []; //viewのテーブルに表示される全データ
            var newID = 0; //viewのテキストボックスに入る新しいID値
            var allTableItems = results;

            allTableItems.forEach(element => {

                var includedBtns = extractBitFlags(element["CAST(p_9keys_data AS UNSIGNED)"]);

                newTableItems.push({
                    id: element.id,
                    name: element.name,
                    includedBtns: includedBtns
                });


                var elementID_n = parseInt(element.id);
                newID = Math.max(newID, elementID_n);
            });

            newID++;

        /*
        mainItem[
            {ID}, //現在のnewIDにあたる部分。viewのテキストボックスに入るID値
            {isCheckedBtns}, // 中身はnumberの配列、含まれているボタン1〜9の数値が順に入る。ViewのボタンUIに反映される。 Case /index: NULL
            {tableItems} //現在のnewTableItemsをそのまま流用
        */

            if (ReadID == -1) { // case: routing('/index');
                // これをrenderに渡す。
                var mainItems = [{ checkedBtns: null }, { tableItems: newTableItems }, { ID: newID }];
                console.log(mainItems);

                res.render('index.ejs', {mainItems: mainItems});
            } else { // case: routing('/index/:id')
                
                var checkedBtns = [];

                //mysqlでReadIDにあたるレコードを取得
                connection.query(
                    'SELECT name, CAST(p_9keys_data AS UNSIGNED) FROM p_9keys_table WHERE id = ?',
                    [ReadID],
                    (error, results) => {
                        if (error) throw error;

                        checkedBtns = results[0]["CAST(p_9keys_data AS UNSIGNED)"];

                        var name = results[0]["name"];

                        var mainItems = [{ checkedBtns: checkedBtns }, { tableItems: newTableItems }, { ID: ReadID }, {name: name}];
                        console.log(mainItems);

                        res.render('index.ejs', {mainItems: mainItems});
                    }
                );
            }
        }
    );
}

function extractBitFlags(bitState) {

    var bitFlags = [];

    for (var i = 0; i < 9; i++){
        var searchFlag = 0b1 << i;
        if (bitState & searchFlag) {
            bitFlags.push(i + 1);
        }
    }

    return bitFlags;
}

router.post('/create', (req, res) => {

    var dataName = req.body.P_DataName;
    var btnBitFlagString = req.body.P_DataBit;
    var btnBitFlagNum = parseInt(btnBitFlagString);

    connection.query(
        'INSERT INTO p_9keys_table SET ?', {
            name: dataName,
            p_9keys_data: btnBitFlagNum
        },
        (error, results) => {
            if (error) throw error;

            console.log('NEW DATA INSERTED.');
            res.redirect('/index');
        }
    );
});

// デバッグも兼ねてるから今はこのままでいい。（今は全データ削除処理）
router.post('/delete', (req, res) => {
    connection.query(
        'TRUNCATE TABLE p_9keys_table',
        (error, results) => {
            if (error) throw error;

            console.log('post /delete: ' + results);
            res.redirect('/index');
        }
    );
});

router.get('/edit', (req, res) => {

    console.log(req.query);

    res.send("ROUTER GET: EDIT");
});

router.post('/update', (req, res) => {
    res.send("ROUTER POST: UPDATE");
});

module.exports = router;