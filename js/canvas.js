var canvas=document.getElementById('canvas');
var cxt=canvas.getContext('2d');

//获取工具按钮的标签
	//获取画笔标签
var Brush=document.getElementById('means_brush');
	//获取橡皮标签
var Eraser=document.getElementById('means_eraser');
	//获取油漆桶标签
var Paint=document.getElementById('means_paint');
	//获取吸管标签
var Straw=document.getElementById('means_straw');
	//获取文本标签
var Text=document.getElementById('means_text');
	//获取放大镜标签
var Magnifier=document.getElementById('means_magnifier');

//获取形状按钮的标签
	//获取画线标签
var Line=document.getElementById('shape_line');
	//获取画圆圈的标签
var Arc=document.getElementById('shape_arc');
	//获取画方框的标签
var Rect=document.getElementById('shape_rect');
	//获取画多标签的标签
var Poly=document.getElementById('shape_poly');
	//获取画圆形(填充)
var ArcFill=document.getElementById('shape_arcfill');
	//获取画矩形的标签
var RectFill=document.getElementById('shape_rectfill');
//把12个工具和形状标签放到一个数组中
var actions=[Brush,Eraser,Paint,Straw,Text,Magnifier,Line,Arc,Rect,Poly,ArcFill,RectFill];

//获取线宽按钮
var Line_1=document.getElementById('width_1');
var Line_3=document.getElementById('width_3');
var Line_5=document.getElementById('width_5');
var Line_8=document.getElementById('width_8');
//把4中线宽对象放到一个数组中
var widths=[Line_1,Line_3,Line_5,Line_8];

//获取颜色按钮
var ColorRed=document.getElementById('red');
var ColorGreen=document.getElementById('green');
var ColorBlue=document.getElementById('blue');
var ColorYellow=document.getElementById('yellow');
var ColorWhite=document.getElementById('white');
var ColorBlack=document.getElementById('black');
var ColorPink=document.getElementById('pink');
var ColorPurPle=document.getElementById('purple');
var ColorCyan=document.getElementById('cyan');
var ColorOrange=document.getElementById('orange');
//把10中颜色标签对象放到一个数组中
var colors=[ColorRed,ColorGreen,ColorBlue,ColorYellow,ColorWhite,ColorBlack,ColorPink,ColorPurPle,ColorCyan,ColorOrange];


//设置初始值
    //初始工具为画笔
    drawBrush(0);
    //初始线宽
    setLineWidth(0);
    //初始颜色
    setColor(ColorRed,0);
    
//状态设置函数（有两种状态改变）
function setStatus(Arr,num,type){
	for(var i=0;i<Arr.length;i++){
		//设置选中的标签改变CSS属性
		if(i==num){
			//设置改变CSS的样式是背景色还是边框
			if(type==1){
				Arr[i].style.background="yellow";
			}else{
				Arr[i].style.border="1px solid #fff";
			}
			
		}else{//设置未选中的组中的其他标签改变颜色
			if(type==1){
				Arr[i].style.background="#ccc";
			}else{
				Arr[i].style.border="1px solid #000";
			}
		}
	}
}
	
//列出所有的按钮对应的函数
//铅笔工具函数
function drawBrush(num){
	//调用状态函数，铅笔工具在数组【0】，所以num=0，type=1,设置背景色
	setStatus(actions,num,1);
	//设置标志位-->判断鼠标是否按下
	var flag=false;
	//设置鼠标按下事件
	canvas.onmousedown=function(ev){
		var oEvent=event||ev;
		//鼠标在canvas中的位置是鼠标离页面的距离-canvas离页面的距离
	    var startX=oEvent.pageX-this.offsetLeft;
	    var startY=oEvent.pageY-this.offsetTop;
	    cxt.beginPath();
	    cxt.moveTo(startX,startY);
	    flag=true;
    }
	canvas.onmousemove=function(ev){
		var oEvent=event||ev;
		//鼠标在canvas中的位置是鼠标离页面的距离-canvas离页面的距离
	    var endX=oEvent.pageX-this.offsetLeft;
	    var endY=oEvent.pageY-this.offsetTop;
	    if(flag){
	    cxt.lineTo(endX,endY);
	    /*注意：不需要闭合路径*/
	    cxt.stroke();
	    }
	}
    //若鼠标抬起则设置标志位为false，使鼠标移动事件不再执行
    canvas.onmouseup=function(){
    	flag=false;
    }
    //若鼠标移出则设置标志位为false，使鼠标移动事件不再执行
    canvas.onmouseout=function(){
    	flag=false;
    }
}
//橡皮工具函数
function drawEraser(num){
	setStatus(actions,num,1);
		//设置标志位-->判断鼠标是否按下
	var flag=false;
	//设置鼠标按下事件
	canvas.onmousedown=function(ev){
		var oEvent=event||ev;
		//鼠标在canvas中的位置是鼠标离页面的距离-canvas离页面的距离
	    var eraserX=oEvent.pageX-this.offsetLeft;
	    var eraserY=oEvent.pageY-this.offsetTop;
	    cxt.clearRect(eraserX-cxt.lineWidth,eraserY-cxt.lineWidth,cxt.lineWidth*2,cxt.lineWidth*2);
	    flag=true;
    }
	canvas.onmousemove=function(ev){
		var oEvent=event||ev;
		//鼠标在canvas中的位置是鼠标离页面的距离-canvas离页面的距离
	    var eraserX=oEvent.pageX-this.offsetLeft;
	    var eraserY=oEvent.pageY-this.offsetTop;
	    if(flag){
	    	//从矩形中心点开始清除
	    cxt.clearRect(eraserX-cxt.lineWidth,eraserY-cxt.lineWidth,cxt.lineWidth*2,cxt.lineWidth*2);
	    }
	}
    //若鼠标抬起则设置标志位为false，使鼠标移动事件不再执行
    canvas.onmouseup=function(){
    	flag=false;
    }
    //若鼠标移出则设置标志位为false，使鼠标移动事件不再执行
    canvas.onmouseout=function(){
    	flag=false;
    }
}

