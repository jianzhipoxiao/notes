package com.example.demo;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.concurrent.locks.ReentrantLock;

class AopDemoApplicationTests {

    void contextLoads() {
    }

    public static void main(String[] args) {
        ReentrantLock lock = new ReentrantLock(true);
        try {
            lock.lock();


        } finally {
            lock.unlock();
        }

    }

}
