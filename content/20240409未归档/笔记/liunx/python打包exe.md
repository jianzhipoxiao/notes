# python打包exe

***



1. Pyinstaller -F setup.py 打包exe
2. Pyinstaller -F -w setup.py 不带控制台的打包
3. Pyinstaller -F -i xx.ico setup.py 打包指定exe图标打包

## **安装pyinstaller**

首先安装pyinstaller，使用安装命令：pip3 install pyinstaller，如下图所示。

![img](https://pic1.zhimg.com/80/v2-9d231226f44f0b5666820856cde24360_720w.webp)

## **pyinstaller打包机制**

我们写的python脚本是不能脱离python解释器单独运行的，所以在打包的时候，至少会将python解释器和脚本一起打包，同样，为了打包的exe能正常运行，会把我们所有安装的第三方包一并打包到exe。

即使我们的项目只使用的一个requests包，但是可能我们还安装了其他n个包，但是他不管，因为包和包只有依赖关系的。比如我们只装了一个requests包，但是requests包会顺带装了一些其他依赖的小包，所以为了安全，只能将所有第三方包+python解释器一起打包。如下图所示。

![img](https://pic4.zhimg.com/80/v2-8ea4b63e6ceb948587f7429ec9e002eb_720w.webp)

蓝色表示是安装requests依赖的包，看到了吧！

## **Pyinstaller打包exe**

这里呢，我就拿刚给同事写办公自动化脚本示例一下。源码示例效果，如下图所示。

![动图](https://pic4.zhimg.com/v2-927c749d3a5bc3f65f184d506a74223f_b.webp)



1、我们来将这个.py的文件打包成一个exe，我们直接cmd切换到这个脚本的目录，执行命令：pyinstaller-F setup.py，如下图所示。

![img](https://pic2.zhimg.com/80/v2-aeec9b319b5ddeb412f56111529c7f29_720w.webp)

ps: -F参数表示覆盖打包，这样在打包时，不管我们打包几次，都是最新的，这个记住就行，固定命令。

2、执行完毕之后，会生成几个文件夹，如下图所示。

![img](https://pic4.zhimg.com/80/v2-f8b14f61d1abd2ec5ab00c1bb8415e5f_720w.webp)

3、在dist里面呢，就有了一个exe程序，这个就是可执行的exe程序，如下图所示。

![img](https://pic2.zhimg.com/80/v2-f7c9a5d87a8b0136da95ad206bb562a9_720w.webp)

4、我们把这个setup.exe拖到和setup.py平级的目录，我们来运行一下这个，效果图如下图所示。

![动图封面](https://pic2.zhimg.com/v2-614dfbf2fa97c02f5b6dcd7a8e9db051_b.jpg)



5、这样，我们就完成了一个打包工作，如果别人需要，即使没有python环境，他依然可以运行。

6、接下来我们再来打包一个带界面的，这里我用pyqt5写了一个最简单的框架，看一下打包成exe是否能运行成功，效果图如下图所示。

![动图封面](https://pic1.zhimg.com/v2-861c53f689e95b621fdd7b55ceceddcc_b.jpg)



我们可以看到，后面有一个黑洞洞的窗口，这就有点尴尬了，所以，我们的打包命令也要变一下。

7、执行 pyinstaller -F -wsetup.py 多加-w以后，就不会显示黑洞洞的控制台了，这里就不做演示啦！

8、但是我们打包的exe，我们的图标呀，实在是有点丑陋，默认的，没有一点自己的风格，那么，我们应该怎么改一下呢？

执行命令:pyinstaller -F -w-i wind.ico setup.py，如下图所示。

![img](https://pic4.zhimg.com/80/v2-836dc5af9b2bebe962f05a2273081d33_720w.webp)

9、默认打包图片，如下图所示。

![img](https://pic4.zhimg.com/80/v2-ebc43b2704d6b3573d9a7a098fb95643_720w.webp)

10、加上 -i 参数之后，如下图所示，会形成一个类似风力发电机的logo图案。

![img](https://pic4.zhimg.com/80/v2-bcb5cd6616f0c63ce90ce7c445c1ab8b_720w.webp)

ps:程序路径最好全部都是英文，否则肯能会出现莫名其妙的问题

11、到此，我们能用到的pyton打包成exe命令都总结完了

## **总结命令**

Pyinstaller -F setup.py 打包exe

Pyinstaller -F -w setup.py 不带控制台的打包

Pyinstaller -F -i xx.ico setup.py 打包指定exe图标打包

平常我们只需要这三个就好了，足够满足所有需求了。