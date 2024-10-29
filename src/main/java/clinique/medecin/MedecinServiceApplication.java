package clinique.medecin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients(basePackages = "clinique.medecin.service")
public class MedecinServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(MedecinServiceApplication.class, args);
	}

}
