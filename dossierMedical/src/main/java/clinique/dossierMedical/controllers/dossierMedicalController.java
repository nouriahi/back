package clinique.dossierMedical.controllers;

import clinique.dossierMedical.entities.Consultation;
import clinique.dossierMedical.entities.dossierMedical;
import clinique.dossierMedical.services.dossierMedicalService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dossiers")
public class dossierMedicalController {

    @Autowired
    private dossierMedicalService dossierMedicalService;

    // Créer un nouveau dossier médical
    @PostMapping
    public ResponseEntity<dossierMedical> creerDossier(@RequestBody dossierMedical dossierMedical) {
        try {
            dossierMedical dossierCree = dossierMedicalService.creerDossier(dossierMedical);
            return ResponseEntity.status(HttpStatus.CREATED).body(dossierCree);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    // Obtenir un dossier médical par son ID
    @GetMapping("/{id}")
    public ResponseEntity<dossierMedical> obtenirDossier(@PathVariable Long id) {
        try {
            dossierMedical dossier = dossierMedicalService.obtenirDossierParId(id);
            return ResponseEntity.ok(dossier);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Obtenir tous les dossiers médicaux
    @GetMapping
    public List<dossierMedical> obtenirTousLesDossiers() {
        return dossierMedicalService.listerDossiers();
    }

    // Mettre à jour un dossier médical existant
    @PutMapping("/{id}")
    public ResponseEntity<dossierMedical> mettreAJourDossier(@PathVariable Long id, @RequestBody dossierMedical dossierMedical) {
        try {
            dossierMedical updatedDossier = dossierMedicalService.mettreAJourDossier(id, dossierMedical);
            return ResponseEntity.ok(updatedDossier);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    // Supprimer un dossier médical
    @DeleteMapping("/{id}")
    public ResponseEntity<String> supprimerDossier(@PathVariable Long id) {
        try {
            dossierMedicalService.supprimerDossier(id);
            return ResponseEntity.ok("Dossier médical supprimé avec succès");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Dossier médical non trouvé");
        }
    }

    // Ajouter une nouvelle consultation à un dossier médical
    @PostMapping("/{dossierId}/consultations")
    public ResponseEntity<Consultation> ajouterConsultation(
            @PathVariable Long dossierId,
            @RequestBody Consultation consultation
    ) {
        try {
            Consultation nouvelleConsultation = dossierMedicalService.ajouterConsultation(dossierId, consultation);
            return ResponseEntity.status(HttpStatus.CREATED).body(nouvelleConsultation);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Obtenir toutes les consultations d'un dossier médical
    @GetMapping("/{dossierId}/consultations")
    public ResponseEntity<List<Consultation>> obtenirConsultations(@PathVariable Long dossierId) {
        List<Consultation> consultations = dossierMedicalService.obtenirConsultationsParDossier(dossierId);
        return ResponseEntity.ok(consultations);
    }

    // Mettre à jour une consultation spécifique
    @PutMapping("/consultations/{id}")
    public ResponseEntity<Consultation> mettreAJourConsultation(@PathVariable Long id, @RequestBody Consultation consultation) {
        try {
            Consultation updatedConsultation = dossierMedicalService.mettreAJourConsultation(id, consultation);
            return ResponseEntity.ok(updatedConsultation);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Supprimer une consultation par son ID
    @DeleteMapping("/consultations/{id}")
    public ResponseEntity<String> supprimerConsultation(@PathVariable Long id) {
        try {
            dossierMedicalService.supprimerConsultation(id);
            return ResponseEntity.ok("Consultation supprimée avec succès");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Consultation non trouvée");
        }
    }
}
