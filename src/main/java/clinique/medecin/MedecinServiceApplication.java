package clinique.medecin;

import java.security.Principal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@EnableFeignClients(basePackages = "clinique.medecin.service")
public class MedecinServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(MedecinServiceApplication.class, args);
	}
	
	
	   
    @RestController
    @RefreshScope
     class MedecinRestController {
     
    	 @GetMapping("/auth") 
    	 public Principal authentication(Principal principal){
    	 return principal; }
    }

}
