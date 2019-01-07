//配置
$(function () {
      $(".deploy").click(
          function () {
              $(".hide,.deploy_part").removeClass('hide')
          }
      );
        $(".deploy_cancle").click(
            function () {
                $(".user_role_shade").addClass('hide');
                $(".hide,.deploy_part").addClass('hide')
            }
        );
        });

//编辑用户角色
$(function () {
    $(".modify_role_user_cancle").click(
        function () {
            $(".modify_role_user_shade").addClass('modify_role_user_hide');
            $(".modify_role_user_part").addClass('modify_role_user_hide')
        }
    );
});
