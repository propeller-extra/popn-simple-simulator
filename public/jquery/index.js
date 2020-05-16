"use strict";

$(function () {
    //DEBUG
    //$('.link-top').text('jquery動作中');

    // CREATE
    // 「保存する」ボタンが押された時の処理
    $('.btn-save').click(function () {
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
});