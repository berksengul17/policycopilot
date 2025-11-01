package org.be.policycopilotbackend;

import org.springframework.boot.SpringApplication;

public class TestPolicycopilotBackendApplication {

    public static void main(String[] args) {
        SpringApplication.from(PolicycopilotBackendApplication::main).with(TestcontainersConfiguration.class).run(args);
    }

}
