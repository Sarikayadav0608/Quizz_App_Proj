package com.cdac.quizonline.config.exception;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class AuthExceptionHandler implements AuthenticationEntryPoint, AccessDeniedHandler {
    
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException exception) throws IOException, ServletException {

        String message = "Authentication Failed";
        String detailMessage = exception.getLocalizedMessage();
        int code = 9;

        ErrorResponse errorResponse = new ErrorResponse(
                message,
                detailMessage,
                code,
                exception);

        addErrorResponseToBodyResponse(errorResponse, response, HttpServletResponse.SC_UNAUTHORIZED);
    }

    
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response,
                       AccessDeniedException exception) throws IOException, ServletException {

        String message = "Access is denied";
        String detailMessage = exception.getLocalizedMessage();
        int code = 10;

        ErrorResponse errorResponse = new ErrorResponse(
                message,
                detailMessage,
                code,
                exception);

        addErrorResponseToBodyResponse(errorResponse, response, HttpServletResponse.SC_FORBIDDEN);
    }

    private void addErrorResponseToBodyResponse(
            ErrorResponse errorResponse,
            HttpServletResponse response,
            int responsestatus)
            throws IOException {
        
        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
        String json = ow.writeValueAsString(errorResponse);

        
        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(responsestatus);
        response.getWriter().write(json);

    }


}

