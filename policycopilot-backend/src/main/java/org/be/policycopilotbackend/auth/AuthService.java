package org.be.policycopilotbackend.auth;

import lombok.RequiredArgsConstructor;
import org.be.policycopilotbackend.user.User;
import org.be.policycopilotbackend.user.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    public LoginResponse login(LoginRequest loginRequest) {
        UsernamePasswordAuthenticationToken auth =
                new UsernamePasswordAuthenticationToken(loginRequest.email(), loginRequest.password());
        authenticationManager.authenticate(auth);
        User user = userRepository.findByEmail(loginRequest.email()).orElseThrow();
        String token = jwtService.generateAccessToken(user);
        return new LoginResponse(token, user.getEmail());
    }

}