//油漆桶工具函数
function drawPaint(num){
	setStatus(actions,num,1);
    canvas.onmousedown=function(ev){
	    cxt.fillRect(0,0,900,400);
	    flag=true;
    }
}

//吸管工具函数
function drawStraw(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function(ev){
		var oEvent=event||ev;
		//鼠标在canvas中的位置是鼠标离页面的距离-canvas离页面的距离
	    var strawX=oEvent.pageX-this.offsetLeft;
	    var strawY=oEvent.pageY-this.offsetTop;
	    var imageData=cxt.getImageData(strawX,strawY,1,1);
	    var color='rgb('+imageData.data[0]+','+imageData.data[1]+','+imageData.data[2]+')';
	    cxt.strokeStyle=color;
	    cxt.fillStyle=color;
	    //设置在吸管之后自动选中画笔工具
	    drawBrush(0);
    }
}

//文本工具函数
function drawText(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function(ev){
		var oEvent=event||ev;
		//鼠标在canvas中的位置是鼠标离页面的距离-canvas离页面的距离
	    var textX=oEvent.pageX-this.offsetLeft;
	    var textY=oEvent.pageY-this.offsetTop;
	    //返回用户输入的文字
	   var userVal=window.prompt('请输入您的文字','');
	   cxt.fillText(userVal,textX,textY);
    }
	
}

//放大镜工具函数
function drawMagnifier(num){
	setStatus(actions,num,1);
	var scale=window.prompt('请输入百分比','');
	lastScaleW=900*scale/100;
	lastScaleH=400*scale/100;
	canvas.style.width=lastScaleW+'px';
	canvas.style.height=lastScaleH+'px';    
}
//保存图片
function saveImg(){
	//获取到图像数据url
	var imageData=canvas.toDataURL();
	//去除前面一串固定值
	var b64=imageData.substring(22);
	//将b64赋值给隐藏域
	var data=document.getElementById('data');
	data.value=b64;
	//强表单提交到后台
	var form=document.getElementById('myForm');
	form.submit();
	
}
//清除画布
function clearImg(){
	cxt.clearRect(0,0,900,400);
}

//线形状函数
function drawLine(num){
	setStatus(actions,num,1);
	//鼠标按下获取起始坐标
	canvas.onmousedown=function(ev){
		var oEvent=event||ev;
		//鼠标在canvas中的位置是鼠标离页面的距离-canvas离页面的距离
	    var startX=oEvent.pageX-this.offsetLeft;
	    var startY=oEvent.pageY-this.offsetTop;
	    cxt.beginPath();
	    cxt.moveTo(startX,startY);
	}
	//鼠标抬起获取终点坐标
	canvas.onmouseup=function(ev){
		var oEvent=event||ev;
		//鼠标在canvas中的位置是鼠标离页面的距离-canvas离页面的距离
	    var endX=oEvent.pageX-this.offsetLeft;
	    var endY=oEvent.pageY-this.offsetTop;
	    cxt.lineTo(endX,endY);
	    cxt.closePath();
	    cxt.stroke();
	}
}
//设置全局变量
var arcX=0;
var arcY=0;
//圆形形状函数
function drawArc(num){
	setStatus(actions,num,1);
		//鼠标按下获取圆心坐标
		canvas.onmousedown=function(ev){
			var oEvent=event||ev;
			//鼠标在canvas中的位置是鼠标离页面的距离-canvas离页面的距离
		    arcX=oEvent.pageX-this.offsetLeft;
		    arcY=oEvent.pageY-this.offsetTop;    
		}
		//鼠标抬起获取终点坐标
		canvas.onmouseup=function(ev){
			var oEvent=event||ev;
			//鼠标在canvas中的位置是鼠标离页面的距离-canvas离页面的距离
		    var endX=oEvent.pageX-this.offsetLeft;
		    var endY=oEvent.pageY-this.offsetTop;
		    var a=endX-arcX;
		    var b=endY-arcY;
		    var r=Math.sqrt(a*a+b*b);
		    cxt.beginPath();
		    cxt.arc(arcX,arcY,r,0,360,false);
		    cxt.closePath();
		    cxt.stroke();
		}
}
//定义全局变量
var recX=0;
var recY=0;
//矩形形状函数
function drawRect(num){
	setStatus(actions,num,1);
	//鼠标按下获取起始坐标
		canvas.onmousedown=function(ev){
			var oEvent=event||ev;
			//鼠标在canvas中的位置是鼠标离页面的距离-canvas离页面的距离
		    recX=oEvent.pageX-this.offsetLeft;
		    recY=oEvent.pageY-this.offsetTop;    
		}
		//鼠标抬起获取终点坐标
		canvas.onmouseup=function(ev){
			var oEvent=event||ev;
			//鼠标在canvas中的位置是鼠标离页面的距离-canvas离页面的距离
		    var endX=oEvent.pageX-this.offsetLeft;
		    var endY=oEvent.pageY-this.offsetTop;
		    var width=endX-recX;
		    var height=endY-recY;
		    cxt.beginPath();
		    cxt.rect(recX,recY,width,height);
		    cxt.closePath();
		    cxt.stroke();
		}
}

