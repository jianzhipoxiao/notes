# Servlet

****



## 1部署servlet环境

1. 下载Tomcat服务器

2. 解压到一个方便的位置

3. 在idea中建立普通java项目，再转换为web项目，并配置Tomcat

   ****

## 2Servlet语法初始化

1. 实现Servlet规范
2. 重写需要方法

## 3常用对象

### request

#### 获取前端数据

~~~java
//获取请求时的完整路径（从http开始，到“？”前面结束）
        String url = req.getRequestURL()+""; //返回值需要转换为字符串
        System.out.println("完整路径\t"+url);
        //获取请求时的部分路径
        String uri = req.getRequestURI();
        System.out.println("URI\t"+uri);

        //获取请求时的字符串参数
        String queryString = req.getQueryString();
        System.out.println("queryString\t"+queryString);

        //请求方式
        String method = req.getMethod();
        System.out.println("method\t"+method);

        //当前版本
        String prototol = req.getProtocol();
        System.out.println("protool\t"+prototol);

        //项目站点名
        String webapp = req.getContextPath(); //上下文路径
        System.out.println("项目站点名\t"+webapp);
        //获取指定名称的参数(重点)表单参数
        String uname =req.getParameter("uname");
        String upwd = req.getParameter("upwd");
        System.out.println("uname"+uname+"\t"+"upwd"+upwd);

        //获取指定名称的参数的所有参数值,返回字符串数组(用于复选框)
        String[] hobbys = req.getParameterValues("hobby");
        if (hobbys != null){
            for (String hobby:hobbys) {
                System.out.println(hobby);
            }
        }
    }
~~~

1. getRequestURL()   获取当前页面URL 
2. getRequestURI()  获取文件路径不包含http
3. getQueryString()  获取字符串参数
4. getMethod()  获取提交的方法类型 如 Get Post
5. getProtocol()  获取当前HTTP版本
6. getContextPath() 获取项目名称[^ 也叫上下文路径]
7. **getParameter() 获取指定名称参数 如name 属性的表单数据 **
8. getParameterValues() 表单数据如多选框

****

#### 请求跳转

~~~java
 req.getRequestDispatcher("URL").forward(req,resp);
~~~

URL 为 跳转的路径可以是Servlet文件也可以是JSP文件，req与resp为传递参数且，在此期间只**发送一次请求，数据在服务端传递**且当前页面地址栏不变

****

#### 域对象

~~~java
//设置域对象
req.setAttribute("name","admin"); //第一个参数为String第二个为object
        req.setAttribute("age",18);
        List<String> list = new ArrayList<>();
        list.add("aaa");
        list.add("bbb");
        req.setAttribute("list",list);
~~~





