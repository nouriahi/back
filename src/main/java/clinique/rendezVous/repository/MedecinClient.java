package clinique.rendezVous.repository;

import java.util.List;

import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import clinique.rendezVous.entities.Medecin;
@Configuration
@EnableFeignClients
@FeignClient(name = "MedecinClient", url = "http://localhost:8081/medecins") // URL correcte
public interface MedecinClient {
    
    @GetMapping("/getMedecin/{id}")
    Medecin obtenirMedecin(@PathVariable("id") Long id); // Indication explicite du nom de la variable
        
    @GetMapping("/getAllMedecins")
    List<Medecin> obtenirTousLesMedecins();
}
