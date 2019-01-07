//是否添加本月字样
function dateMessage(input){
    var date = $(input).val();
    var h5 = $(input).parent().parent().find("div:eq(2) h5");
    if(date==getDate()){
        $(h5).text("本月|")
    }
    else{
        $(h5).text("")
    }
    return date
}
//得到当前年月份
function getDate(){
    var myDate = new Date();
    var year = myDate.getFullYear().toString();    //获取完整的年份(4位,1970-????)
    var month_num =myDate.getMonth()+1;
    var month = month_num>=10?"-"+(month_num):"-0"+(month_num);
    return year+month
}
function getSubDate(num){
    var myDate = new Date();
    var year = myDate.getFullYear().toString();    //获取完整的年份(4位,1970-????)
    var month_num =myDate.getMonth()+1-num;
    if(month_num>0){
        var month = month_num>=10?"-"+(month_num):"-0"+(month_num);
        return year+month
    }else{
        year = year-1
        month_num = 12+month_num
        var month = month_num>=10?"-"+(month_num):"-0"+(month_num);
        return year+month
    }
}
function getDateTime(){
    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth()+1;//得到月 ）
    var day = myDate.getDate();//得到天数
    var hours = myDate.getHours();//得到时
    var min = myDate.getMinutes();//得到分
    // var sec = myDate.getSeconds();//得到秒
    return year+"-"+(month>=10?month:"0"+month)+"-"+(day>=10?day:"0"+day)+" "+(hours>=10?hours:"0"+hours)+":"+(min>=10?min:"0"+min)
}
function getSubDateTime(){
    var myDate = new Date();
    myDate.setTime(myDate.getTime()-60*60*1000);
    var year = myDate.getFullYear();
    var month = myDate.getMonth()+1;//得到月 ）
    var day = myDate.getDate();//得到天数
    var hours = myDate.getHours();//得到时
    var min = myDate.getMinutes();//得到分
    // var sec = myDate.getSeconds();//得到秒
    return year+"-"+(month>=10?month:"0"+month)+"-"+(day>=10?day:"0"+day)+" "+(hours>=10?hours:"0"+hours)+":"+(min>=10?min:"0"+min)
}
//资源池状态
function resource_pool_state(input){
    var date = dateMessage(input);
    $.get("/operation_analysis/resource_pool_state/",
        {"date":date},
        function(data){
            data = eval(data)
            if (eval(data).error==1){
                $("#resource_pool_state_error").html(eval(data).message)
                $("#resource_pool_state").hide()
                $("#resource_pool_state_error").show()
                return
            }
            $("#resource_pool_state").show()
            $("#resource_pool_state_error").hide()
            var name_list = new Array()
            var data_list = new Array()
            for (var key in data){
                for(var i=0;i<data[key][0].length;i++){
                    name_list.push(data[key][0][i])
                }
                name_list.push(" ")
                for(var i=0;i<data[key][1].length;i++){
                    data_list.push(data[key][1][i])
                }
                data_list.push("-")
            }

            var myChart = echarts.init(document.getElementById('resource_pool_state'));
            var option = {
                grid:{
                    y:20,
                    x2:0,
                    x:30
                },
                xAxis: {
                    type: 'category',
                    data:name_list ,
                    axisLabel:{
                        interval:0,
                        rotate:45,
                    },
                    axisLine:{show:false},
                    axisTick:{show:false}

                },
                yAxis: {
                    type: 'value',
                    show:false,

                },
                series: [
                    {
                        data: data_list,
                        type: 'bar',
                        itemStyle:{
                            normal:{
                                color:function(params){
                                    if(params.value >=95 && params.value <100){
                                        return "#B388FF";
                                    }else if(params.value<95 ){
                                        return "#4CB3D0";
                                    }
                                    return "#DE545D";
                                }
                            }
                        },
                        label:{
                            normal:{
                                show:true,
                                position:'top',
                                formatter: '{c} %',
                                textStyle: {
                                    fontSize: 10
                                }
                            }
                        }
                    },
                ],
            };
            myChart.setOption(option);
        },"json"
    )
}
//池化比例
function pooling_the_proportion(input){
    var date = dateMessage(input);
    $.get("/operation_analysis/pooling_the_proportion/",
        {"date":date},
        function(data){
            if (eval(data).error==1){
                $("#pooling_the_proportion_error").html(eval(data).message)
                $("#pooling_the_proportion_side").hide()
                $("#pooling_the_proportion_error").show()
                return
            }
            $("#pooling_the_proportion_side").show()
            $("#pooling_the_proportion_error").hide()
            $("#proportion").text(data[0]);
            if(data[1]<0){
                $("#pooling_the_proportion_side").find("div:eq(4)").css("color","#DE545D");
                $("#pooling_the_proportion_side").find("div:eq(5)").css("color","#DE545D")
            }
            else{
                $("#pooling_the_proportion_side").find("div:eq(4)").css("color","#46B3D2");
                $("#pooling_the_proportion_side").find("div:eq(5)").css("color","#46B3D2")
            }
            $("#percentage").text(data[1])
        },"json"
    )
}
//资源回收
function resources_recovery(input){
    date = dateMessage(input);
    $.get("/operation_analysis/resources_recovery/",
        {"date":date},
        function(data){
            if (eval(data).error==1){
                $("#resources_recovery_error").html(eval(data).message)
                $("#resources_recovery_side1").hide()
                $("#resources_recovery_side2").hide()
                $("#resources_recovery_error").show()
                return
            }
            $("#resources_recovery_side1").show()
            $("#resources_recovery_side2").show()
            $("#resources_recovery_error").hide()
            $("#num").text(data[0]);
            $("#value").text(data[2]);
            if(data[1]<0){
                $("#resources_recovery_side1").find("div:eq(4)").css("color","#DE545D");
                $("#resources_recovery_side1").find("div:eq(5)").css("color","#DE545D")
            }else{
                $("#resources_recovery_side1").find("div:eq(4)").css("color","#46B3D2");
                $("#resources_recovery_side1").find("div:eq(5)").css("color","#46B3D2")
            }
            if(data[3]<0){
                $("#resources_recovery_side2").find("div:eq(4)").css("color","#DE545D");
                $("#resources_recovery_side2").find("div:eq(5)").css("color","#DE545D")
            }else{
                $("#resources_recovery_side2").find("div:eq(4)").css("color","#46B3D2");
                $("#resources_recovery_side2").find("div:eq(5)").css("color","#46B3D2")
            }
            if(data[4]<0){
                $("#resources_recovery_side1").find("div:eq(7)").css("color","#DE545D");
                $("#resources_recovery_side1").find("div:eq(8)").css("color","#DE545D")
            }else{
                $("#resources_recovery_side1").find("div:eq(7)").css("color","#46B3D2");
                $("#resources_recovery_side1").find("div:eq(8)").css("color","#46B3D2")
            }
            if(data[5]<0){
                $("#resources_recovery_side2").find("div:eq(7)").css("color","#DE545D");
                $("#resources_recovery_side2").find("div:eq(8)").css("color","#DE545D")
            }else{
                $("#resources_recovery_side2").find("div:eq(7)").css("color","#46B3D2");
                $("#resources_recovery_side2").find("div:eq(8)").css("color","#46B3D2")
            }
            $("#num_percentage").text(data[1]);
            $("#value_percentage").text(data[3])
            $("#year_num_percentage").text(data[4]);
            $("#year_value_percentage").text(data[5])
        },"json"
    )
}