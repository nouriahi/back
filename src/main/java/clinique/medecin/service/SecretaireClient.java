package clinique.medecin.service;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import clinique.medecin.entities.Secretaire;

@FeignClient(name = "secretaire-service", url = "http://localhost:8082")
public interface SecretaireClient {

    @GetMapping("/secretaires/{id}")
    Secretaire getSecretaireById(@PathVariable("id") Long secretaireId);
}
