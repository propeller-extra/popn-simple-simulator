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

    // 新規保存処理
    $('.btn-data-new-save').click(function () {
        submitBtnData("new");
    });

    //上書き保存処理
    $('.btn-data-overwrite-save').click(function () {
        submitBtnData("overwrite");
    });

    //削除ボタンが押された時の処理
    $('.open-modal').click(function () {
        var btnDelId = $(this).attr('data-del-id');
        $('#data-delete-form').find('h2').text("ID: " + btnDelId + " を削除しますか？");
        $('input[name="D_ID"]').val(btnDelId);

        $('#warning-delete-modal').fadeIn();
    });
    
    //モーダルを非表示にする
    $('.close-modal').click(function () {
        $('#warning-delete-modal').fadeOut();
    });
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

function submitBtnData(saveOption) {
    var textboxDataName = $('.textbox-data-name').val();

    var bitFlag = 0b0;

    for (var i = 0; i < 9; i++) {
        var bitMask = 0b1 << i;
        var btnId = '#btn-circle-' + (i + 1);

        if ($(btnId).prop('checked')) {
            bitFlag |= bitMask; //フラグを立てる
        }
    }

    // データ名とビットフラグを渡す
    // index.ejsの空のフォームに渡してPOST実行してみる
    var form = $('.operations-wrapper form');

    $('[name="P_DataName"]').val(textboxDataName);
    $('[name="P_DataBit"]').val(bitFlag);

    if (saveOption == "new") {
        form.attr('action', '/create');
    } else if (saveOption == "overwrite") {
        var textboxDataID = $('.textbox-data-id').val();
        textboxDataID = textboxDataID.replace(/[^0-9]/g, '');

        $('[name="P_DataID"]').val(textboxDataID);

        form.attr('action', '/update');
    } else {
        return;
    }

    form.submit();
}