package clinique.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class GatwayServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(GatwayServiceApplication.class, args);
	}
	@Bean
    public RouteLocator gatewayRoutes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("r1", r -> r.path("/medecins/**").uri("http://localhost:8081/"))
                .route("r2", r -> r.path("/secretaires/**").uri("http://localhost:8082/"))
                .route("r3", r -> r.path("/patients/**").uri("http://localhost:3000/"))
				.route("r4", r -> r.path("/api/rendezvous/**").uri("http://localhost:3001/"))
				.route("r1", r -> r.path("/dossiers/**").uri("http://localhost:8083/"))
				
                
                .build();
    }
}
