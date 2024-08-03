### Mybatis-parameterType（参数类型）、resultMap（结果映射)和resultType（结果类型）区别与联系

MyBatis是一种用于Java的持久层框架，用于将数据库操作与Java对象之间的映射进行管理。在MyBatis中，有三个重要的概念：`parameterType`
（参数类型）、`resultMap`（结果映射）和`resultType`（结果类型），它们之间有以下区别：

1. `parameterType`（参数类型）：`parameterType`
   用于指定传递给SQL语句的参数类型。它定义了在执行SQL语句时传递给数据库的参数的类型和结构。参数可以是一个简单的Java基本类型（如整数、字符串等），也可以是一个自定义的Java对象。在SQL语句中，可以使用`#{}`
   占位符来引用参数。

   例如，如果有一个名为`User`的Java对象，其中包含`id`和`name`属性，那么可以将`parameterType`设置为`User`
   ，并在SQL语句中使用`#{id}`和`#{name}`来引用对象的属性。

2. `resultMap`（结果映射）：`resultMap`用于定义将SQL查询结果映射到Java对象的规则。通过`resultMap`
   ，可以指定如何将数据库中的列映射到Java对象的属性。`resultMap`可以定义复杂的映射关系，包括处理继承关系、关联关系等。

   例如，如果有一个名为`User`的Java对象，其中包含`id`和`name`属性，并且数据库表中有相应的`id`和`name`列，可以使用`resultMap`
   来指定将查询结果映射到`User`对象。

3. `resultType`（结果类型）：`resultType`
   用于指定查询结果的类型。它可以是一个简单的Java基本类型（如整数、字符串等），也可以是一个自定义的Java对象。当查询结果只包含一个列时，可以使用`resultType`
   来指定结果的类型。

   例如，如果执行一个查询，只需要返回一个整数值作为结果，可以将`resultType`设置为`int`。

**结论**：
`parameterType`用于指定传递给SQL语句的参数类型，`resultMap`用于定义将查询结果映射到Java对象的规则，而`resultType`
用于指定查询结果的类型。它们各自在MyBatis中扮演着不同的角色，用于处理参数和结果的映射关系。

**注意事项**
parameterType和resultMap是用于不同目的的配置选项，它们通常不会同时在同一个SQL语句中使用

### resultMap 处理关联关系和继承关系

1. 处理关联关系：

假设有两个表：`users`和`orders`，其中`users`表包含用户信息，`orders`
表包含订单信息，并且每个订单都关联到一个用户。下面是一个使用`resultMap`处理关联关系的示例：

```xml

<resultMap id="userResultMap" type="User">
    <id property="id" column="user_id"/>
    <result property="name" column="user_name"/>
    <collection property="orders" ofType="Order">
        <id property="id" column="order_id"/>
        <result property="amount" column="order_amount"/>
    </collection>
</resultMap>
```

在上面的示例中，定义了一个名为`userResultMap`的`resultMap`，用于将查询结果映射到`User`对象。`User`对象包含`id`、`name`
和`orders`属性，其中`orders`属性是一个包含`Order`对象的集合。

2. 处理继承关系：

假设有一个基类`Vehicle`，有两个子类`Car`和`Motorcycle`，它们分别对应数据库中的不同表。下面是一个使用`resultMap`处理继承关系的示例：

```xml

<resultMap id="vehicleResultMap" type="Vehicle" discriminator="type">
    <id property="id" column="vehicle_id"/>
    <result property="manufacturer" column="manufacturer"/>
    <discriminator javaType="String" column="vehicle_type">
        <case value="car" resultMap="carResultMap"/>
        <case value="motorcycle" resultMap="motorcycleResultMap"/>
    </discriminator>
</resultMap>

<resultMap id="carResultMap" type="Car" extends="vehicleResultMap">
<result property="numberOfDoors" column="number_of_doors"/>
</resultMap>

<resultMap id="motorcycleResultMap" type="Motorcycle" extends="vehicleResultMap">
<result property="engineDisplacement" column="engine_displacement"/>
</resultMap>
```

在上面的示例中，定义了一个名为`vehicleResultMap`的基本`resultMap`，用于将查询结果映射到`Vehicle`对象。使用`discriminator`
标签指定了一个类型列`vehicle_type`，根据不同的类型值，选择不同的`resultMap`进行映射。

然后，定义了`carResultMap`和`motorcycleResultMap`，它们分别用于将查询结果映射到`Car`和`Motorcycle`对象，并通过`extends`
属性继承了`vehicleResultMap`的配置。

通过以上的`resultMap`配置，可以实现将关联关系和继承关系映射到Java对象中，从而提供更复杂的数据处理能力。
