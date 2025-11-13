package org.be.policycopilotbackend.util;

import java.util.Arrays;
import java.util.stream.Collectors;

public class TextFormat {

    public static String prettifyEnumLike(String value) {
        if (value == null || value.isBlank()) return "";
        String[] parts = value.trim().toLowerCase().split("_+");
        return Arrays.stream(parts)
                .filter(p -> !p.isBlank())
                .map(p -> Character.toUpperCase(p.charAt(0)) + p.substring(1))
                .collect(Collectors.joining(" "));
    }
}
