//配置
$(function () {
          $(".deploy_role_permission").click(
              function () {
                  $(".hide,.deploy_part").removeClass('hide')
              }
          );
            $(".deploy_cancle").click(
                function () {
                    $(".role_permission_shade").addClass('hide');
                    $(".hide,.deploy_part").addClass('hide')
                }
            )
        });

//编辑角色权限
$(function () {
    $(".modify_role_permission_cancle").click(
        function () {
            $(".modify_role_permission_shade").addClass('modify_role_permission_hide');
            $(".modify_role_permission_part").addClass('modify_role_permission_hide')
        }
    );
});