var polyX=0;
var polyY=0;
//多边形形状函数
function drawPoly(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function(evt){
		evt=window.event||evt;
		polyX=evt.pageX-this.offsetLeft;
		POLyY=evt.pageY-this.offsetTop;
	}
	canvas.onmouseup=function(evt){
		evt=window.event||evt;
		var endX=evt.pageX-this.offsetLeft;
		var endY=evt.pageY-this.offsetTop;
		cxt.beginPath();
		//将画笔移动到右下角的顶点
		cxt.moveTo(endX,endY);
		//计算左下角的顶点坐标
		var lbX=2*polyX-endX;
		var lbY=endY;
		cxt.lineTo(lbX,lbY);
		//设置第三个顶点的坐标
		var tmpC=2*(endX-polyX);
		var tmpA=endX-polyX;
		var tmpB=Math.sqrt(tmpC*tmpC-tmpA*tmpA);
		//计算最上面顶点坐标
		//endY-tmpB 定点的Y坐标 polyX是顶点的X坐标
		//画到顶点
		cxt.lineTo(polyX,endY-tmpB);
		//封闭路径->画出来
		cxt.closePath();
		cxt.stroke();
	}
	canvas.onmousemove=null;
	canvas.onmouseout=null;
}



//圆形填充形状函数
function drawArcFill(num){
	setStatus(actions,num,1);
		//鼠标按下获取圆心坐标
		canvas.onmousedown=function(ev){
			var oEvent=event||ev;
			//鼠标在canvas中的位置是鼠标离页面的距离-canvas离页面的距离
		    arcX=oEvent.pageX-this.offsetLeft;
		    arcY=oEvent.pageY-this.offsetTop;    
		}
		//鼠标抬起获取终点坐标
		canvas.onmouseup=function(ev){
			var oEvent=event||ev;
			//鼠标在canvas中的位置是鼠标离页面的距离-canvas离页面的距离
		    var endX=oEvent.pageX-this.offsetLeft;
		    var endY=oEvent.pageY-this.offsetTop;
		    var a=endX-arcX;
		    var b=endY-arcY;
		    var r=Math.sqrt(a*a+b*b);
		    cxt.beginPath();
		    cxt.arc(arcX,arcY,r,0,360,false);
		    cxt.closePath();
		    cxt.fill();
		}
}

//矩形填充形状函数
function drawRectFill(num){
	setStatus(actions,num,1);
	//鼠标按下获取起始坐标
		canvas.onmousedown=function(ev){
			var oEvent=event||ev;
			//鼠标在canvas中的位置是鼠标离页面的距离-canvas离页面的距离
		    recX=oEvent.pageX-this.offsetLeft;
		    recY=oEvent.pageY-this.offsetTop;    
		}
		//鼠标抬起获取终点坐标
		canvas.onmouseup=function(ev){
			var oEvent=event||ev;
			//鼠标在canvas中的位置是鼠标离页面的距离-canvas离页面的距离
		    var endX=oEvent.pageX-this.offsetLeft;
		    var endY=oEvent.pageY-this.offsetTop;
		    var width=endX-recX;
		    var height=endY-recY;
		    cxt.beginPath();
		    cxt.rect(recX,recY,width,height);
		    cxt.closePath();
		    cxt.fill();
		}
}

//线宽设置函数
function setLineWidth(num){
	setStatus(widths,num,1);
	switch(num){
		case 0:
		cxt.lineWidth=1;
		break;
		case 1:
		cxt.lineWidth=3;
		break;
		case 2:
		cxt.lineWidth=5;
		break;
		case 3:
		cxt.lineWidth=7;
		break;
		default:
		cxt.lineWidth=1;
	}
}

//颜色设置函数,将对象也传入函数，获取其id名，设置颜色
function setColor(obj,num){
	setStatus(colors,num,0);
	//设置画笔颜色和填充颜色
	cxt.strokeStyle=obj.id;
	cxt.fillStyle=obj.id;
}