# MyBaites Bug合集

### Mybaties 错误 class java.math.BigInteger cannot be cast to class java.lang.Long 

~~~apl
Caused by: org.apache.ibatis.exceptions.PersistenceException: 
### Error updating database.  Cause: org.springframework.jdbc.CannotGetJdbcConnectionException: Failed to obtain JDBC Connection; nested exception is java.sql.SQLException: java.lang.ClassCastException: class java.math.BigInteger cannot be cast to class java.lang.Long (java.math.BigInteger and java.lang.Long are in module java.base of loader 'bootstrap')
~~~

可能原因：数据库驱动版本不一致，MySQL 5.7之前的和之后的不兼容，更换为较新的版本