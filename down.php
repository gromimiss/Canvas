<?php
//声明文件的类型  MIME数据类型
header('Content-type:image/png');
//文件相关描述
header('Content-Disposition:attachment;filename="canvas.jpg"');
//文件内容
echo base64_decode($_POST['data']);
?>