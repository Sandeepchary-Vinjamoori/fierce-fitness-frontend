
package com.scarface.fitness.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.ResourceResolver;
import org.springframework.web.servlet.resource.ResourceResolverChain;

import jakarta.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**")
            .addResourceLocations("classpath:/static/")
            .resourceChain(false)
            .addResolver(new SinglePageAppResourceResolver());
    }

    private static class SinglePageAppResourceResolver implements ResourceResolver {
        private final Resource index = new ClassPathResource("/static/index.html");

        @Override
        public Resource resolveResource(HttpServletRequest request, String requestPath, List<? extends Resource> locations, ResourceResolverChain chain) {
            return resolve(requestPath, locations);
        }

        @Override
        public String resolveUrlPath(String resourcePath, List<? extends Resource> locations, ResourceResolverChain chain) {
            Resource resolvedResource = resolve(resourcePath, locations);
            if (resolvedResource == null) {
                return null;
            }
            try {
                return resolvedResource.getURL().toString();
            } catch (IOException e) {
                return null;
            }
        }

        private Resource resolve(String requestPath, List<? extends Resource> locations) {
            // Skip API paths
            if (requestPath.startsWith("api/")) {
                return null;
            }
            
            // Check if the requested resource is available in the static folder
            for (Resource location : locations) {
                try {
                    Resource requestedResource = location.createRelative(requestPath);
                    if (requestedResource.exists() && requestedResource.isReadable()) {
                        return requestedResource;
                    }
                } catch (IOException e) {
                    // Continue to next location
                }
            }
            
            // If resource not found, return index.html for SPA routing
            // Exclude assets, js, css, and other static resources from being redirected to index.html
            String[] skipExtensions = { ".js", ".css", ".ico", ".png", ".jpg", ".jpeg", ".svg", ".gif", ".woff", ".woff2", ".ttf", ".eot" };
            if (Arrays.stream(skipExtensions).noneMatch(requestPath::endsWith)) {
                return index;
            }
            
            return null;
        }
    }
}
