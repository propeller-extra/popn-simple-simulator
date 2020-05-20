"use strict";

$(function () {
    //DEBUG
    //$('.link-top').text('jquery動作中');

    // 読み込みモード時にはボタンを最初から押した状態にしておく
    var text_checkedBtns = $('.checked-btns').text();
    if (text_checkedBtns != null && text_checkedBtns != '') {
        var checkedBtns = extractBitFlags(parseInt(text_checkedBtns));
        checkedBtns.forEach((i) => {
            $('#btn-circle-' + i).prop('checked', true);
        });
    }

    // CREATE
    // 「保存する」ボタンが押された時の処理
    $('.btn-data-new-save').click(function () {
        var textboxDataName = $('.textbox-data-name').val();

        var bitFlag = 0b0;

        for (var i = 0; i < 9; i++){
            var bitMask = 0b1 << i;
            var btnId = '#btn-circle-' + (i+1);

            if ($(btnId).prop('checked')) {
                bitFlag |= bitMask; //フラグを立てる
            }
        }

        // データ名とビットフラグを渡す
        // index.ejsの空のフォームに渡してPOST実行してみる
        var form = $('.operations-wrapper form');
        
        $('[name="P_DataName"]').val(textboxDataName);
        $('[name="P_DataBit"]').val(bitFlag);

        form.submit();
    });


    //削除ボタンが押された時の処理
    //ポップアップを表示させる(CSS変更)
});

function extractBitFlags(bitState) {

    var bitFlags = [];

    for (var i = 0; i < 9; i++) {
        var searchFlag = 0b1 << i;
        if (bitState & searchFlag) {
            bitFlags.push(i + 1);
        }
    }

    return bitFlags;
}