package org.be.policycopilotbackend.auth;

public record LoginResponse(String accessToken, String userEmail) {}