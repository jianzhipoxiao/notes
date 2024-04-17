### Kenife4j 后端api文档生成器

##### 一.前言

很多啥时候我们开发后端代码需要写接口文档的时候，往往希望根据代码有相应的接口文档的生成，方便交给前端人员查看，



Knife4j是基于SpringFox和Swagger2的增强解决方案，它提供了一系列注解来帮助开发者更加方便地定义和展示API文档。以下是一些Knife4j中常用的注解及其用法：

1. `@Api`：
   - 用于标记控制器类，提供API的元信息。
   - 例如：
     ```java
     @RestController
     @RequestMapping("/users")
     @Api(value = "用户管理", tags = "用户管理相关接口")
     public class UserController {
         // ...
     }
     ```

2. `@ApiOperation`：
   - 用于标记方法，描述API操作的细节。
   - 例如：
     ```java
     @GetMapping("/{id}")
     @ApiOperation(value = "根据ID获取用户信息", notes = "详细说明如何使用该接口")
     public User getUser(@PathVariable("id") Long id) {
         // ...
     }
     ```

3. `@ApiModel` 和 `@ApiModelProperty`：
   - `@ApiModel`用于标记实体类，描述模型的信息。
   - `@ApiModelProperty`用于标记实体类的字段，描述字段的详细信息。
   - 例如：
     ```java
     @ApiModel(value = "用户信息", description = "包含用户的所有信息")
     public class User {
         @ApiModelProperty(value = "用户ID", required = true)
         private Long id;
         @ApiModelProperty(value = "用户名")
         private String name;
         // ...
     }
     ```

4. `@ApiResponse` 和 `@ApiResponses`：
   - `@ApiResponse`用于描述单个API响应。
   - `@ApiResponses`用于列出多个`@ApiResponse`。
   - 例如：
     ```java
     @ApiOperation(value = "登录")
     @PostMapping("/login")
     @ApiResponses({
         @ApiResponse(code = 200, message = "登录成功"),
         @ApiResponse(code = 401, message = "用户名或密码错误"),
         @ApiResponse(code = 500, message = "服务器内部错误")
     })
     public Token login(@RequestBody LoginRequest loginRequest) {
         // ...
     }
     ```

5. `@ApiParam`：
   - 用于描述单个API参数。
   - 例如：
     ```java
     @GetMapping("/user")
     public List<User> getUsers(
         @ApiParam(value = "用户名称", required = true) @RequestParam String name,
         @ApiParam(value = "用户年龄") @RequestParam(required = false) Integer age) {
         // ...
     }
     ```

6. `@Parameter` 和 `@RequestBody`：
   - `@Parameter`用于描述方法参数，而`@RequestBody`用于标记方法参数表示请求的主体。
   - 例如：
     ```java
     @PostMapping("/user")
     @ApiOperation(value = "创建用户")
     public User createUser(@RequestBody @Valid User user) {
         // ...
     }
     ```

7. `@Deprecated`：
   - 用于标记不再推荐使用的API。
   - 例如：
     ```java
     @Deprecated
     @GetMapping("/old-path")
     @ApiOperation(value = "旧的API路径")
     public String oldPath() {
         // ...
     }
     ```

8. `@Order` 和 `@Priority`：
   - 用于控制Swagger配置的加载顺序。
   - 例如：
     ```java
     @Configuration
     @Order(Ordered.HIGHEST_PRECEDENCE)
     public class SwaggerConfig {
         // ...
     }
     ```

这些注解使得开发者能够更加精确地控制API文档的生成和展示，提供了丰富的元数据和定制化选项。在使用这些注解时，请确保您的项目中已经正确引入了Knife4j和相关的依赖库。此外，不同版本的Knife4j可能支持的注解和功能有所不同，因此在使用时请参考对应版本的官方文档。