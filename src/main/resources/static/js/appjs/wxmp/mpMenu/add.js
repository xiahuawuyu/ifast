$().ready(function () {
    validateRule();
    init();
});

$.validator.setDefaults({
    submitHandler: function () {
        save();
    }
});


function init() {
    console.log("init ...")
    $("#menutype").on("change", function () {
        var selected = $(this).val();
        initForm(selected);
    })
}

function initForm(selected) {
    $(".m").addClass("hidden");
    $(".m" + selected).removeClass("hidden")
}

function save() {
    $.ajax({
        cache: true,
        type: "POST",
        url: "/wxmp/mpMenu/save",
        data: $('#signupForm').serialize(),// 你的formid
        async: false,
        error: function (request) {
            parent.layer.alert("Connection error");
        },
        success: function (data) {
            if (data.code == 0) {
                parent.layer.msg("操作成功");
                parent.reLoad();
                var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
                parent.layer.close(index);

            } else {
                parent.layer.alert(data.msg)
            }

        }
    });

}

function validateRule() {
    var icon = "<i class='fa fa-times-circle'></i> ";
    $("#signupForm").validate({
        rules: {
            name: {
                required: true
            }
        },
        messages: {
            name: {
                required: icon + "请输入姓名"
            }
        }
    })
}