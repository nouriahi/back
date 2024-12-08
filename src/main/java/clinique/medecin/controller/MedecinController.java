package clinique.medecin.controller;

import clinique.medecin.entities.Medecin;
import clinique.medecin.entities.MedecinCreationDto;
import clinique.medecin.entities.MedecinSecretaire;
import clinique.medecin.service.KeycloakMedecinService;
import clinique.medecin.service.MedecinService;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/medecins")
public class MedecinController {

    @Autowired
    private MedecinService medecinService;
    
    @Autowired
    private KeycloakMedecinService keycloakMedecinService;
    
    @PostMapping("/register")
    public ResponseEntity<String> registerMedecin(@RequestBody MedecinRegistrationRequest request) {
    	keycloakMedecinService.createMedecin(
            request.getUsername(),
            request.getEmail(),
            request.getFirstName(),
            request.getLastName(),
            request.getPassword()
        );
        return ResponseEntity.ok("Medecin créé avec succès !");
    }

    public static class MedecinRegistrationRequest {
        private String username;
        private String email;
        private String firstName;
        private String lastName;
        private String password;
        
		public String getUsername() {
			return username;
		}
		public void setUsername(String username) {
			this.username = username;
		}
		public String getEmail() {
			return email;
		}
		public void setEmail(String email) {
			this.email = email;
		}
		public String getFirstName() {
			return firstName;
		}
		public void setFirstName(String firstName) {
			this.firstName = firstName;
		}
		public String getLastName() {
			return lastName;
		}
		public void setLastName(String lastName) {
			this.lastName = lastName;
		}
		public String getPassword() {
			return password;
		}
		public void setPassword(String password) {
			this.password = password;
		}

        // Getters et setters
    }
    

    @PostMapping("/creerAvecSecretaire")
    public Medecin creerMedecinAvecSecretaire(@RequestBody MedecinCreationDto medecinDto) {
        return medecinService.creerMedecinAvecAffectation(medecinDto);
    }
    @PostMapping("/creerSansSecretaire")
    public Medecin creerMedecinSansSecretaire(@RequestBody Medecin medecinDto) {
        return medecinService.creerMedecinSansAffectation(medecinDto);
    }
    @PostMapping("/affecterSecretaire")
    public void affecterMedecinASecretaire(@RequestParam Long medecinId, @RequestParam Long secretaireId) {
        medecinService.affecterMedecinASecitaire(medecinId, secretaireId);
    }
    @GetMapping("getMedecin/{id}")
    public Medecin obtenirMedecin(@PathVariable Long id) {
        return medecinService.obtenirMedecinParId(id);
    }

    @GetMapping("getAllMedecins")
    public List<Medecin> obtenirTousLesMedecins() {
        return medecinService.obtenirTousLesMedecins();
    }

    @PutMapping("updateMedecin/{id}")
    public Medecin mettreAJourMedecin(@PathVariable Long id, @RequestBody MedecinCreationDto medecinUpdateDto) {
        return medecinService.mettreAJourMedecin(id, medecinUpdateDto);
    }



    @DeleteMapping("deleteMedecin/{id}")
    public String supprimerMedecin(@PathVariable Long id) {
        medecinService.supprimerMedecin(id);
        return "Médecin supprimé avec succès";
    }

}