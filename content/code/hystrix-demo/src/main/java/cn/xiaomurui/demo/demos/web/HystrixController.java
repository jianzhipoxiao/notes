package cn.xiaomurui.demo.demos.web;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixProperty;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Random;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping(value="/hystrix")
public class HystrixController {

    private static final Logger LOG = LoggerFactory.getLogger(HystrixController.class);

    @RequestMapping(value = "/ok", method = RequestMethod.GET)
    @HystrixCommand(fallbackMethod = "okFallback", commandProperties = {
                    @HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds", value = "100"),
                    @HystrixProperty(name = "circuitBreaker.requestVolumeThreshold", value = "50")

    })
    public String ok() throws Exception {
        int l = new Random().nextInt(200);
        LOG.info(String.format("l=%s", l));  
        TimeUnit.MILLISECONDS.sleep(150);
        return "ok";  
    }  

    public String okFallback(Throwable e) {  
        System.out.println("execute okFallback!" + e.getMessage());  
        LOG.error("error", e);  
        return "fallback";  
    }
    public String okFallback() {
        return "fallbackssssss";
    }

}  