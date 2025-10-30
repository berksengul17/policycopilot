package org.be.policycopilotbackendd;

import org.springframework.boot.SpringApplication;

public class TestPolicycopilotBackenddApplication {

    public static void main(String[] args) {
        SpringApplication.from(PolicycopilotBackenddApplication::main).with(TestcontainersConfiguration.class).run(args);
    }

}
