package clinique.secretaire.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import clinique.secretaire.entities.Secretaire;
import clinique.secretaire.service.SecretaireService;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/secretaire")
public class SecretaireController {

    @Autowired
    private SecretaireService secretaireService;

    // Ajouter un secrétaire
    @PostMapping("/ajouterSecretaire")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Secretaire> ajouterSecretaire(@RequestBody Secretaire secretaire) {
        Secretaire newSecretaire = secretaireService.ajouterSecretaire(secretaire);
        return new ResponseEntity<>(newSecretaire, HttpStatus.CREATED);
    }

    // Liste de tous les secrétaires
    @GetMapping("/listeSecretaires")
    @PreAuthorize("hasRole('USER')")
    public List<Secretaire> getAllSecretaires() {
        return secretaireService.getAllSecretaires();
    }

    // Obtenir un secrétaire par ID
    @GetMapping("/getSecretaire/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Secretaire> getSecretaireById(@PathVariable Long id) {
        Optional<Secretaire> secretaire = secretaireService.getSecretaireById(id);
        return secretaire.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Mettre à jour un secrétaire
    @PutMapping("/updateSecretaire/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Secretaire> updateSecretaire(@PathVariable Long id, @RequestBody Secretaire secretaireDetails) {
        try {
            Secretaire updatedSecretaire = secretaireService.updateSecretaire(id, secretaireDetails);
            return ResponseEntity.ok(updatedSecretaire);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Supprimer un secrétaire
    @DeleteMapping("/deleteSecretaire/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteSecretaire(@PathVariable Long id) {
        System.out.println("Requête de suppression reçue pour l'ID : " + id);
        try {
            secretaireService.deleteSecretaire(id);
            System.out.println("Suppression effectuée avec succès pour l'ID : " + id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            System.err.println("Erreur lors de la suppression du secrétaire : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Authentification (ajoutée depuis le premier contrôleur)
    @GetMapping("/auth")
    public Principal authentication(Principal principal) {
        return principal;
    }
}
